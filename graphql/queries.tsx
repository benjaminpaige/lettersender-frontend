import gql from "graphql-tag"

export const ALL_MESSAGES_QUERY = gql`
  query ALL_MESSAGES_QUERY($skip: Int = 0, $first: Int) {
    authenticatedItem {
      ... on User {
        messages(skip: $skip, first: $first) {
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
    authenticatedItem {
      ... on User {
        _messagesMeta {
          count
        }
      }
    }
  }
`
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        fullName
        darkMode
        dateJoined
        allowMarketingTips
        allowMarketingUpdates
        cart {
          id
          letter {
            recipientName
            addressLine1
            addressLine2
            postcode
            locality
            state
            price
          }
        }
        orders {
          id
          total
          charge
          paymentStatus
          chargeDate
          items {
            id
            recipientName
            addressLine1
            addressLine2
            postcode
            locality
            state
            content
            lobOrderId
            lobOrderToId
            lobOrderMailType
            lobOrderPdfUrl
            lobOrderCarrier
            lobOrderExpectedDeliveryDate
            lobOrderType
            price
          }
        }
      }
    }
  }
`
