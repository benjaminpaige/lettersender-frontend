import gql from "graphql-tag"

export const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY {
    allMessages {
      id
      content
      recipientName
      recipientAddress
      status
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
      recipientName
      recipientAddress
      images {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`

export const MESSAGES_PAGINATION_QUERY = gql`
  query MESSAGES_PAGINATION_QUERY {
    _allMessagesMeta {
      count
    }
  }
`
