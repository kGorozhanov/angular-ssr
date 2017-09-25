'use strict';

require('zone.js/dist/zone-node');

const express = require('express');
const compression = require('compression');
const ngUniversal = require('@nguniversal/express-engine');

const appServer = require('./dist-server/main.bundle');

const angularRouter = (req, res) => {
  res.render('index', {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });
};

const app = express();

app.use(compression());

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/dist`));

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: appServer.AppServerModuleNgFactory
}));

app.set('view engine', 'html');
app.set('views', 'dist');

app.get('*', angularRouter);

app.listen(3000, () => {
  console.log(`Listening on http://localhost:3000`);
});
