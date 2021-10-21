import { graphQLSchemaExtension } from "@keystone-next/keystone/schema";
import { addToCart } from './addToCart'

// hack for vscode syntax highlighting 
const graphql = String.raw

export const extendGraphqlSchema = graphQLSchemaExtension({
    typeDefs: graphql`
        type Mutation {
            addToCart(letterId: ID): CartItem
        }
    `,
    resolvers: {
        Mutation: {
            addToCart
        }
    }
})