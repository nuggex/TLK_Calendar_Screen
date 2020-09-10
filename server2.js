const gkey = process.env.GKEY;

const api="https://www.googleapis.com/calendar/v3/calendars/tlk.fi_j78ecj51va7764f75fhkrotsrc@group.calendar.google.com/events?key=" + gkey + "&orderby=starttime&sortorder=ascending";

const http = require("http");
const fetch = require("node-fetch");

const hostname = "127.0.0.1"; // SET TO RASPBERRY IP
const port = 3001;


async function getCalender2() {
  let response = await fetch(api);
  let data = await response.json();
return data;
}
const server = http.createServer((req, res) => {
  getCalender2().then((d) => {
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

