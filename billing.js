import stripePackage from "stripe";
import handler from "./libs/handler-lib";
import { calculateCost } from "./libs/billing-lib";

export const main = handler(async (event, context) => {
  // storage is the number of notes the user would like to store
  // source is the Stripe token for the card that we are going to charge
  const { storage, source } = JSON.parse(event.body);
  // calculateCost will figure out how much to charge a user based on the number of notes that are going to be stored
  const amount = calculateCost(storage);
  const description = "Scratch Charge";

  // Load our secret key from the environment variables
  const stripe = stripePackage(process.env.stripeSecretKey);

  // create a new stripe object and charge the user
  await stripe.charges.create({
    source, 
    amount,
    description,
    currency: "usd",
  });

  return { status: true };
});