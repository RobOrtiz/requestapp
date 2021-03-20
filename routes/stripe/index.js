const router = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();

const stripeKey = process.env.STRIPE_SK;
const stripe = require('stripe')(stripeKey);

router.post("/checkout", async (req, res) => {
  let urlBase = req.headers.referer
  console.log(`${urlBase.slice(0,urlBase.indexOf('/request'))}`);
  console.log("HEADERS FROM THE REQ: " + req.headers);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.product.name
          },
          unit_amount: req.body.product.price
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    cancel_url: `${urlBase.slice(0,urlBase.indexOf('/request'))}/request/${req.body.product._id}`,
    success_url: `${urlBase.slice(0,urlBase.indexOf('/request'))}/request/confirmation/${req.body.product._id}?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      "albumCover": req.body.product.albumCover,
      "tip": req.body.product.tip,
      "fullName": req.body.product.fullName,
      "title": req.body.product.title,
      "artist": req.body.product.artist,
      "generalRequest": req.body.product.generalRequest,
      "playNow": req.body.product.playNow,
      "songStatus": req.body.product.songStatus,
      "_id": req.body.product._id
    }
  });

  return res.json({ id: session.id })
  
});

router.post("/success", async (req, res) => {

  const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

  res.json(session.metadata);

});


module.exports = router;
