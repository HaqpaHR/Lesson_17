const { readJSON, writeJSON } = require('./utils');
const { readFile } = require('fs');
const { resolve } = require('path');
const http = require('http');
const { join } = require('path');

const express = require('express');
const lodash = require('lodash');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

app.use(express.json());
app.use(bodyParser.json());

const usersAddr = join(__dirname, './users.json');
const levelsAddr = join(__dirname, './levels.json');

app.get('/get', (req,res) => {
  readJSON(usersAddr, (_, data) =>{
    res.send(data);
  });
});

app.delete('/:id', ({params},res) => {
  const { id } = params;
  console.log(id);
  readJSON(usersAddr, (_,data) => {
    res.send('Deleted');
  });
});

app.patch('/:id', ({ body, params }, res) => {
  const {id} = params;
  res.send('Patched')
})

app.post('/add', ({body}, res) => {
  readJSON(usersAddr, (_, data) => {
        const lastUser = data[data.length - 1];
        const newData = [
          ...data,
          {
            ...body,
            id: ((lastUser && lastUser.id) || 0) + 1,
          },
        ];
        writeJSON(usersAddr, newData, () => {
          res.send(newData);
        });
      });
});

app.get('/', (req,res) => {
  res.send('Hello World')
});


app.listen(port, () => {
  console.log(`Listening http://localhost:${port}`)
});


