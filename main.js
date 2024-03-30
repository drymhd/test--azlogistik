const express = require('express');
const app = express();
const port = 3000;
const pg = require('pg');

const router = require('./routers/router.js');



router();