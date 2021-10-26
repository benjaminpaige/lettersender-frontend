import { KeystoneContext } from "@keystone-next/types"
import { CartItemWhereInput, OrderCreateInput } from '../.keystone/schema-types'
import { stripeConfig } from "../lib/stripe"

const graphql = String.raw // IDE formatting hack

export const checkout = async (root: any, {token}: {token: string}, context: KeystoneContext): Promise<OrderCreateInput> => {
    console.log('Checking Out!')

    // 1. make sure they are signed in
    const session = context.session
    // session.itemId is basically the userId
    if (!session.itemId) throw new Error('You must be logged in to do create an order!')

    // 2. Query the current user
    const user = await context.lists.User.findOne({
        where: { id: session.itemId },
        resolveFields: graphql`
            id
            firstName
            lastName
            email
            cart {
                id
                letter {
                    recipientName
                    addressLine1
                    addressLine2
                    postcode
                    locality
                    state
                    content
                    price
                }
            }
        `
    })

    const cartItems = user.cart.filter(cartItem => cartItem.letter) // sanity check
    
    // 3. calc the total price
    const amount = cartItems.reduce((total: number, cartItem: CartItemWhereInput) => total + cartItem.letter.price, 0)

    // 4. create the charge with stripe library
    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: "USD",
        confirm: true,
        payment_method: token
    }).catch(error => {
        console.log(error)
        throw new Error(error.message)
    })

    console.log(charge)

    // 5. convert the cartItems to orderItems

    const orderItems = cartItems.map(cartItem => {
        const orderItem = {
            recipientName: cartItem.letter.recipientName, 
            addressLine1: cartItem.letter.addressLine1, 
            addressLine2: cartItem.letter.addressLine2, 
            postcode: cartItem.letter.postcode, 
            locality: cartItem.letter.locality, 
            state: cartItem.letter.state, 
            content: cartItem.letter.content,
            price: cartItem.letter.price,
        }
        return orderItem
    })

    // 6. create the order and return it

    const order = await context.lists.Order.createOne({
        data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems },
            user: { connect: { id: session.itemId }}
        }
    })

    // 7. Clean up any old cart items
    const cartItemsIds = cartItems.map(cartItem => cartItem.id)
    await context.lists.CartItem.deleteMany({
        ids: cartItemsIds
    })

    // 8. Retuirn the order

    return order
}