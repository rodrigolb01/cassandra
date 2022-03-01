const PORT = '8000';
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');
require('dotenv').config();
morgan('tiny');

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// fetch : important!
app.get('/posts', (req, res) => {
    const url = 'https://df99dea7-fc6c-4c22-ae8d-dbbe134435c5-us-east1.apps.astra.datastax.com/api/rest/v2/namespaces/document/collections/my_first_collection/';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'X-Cassandra-Token' : 'AstraCS:SYGkfjoDSmjEbleYfhxBllNE:16234c22c48b0c2dc60d0a15b834e171cd0761444e81b24712804eaac55483f8'
        }
    }
    fetch(url, options)
        .then(response => response.json())
        .then(json => res.json(json))
        .catch(err => console.log('error:' + err))
})

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));