import { gql } from '@apollo/client'

// 10.13 authentikointi mutaatio
export const AUTHENTICATE = gql`
  mutation Mutation($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        username
      }
    }
  }
`

export const CREATE_USER = gql `
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      username
    }
  }
`
export const CREATE_REVIEW = gql`
  mutation Review($review: CreateReviewInput) {
    createReview(review: $review) {
      repositoryId
      text
      rating
      user {
        username
      }
      repository {
        name
      }
    }
  }
`