require('dotenv').config();

const express = require('express');
const app = express();
const user = require('./controllers/usercontroller');
const projects = require('./controllers/projectscontroller');
const sequelize = require('./db');
const bodyParser = require('body-parser');

sequelize.sync();

app.use(bodyParser.json());

app.use(express.json());
app.use(require('./middleware/headers'));

app.use('/user', user);

// app.use(require('./middleware/validate-session'));

app.use('/projects', projects);

app.listen(process.env.PORT, () =>
console.log(`app is on ${process.env.PORT}`));