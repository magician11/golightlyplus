---
slug: wait-multiple-async-calls-in-promise-all
title: How to collect an unknown number of async calls
authors: andrew

---

I had a challenge the other day where I would request some data from a server. But the data was not all returned at once. But rather paginated. And I wouldn’t know beforehand how many pages I would need to process. So I couldn’t just pre-nest my callbacks.

That’s when I re-discovered promises.

<!-- truncate -->

Basically I can create a new promise for each page I need to call. Then use Promise.all to wait for all the requests to complete wherein I can process the array of results.

The code snippet to grab all the billable hours from a Freshbooks account then looks like this

```js title="billablehours.js"
let getBillableHours = function(projectId) {

          function sumTimes(times) {

            let billableHours = 0;
            for(let time of times) {
              billableHours += parseFloat(time.hours);
            }

            return billableHours;
          }

          return new Promise((resolve, reject) => {
            let timeEntries = new freshbooks.Time_Entry();
            let billableHours = 0;
            timeEntries.list({project_id: projectId, per_page: 100}, function(err, times, options) {

              if(err) {
                reject(err);
              } else {

                // grab the first page of times
                billableHours = sumTimes(times);

                // if there are more pages to process, get those...
                if(options.pages > 1) {
                  let pagesToProcess = [];
                  for(let i = 2; i <= options.pages; i++) {
                    pagesToProcess.push(new Promise((done, reject) => {
                      timeEntries.list({project_id: projectId, per_page: 100, page: i }, function(err, times, options) {
                        let extraHours = sumTimes(times);

                        done(extraHours);
                      });
                    }));
                  }

                  Promise.all(pagesToProcess).then((extraTimes) => {

                    freshbooksData.billableHours = billableHours + extraTimes.reduce(function(a,b) { return a + b; });
                    resolve(freshbooksData.billableHours);
                  });
                } else {
                  freshbooksData.billableHours = billableHours;
                  resolve(freshbooksData.billableHours);
                }
              }
            });
          });
        };

```
[View this gist on GitHub](https://gist.github.com/magician11/878af6d705dfa9dce32c)