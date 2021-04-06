import gql from "graphql-tag"

export const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY {
    allMessages {
      id
      content
      images {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export const SINGLE_MESSAGE_QUERY = gql`
  query SINGLE_MESSAGE_QUERY($id: ID!) {
    Message(where: { id: $id }) {
      content
      images {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`
