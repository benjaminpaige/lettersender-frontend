export const formatMoney = (amount = 0) => {
  const noCentsInPrice = amount % 100 === 0

  const formatter = Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: noCentsInPrice ? 0 : 2
  })
  return formatter.format(amount / 100)
}
