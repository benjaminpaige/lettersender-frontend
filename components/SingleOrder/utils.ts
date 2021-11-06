import { compareAsc } from "date-fns"

export function getBadgeInfo({ deliveryDate, chargeDate }) {
  // {deliveryDate: '2021-11-16', chargeDate: 1636221985}

  // delivery date
  const ddArray = deliveryDate.split("-")
  const dd = new Date(ddArray[0], ddArray[1] - 1, ddArray[2])

  // current date
  const todaysDateObject = new Date()
  const td = todaysDateObject.getDate()
  const tm = todaysDateObject.getMonth()
  const ty = todaysDateObject.getFullYear()

  // charge date (epoc date)
  const chargeDateObject = new Date(0)
  chargeDateObject.setUTCSeconds(chargeDate)
  const cd = chargeDateObject.getDate()
  const cm = chargeDateObject.getMonth()
  const cy = chargeDateObject.getFullYear()

  // if same day order was placed -> processing
  if (compareAsc(new Date(cy, cm, cd), new Date(ty, tm, td)) === 0) {
    return {
      badgeColor: "yellow",
      badgeText: "processing"
    }
  }
  // if after estimated arrival -> received
  if (compareAsc(new Date(ty, tm, td), dd) === 1) {
    return {
      badgeColor: "green",
      badgeText: "delivered"
    }
  }

  // fallback - if after placed but before arrival -> in transit
  return {
    badgeColor: "purple",
    badgeText: "In Transit"
  }
}
