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

export const GET_BY_ID = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      url
      ratingAverage
      reviewCount
      stargazersCount
      forksCount
      description
      language
      ownerAvatarUrl
    }
  }
`

export const GET_REVIEWS = gql`
  query ($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORIES = gql`
  query ($after: String, $first: Int, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(after: $after, first: $first, orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
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