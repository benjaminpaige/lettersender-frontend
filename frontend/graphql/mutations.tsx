import gql from "graphql-tag"

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION(
    $content: String!
    $image: Upload
    $recipientName: String!
    $recipientAddress: String!
  ) {
    createMessage(
      data: {
        content: $content
        recipientName: $recipientName
        recipientAddress: $recipientAddress
        images: { create: { image: $image } }
      }
    ) {
      id
    }
  }
`
