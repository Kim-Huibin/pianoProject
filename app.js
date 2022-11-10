const fs = require("fs");
const { parse } = require("csv-parse");
let document = "./fileA.csv";
fs.createReadStream(document).pipe(
  parse({
    delimiter: ",",
    columns: true,
    ltrim: true,
  })
);
const data = [];

fs.createReadStream("./example.csv")
  .pipe(
    parse({
      delimiter: ",",
      columns: true,
      ltrim: true,
    })
  )
  .on("data", function (row) {
    // 👇 push the object row into the array
    data.push(row);
  })
  .on("error", function (error) {
    console.log(error.message);
  })
  .on("end", function () {
    // 👇 log the result array
    console.log("parsed csv data:");
    console.log(data);
  });

for (const element of data) {
  console.log(element);
  let pianoURL =
    "http://sandbox.piano.io/publisher/user/create";

  fetch(pianoURL, {
    method: "POST",
    body: element,
    headers: {
      "Content-Type": "application/json",
      "X-Authorization":
        "xeYjNEhmutkgkqCZyhBn6DErVntAKDx30FqFOS6D",
    },
  }).then((response) => response.json());
}
