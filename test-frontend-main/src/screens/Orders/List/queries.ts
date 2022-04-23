import { gql } from "@apollo/client";

export const GET_ORDERS_QUERY = gql`
  query Orders($page: Int) {
    getOrders(page: $page) {
      orders {
        id
        number
        site
        createdAt
        delivery {
          code
        }
        status
      }
      pagination {
        limit
        totalCount
        currentPage
        totalPageCount
      }
    }
  }
`;

export const ORDER_QUERY = gql`
        query getOrder($number:String!){
          order(number: $number){
            id
            number
            delivery {
                code
            }
            statusUpdatedAt
            createdAt
            site
            status
            items {
                id
            }
          }
        }
`

