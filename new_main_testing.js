let events = [];
const body = document.getElementById("thepage");

window.onload = d => {
  setTimeout(s => {
    location.reload();
  }, 600000)
}

fetch("http://127.0.0.1:3000") // SET TO CORRECT IP!
  .then((resp) => resp.json())
  .then((data) => {
    for (let i of data.items) {
      let startTime = new Date(i.start.dateTime).getTime();
      let endTime = new Date(i.end.dateTime).getTime();
      const name = i.summary;
      let isPrivate = false;
      let nowTime = new Date().getTime();
      if (name != undefined) {
        if (name.includes("PRIVAT")) {
          isPrivate = true;
        }
      }
      if (endTime > nowTime) {
        events.push({
          name: name,
          startTime: Number(startTime),
          endTime: endTime,
          private: isPrivate,
        });
      }
    }
  })
  .then(() => {
    // Sort array
    function compare(a, b) {
      let aStart = a.startTime;
      let bStart = b.startTime;
      let comp = 0;
      if (aStart > bStart) { comp = 1 }
      else if (aStart < bStart) { comp = -1 }
      return comp;
    }
    events.sort(compare);
    const now = new Date();


    // Make the parent elements for the events
    let todayDiv = document.createElement("div");
    todayDiv.id = "today";
    todayDiv.innerHTML = "<h1>Todays events</h1>";
    let nextDiv = document.createElement("div");
    nextDiv.id = "future";
    nextDiv.innerHTML = "<h1>Upcoming events</h1>";

    let upcomingDiv = document.createElement("div");
    upcomingDiv.id = "nextEvent";
    upcomingDiv.style.display = "none";

    for (let i = 0; i < 4; i++) {
      let isNow = false;
      const startDay = new Date(events[i].startTime);
      const endDay = new Date(events[i].endTime);

      newStarTime = getTimePadding(startDay);
      newEndTime = getTimePadding(endDay);

      // Make the html element for one event
      let eventDiv = document.createElement("div");
      eventDiv.classList.add("event");
      if(events[i].private){
        eventDiv.classList.add("eventpriv");
      }else{
        eventDiv.classList.add("eventpub");
      }
      let header = document.createElement("h2");
      header.innerHTML = events[i].name;
     
      let para = document.createElement("p");
        para.innerHTML =
        startDay.toDateString() +
        "<br> " +
        newStarTime+
        " - " +
        newEndTime;
       eventDiv.append(header);
      eventDiv.append(para);
   
      // Get events happening today
      if (startDay.toDateString() == now.toDateString()) {
        if (events[i].startTime < now.getTime() && events[i].endTime > now.getTime()) {
          isNow = true;
          if (!events[i].private) eventDiv.id = "public";
          else eventDiv.id = "private";
          body.append(eventDiv);
          if(events[i+1].private){
            upcomingDiv.classList.add("eventpriv");
          }else{
            upcomingDiv.classList.add("eventpub");
          }
          const upStart = new Date(events[i+1].startTime);
          const upEnd = new Date(events[i+1].endTime);
          var upTime = getTimePadding(upStart);
          var upEndTime = getTimePadding(upEnd);
          upcomingDiv.style.display = "block";
          
          upcomingDiv.innerHTML = "<h1>Next Event</h1><h2>" +
          events[1].name + "</h2><h3>"+ 
          upStart.toDateString() + "</h3><h3>" +
          upTime + " - " + upEndTime + "</h3>";
        }
        if (!isNow) todayDiv.append(eventDiv);
      }

      else if (events[i].startTime > now.getTime()) {
        nextDiv.append(eventDiv);
      }
    }
    if(todayDiv.innerHTML == "<h1>Todays events</h1>"){
      todayDiv.append("No events today :/")
    }
    
    body.append(todayDiv);
    body.append(nextDiv);
    body.append(upcomingDiv);
  });


function getTimePadding(inTime){
          var hours = inTime.getHours();
          var minutes = inTime.getMinutes();
          var padTime = ('0000' + (hours * 100 + minutes)).slice(-4);
          padTime = padTime.slice(0,2) + ":" + padTime.slice(2,4);
          return padTime;
}
