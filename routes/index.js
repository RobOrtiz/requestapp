const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const stripe = require('stripe')('sk_test_51IUJhcHM5nnUsQBqPYnu9HKgTJ06ACMwoDehn2wgcKVhhAhcb2rrItV9ntD0XbHaOjyugshEIZ7R5o2Xon8uI2ZX00bvUf2x8R');
const { v4: uuidv4 } = require('uuid');


// API Routes
router.use("/api", apiRoutes);

router.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotencyKey = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the song: ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotencyKey
      }
    );
    console.log("Charge: ", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status});

});

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
