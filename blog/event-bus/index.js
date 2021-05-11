const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  // Post Service
  const postServiceName = 'posts-clusterip-srv:4000'
  axios
    .post(`http://${postServiceName}/events`, event)
    .catch((err) => console.log('Post Service error"', err.message));
    
  // Comment Service
  axios
    .post("http://comments-srv:4001/events", event)
    .catch((err) => console.log('Comment Service error"', err.message));

  // Query Service
  axios
    .post("http://query-srv:4002/events", event)
    .catch((err) => console.log('Query Service error"', err.message));

  // Moderation Service
  axios
    .post("http://moderation-srv:4003/events", event)
    .catch((err) => console.log('Moderation Service error"', err.message));

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
