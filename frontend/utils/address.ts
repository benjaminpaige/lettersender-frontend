import { Recipient } from "@/components/SelectRecipient"

export const verifyMailingAddress = (recipient: Recipient) => {
    return fetch('https://api.postgrid.com/v1/addver/verifications', {
        method: "post",
        headers: {
            'x-api-key': process.env.NEXT_PUBLIC_POST_GRID,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            address: {
                line1: recipient.address,
                line2: recipient.address2,
                city: recipient.locality,
                provinceOrState: recipient.state,
                postalOrZip: recipient.postcode
            }
        })
    }).then(r=> r.json())
}
