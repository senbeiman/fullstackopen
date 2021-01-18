import { gql } from 'apollo-boost';
export const ITEM_PARTS = gql`fragment ItemParts on Repository {
  id
  fullName
  ratingAverage
  reviewCount
  stargazersCount
  watchersCount
  forksCount
  ownerAvatarUrl
  language
  description
}`;

export const REVIEW_PARTS = gql`fragment ReviewParts on ReviewConnection {
  edges {
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
    cursor
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}`;
