import { gql } from '@apollo/client';

/* totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      } */
export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          fullName
          ratingAverage
          reviewCount
          stargazersCount
          forksCount
          description
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;