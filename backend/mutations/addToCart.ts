import { KeystoneContext } from "@keystone-next/types"
import { CartItemCreateInput } from '../.keystone/schema-types'
import { Session } from "../types"

export const addToCart = async (root: any, {letterId}: {letterId: string}, context: KeystoneContext): Promise<CartItemCreateInput> => {
    console.log('Adding To Cart!')
    // 1. query the current user to see if they are signed in
    const session = context.session as Session
    if (!session.itemId) throw new Error('You must be logged in to do this!')

    // 2. create a new cart item
    return await context.lists.CartItem.createOne({
        data: {
            letter: { connect: { id: letterId }},
            user: { connect: { id: session.itemId }}
        }
    })
}