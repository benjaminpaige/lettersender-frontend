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
