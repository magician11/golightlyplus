---
slug: remove-paypal-shopify
title: How To Conditionally Remove The PayPal Payment Gateway In Shopify
authors: andrew
---

So I recently had a job where we needed to remove the PayPal payment gateway in the Shopify checkout for particular products.

So a simple way for the client to manage this, is for them to tag those products they don’t want to be purchasable by PayPal, and then for us to write a script that detects those tags for those products in the checkout, and then removes that payment gateway.

<!--truncate-->

Now it’s not possible to modify the checkout experience for standard Shopify stores. But if you’re a [Shopify Plus customer](https://www.shopify.com/plus) then you can use the [Script Editor App](https://apps.shopify.com/script-editor) which does allow you to programatically modify the checkout experience. The API for this is [here](https://help.shopify.com/api/tutorials/shopify-scripts).

Now my language of expertise is JavaScript, and to use the Script Editor you have to use Ruby. This wasn’t actually too bad to learn. As someone that has done a lot of programming, looking up the syntax online for how to do something was quite easy. Particularly with the help of some Ruby pros in slack chats.

So, back to the problem at hand. If the client just added a tag called ‘no-paypal’ to whatever product they wanted to trigger the removal of the PayPal payment gateway, this is how we did it:

```rb title="remove-paypal-gateway.rb"
has_no_paypal_tag = Input.cart.line_items.any? { |line_item| line_item.variant.product.tags.include?('no-paypal') }

if has_no_paypal_tag
  Output.payment_gateways = Input.payment_gateways.delete_if { |payment_gateway| payment_gateway.name.include?("PayPal") }
else
  Output.payment_gateways = Input.payment_gateways
end
```
[View this gist on GitHub](https://gist.github.com/magician11/2c63ce78f4dffb5fc941c8d843717242)

A gotcha I had trouble figuring out on my own: when you create a new script in the Script Editor, be sure to choose the correct script template. This is because the different types of scripts have different data objects available to them at runtime. In this case, I thus needed to choose the “Payment gateways” template.

Any questions/comments, [let me know](/contact)!
