export function calculateCost(storage) {
  // if storage is <= 10, then $4 per note
  // if storage is <= 100 then $2 per note
  // if storage is > 100 then $1 per note
  const rate = storage <= 10
    ? 4
    : storage <= 100
      ? 2
      : 1;

  // Note that Stripe expects us to provide the amount in pennies (the currency's smallest unit)
  // so we must multiply the result by 100
  return rate * storage * 100;
}