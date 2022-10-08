---
slug: all-products-shopify-graphql
title: How to fetch all products from Shopify in a single query using GraphQL
authors: andrew
tags: [shopify]
---

I’ve had a few projects now where I’ve had to sync up inventories in Shopify with some external database that was their source of truth for inventory values.

So essentially I would need to

- Download all the products from Shopify for a store
- Iterate through them all comparing the inventory value reported in Shopify with the inventory value reported in their external database.

<!--truncate-->

Previously there was no easy way to simply fetch all products if the store has more than 250 products. [The REST API from Shopify has a limit of 250 for retrieving a list of products](https://shopify.dev/api/admin-rest/2022-07/resources/product#get-products).

But [there is a way to perform a bulk query using GraphQL with the Admin API](https://shopify.dev/api/usage/bulk-operations/queries).

The steps are as follows:

1. [Create a subscription with Shopify](https://shopify.dev/api/usage/bulk-operations/queries#option-a-subscribe-to-the-bulk_operations-finish-webhook-topic) so that when they finish compiling all the products, they have a URL to post that data to. See `create-subscription.js`
2. [Submit a bulk query](https://shopify.dev/api/usage/bulk-operations/queries#step-1-submit-a-query) to Shopify so they can compile all the products together. See `submit-query.js`
3. Code up the endpoint that you’ve subscribed to with Shopify when the bulk operation completes with compiling all your products. Shopify will first send a payload that includes a key in the object called `admin_graphql_api_id`. You can use that key [to query for the URL that will have all the data](https://shopify.dev/api/usage/bulk-operations/queries#step-3-retrieve-your-data) (in this case all our products). Then you can download the data from that URL, and process the data however you like. See `get-url-with-data.js`

```js title="create-subscription.js"
const setup = async () => {
  const data = `
mutation {
  webhookSubscriptionCreate(
    topic: BULK_OPERATIONS_FINISH
    webhookSubscription: {
      format: JSON,
      callbackUrl: "https://firebase-app.cloudfunctions.net/processAllProducts"}
  ) {
    userErrors {
      field
      message
    }
    webhookSubscription {
      id
    }
  }
}`;

  const client = new Shopify.Clients.Graphql(
    'your-shop.myshopify.com',
    process.env.SHOPIFY_ACCESS_TOKEN
  );
  const res = await client.query({ data });

  console.log(JSON.stringify(res.body, null, 2));
};
```

```js title="get-url-with-data.js"
const retrieveUrl = async admin_graphql_api_id => {
  const data = `
  query {
    node(id: "${admin_graphql_api_id}") {
      ... on BulkOperation {
        url
        partialDataUrl
      }
    }
  }`;

  const client = new Shopify.Clients.Graphql(
    'your-shop.myshopify.com',
    process.env.SHOPIFY_ACCESS_TOKEN
  );
  const res = await client.query({ data });

  return res.body.data.node.url;
};
```

```js title="submit-query.js"
import { Shopify } from '@shopify/shopify-api';

const fetchAllProducts = async () => {
  // https://shopify.dev/api/usage/bulk-operations/queries#step-1-submit-a-query
  const queryString = `mutation {
        bulkOperationRunQuery(
         query: """
          {
            products {
              edges {
                node {
                  id
                  title
                  variants {
                    edges {
                        node {
                            title
                            inventoryQuantity
                            id
                            sku
                            inventoryItem {
                              id
                            }
                            metafields {
                              edges {
                                node {
                                  namespace
                                  key
                                  value
                                }
                              }
                            }
                        }
                    }
                  }
                }
              }
            }
          }
          """
        ) {
          bulkOperation {
            id
            status
          }
          userErrors {
            field
            message
          }
        }
      }`;

  const client = new Shopify.Clients.Graphql(
    'your-shop.myshopify.com',
    process.env.SHOPIFY_ACCESS_TOKEN
  );
  const res = await client.query({
    data: queryString
  });

  return res.body;
};
```

> [View this gist on GitHub](https://gist.github.com/magician11/a56f9952282507169b68e353c66bd6af)

The data will be returned as [JSONL](https://jsonlines.org/). This is JSON but broken up on one line at a time. For example, it might look like this…

```
{"id":"gid:\/\/shopify\/Product\/12345678","title":"Pavé Evil Eye Bracelet"}
{"title":"Silver, White and Blue Diamond","inventoryQuantity":23,"id":"gid:\/\/shopify\/ProductVariant\/5555555","sku":"207278","__parentId":"gid:\/\/shopify\/Product\/12345678"}
{"id":"gid:\/\/shopify\/Product\/44444444","title":"Pavé Evil Eye Bracelet"}
```

I found the best way to process the JSONL file is to first figure out what you want from that data exactly. I ended up building a JavaScript object from it, so I could reference it when comparing inventory values with an external database.
