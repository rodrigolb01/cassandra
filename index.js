const PORT = "8000";
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fetch = require("node-fetch");
require("dotenv").config();
morgan("tiny");
const https = require("https");

const httpAgent = new https.Agent({
  rejectUnauthorized: false,
});

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// fetch : important!
app.get("/results", (req, res) => {
  const url =
    "https://df99dea7-fc6c-4c22-ae8d-dbbe134435c5-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/document/collections/search_result";
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "X-Cassandra-Token":
        "AstraCS:SYGkfjoDSmjEbleYfhxBllNE:16234c22c48b0c2dc60d0a15b834e171cd0761444e81b24712804eaac55483f8",
    },
    agent: httpAgent,
  };
  fetch(url, options)
    .then((response) => response.json())
    .then((json) => res.json(json))
    .catch((err) => console.log("error:" + err));
});

function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
}

function errorHandler(error, req, res) {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message,
  });
}

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
