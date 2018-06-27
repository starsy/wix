let express = require('express');
let router = express.Router();
let log = require('../log')(__filename, 'info');


/* GET home page. */
router.get('/', function(req, res, next) {
  let key = req.query.key;
  let ip = req.query.ip;

  log.info("key:", key, "ip:", ip);

  res.json({key, ip});

});

module.exports = router;
