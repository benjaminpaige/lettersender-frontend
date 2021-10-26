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

export const UPDATE_MESSAGE_MUTATION = gql`
  mutation UPDATE_MESSAGE_MUTATION(
    $id: ID!
    $content: String
    $image: Upload
    $recipientName: String
    $recipientAddress: String
  ) {
    updateMessage(
      id: $id
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

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION(
    $id: ID!
    $firstName: String
    $lastName: String
    $darkMode: Boolean
    $allowMarketingTips: Boolean
    $allowMarketingUpdates: Boolean
  ) {
    updateUser(
      id: $id
      data: {
        firstName: $firstName
        lastName: $lastName
        darkMode: $darkMode
        allowMarketingTips: $allowMarketingTips
        allowMarketingUpdates: $allowMarketingUpdates
      }
    ) {
      id
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SIGNIN_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          darkMode
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`

export const SIGNUP_USER_MUTATION = gql`
  mutation SIGNUP_USER_MUTATION(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      data: {
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
      }
    ) {
      id
      email
    }
  }
`

export const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`

export const SEND_PASSWORD_RESET_LINK_MUTATION = gql`
  mutation SEND_PASSWORD_RESET_LINK_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      message
      code
    }
  }
`

export const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $token: String!
    $password: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`
export const CREATE_LETTER_MUTATION = gql`
  mutation CREATE_LETTER_MUTATION(
    $recipientName: String!
    $addressLine1: String!
    $addressLine2: String
    $postcode: String!
    $locality: String!
    $state: String!
  ) {
    createLetter(
      data: {
        recipientName: $recipientName
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        postcode: $postcode
        locality: $locality
        state: $state
      }
    ) {
      id
    }
  }
`

export const UPDATE_LETTER_MUTATION = gql`
  mutation UPDATE_LETTER_MUTATION(
    $id: ID!
    $content: String
    $recipientName: String!
    $addressLine1: String!
    $addressLine2: String
    $postcode: String!
    $locality: String!
    $state: String!
  ) {
    updateLetter(
      id: $id
      data: {
        content: $content
        recipientName: $recipientName
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        postcode: $postcode
        locality: $locality
        state: $state
      }
    ) {
      id
    }
  }
`

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART ($id: ID!) {
    addToCart(letterId: $id)
    {
      id
    }
  }
`

export const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`

export const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
      }
    }
  }
`