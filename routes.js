module.exports = function(app, db) {
  app.post('/verifyCard', (req, res) => {
    const terminals = db.collection('terminals');
    terminals.findOne({cards: { id: req.body.cardId }}, (err, item) => {
      if (err) {
        res.json({error: err})
      }

      if(item) {
        res.json({status: true})
      } else {
        res.json({status: false})
      }
    });
  });

  app.post('/getWay', (req, res) => {
    const terminals = db.collection('terminals');
    terminals.findOne({termId: req.body.termId}, (err, item) => {
      if (err) {
        res.json({error: err})
      }

      if(item) {
        res.json(item.stops)
      } else {
        res.json({status: false})
      }
    });
  });
};
