import { gql } from 'apollo-boost';
import { ITEM_PARTS, REVIEW_PARTS } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories($after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String){
    repositories(first: 4, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          ...ItemParts
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${ITEM_PARTS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false){
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            repository {
              id
              fullName
            }
          }
        }
        ...ReviewParts
      }
    }
  }
  ${REVIEW_PARTS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $after: String) {
    repository(id: $id) {
      url
      reviews(first: 2, after: $after) {
        ...ReviewParts
      }
      ...ItemParts
    }
  }
  ${REVIEW_PARTS}
  ${ITEM_PARTS}
`;