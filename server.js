// App dependencies ---------------------------- /
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Create express App ------------------------- /
const app = express();
const PORT = process.env.PORT || 3000;

// require models ------------------------- /
const db = require('./models');
const apiRouter = require('./controllers/apiRouter');

// Logger ------------------------- /
app.use(morgan(':method :url :status :res[content-length] - :response-time ms')); // for logging

// App middleware ------------------------------ /
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Route config -------------------------------------------/
app.use('/api', apiRouter);

// Start server ---------------------------------- /
db.sequelize.sync().then(() => {
  console.info('Databases are all synced!');
  app.listen(PORT, (err) => {
    if (err) console.log(err);
    console.info(`Listening on port: ${PORT}`);
  });
}).catch((err) => logger.error(err));
