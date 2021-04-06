import gql from "graphql-tag"

export const CREATE_MESSAGE_MUTATION = gql`
  mutation CREATE_MESSAGE_MUTATION($content: String!, $image: Upload) {
    createMessage(
      data: { content: $content, images: { create: { image: $image } } }
    ) {
      id
      content
    }
  }
`
