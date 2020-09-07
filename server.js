const gkey = process.env.GKEY;

//const api="https://www.googleapis.com/calendar/v3/calendars/tlk.fi_j78ecj51va7764f75fhkrotsrc@group.calendar.google.com/events?key=" + gkey;
const api2 ="https://www.googleapis.com/calendar/v3/calendars/tlk.fi_nnc4oospos16o4aci02v9o7cr8%40group.calendar.google.com/events?key=" + gkey + "&orderby=starttime&sortorder=ascending";

const http = require("http");
const fetch = require("node-fetch");

const hostname = "127.0.0.1"; // SET TO RASPBERRY IP
const port = 3000;


async function getCalender() {
  let response = await fetch(api2);
  let data = await response.json();
return data;
}
const server = http.createServer((req, res) => {
  getCalender().then((d) => {
    let test = JSON.stringify(d);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.write(test);
    res.end();
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

