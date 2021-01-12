const express = require('express');
const router = express.Router();

const fcm = require('fcm-notification');
const FCM = new fcm('./data/firebase-adminsdk.json');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/',  (req, res, next) => {
  const { user, tokens } = req.body;

  if(user !== undefined) {
    if(user.email !== undefined) {

      const message = {
        notification: {
          title: `${user.email} is logged in.`,
          body: 'Test body',
        },
      }

      try{
        FCM.sendToMultipleToken(message, tokens, (err, response) => {
          if(err) {
            res.json({error: err.toString()})
          } else {
            res.json(response)
          }
        })
      } catch (e) {
        res.json({error: e.toString()})
      }

    } else {
      res.json({error: 'Email undefined.'})
    }
  } else {
    res.json({error: 'User undefined.'})
  }

});

module.exports = router;
