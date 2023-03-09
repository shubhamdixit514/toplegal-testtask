import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
query ($page: Int!) {
  characters(page: $page) {
    results {
      id
      name
      gender
      type
      status
      species
      origin {
        name
      }
      location {
        name
      }
      image
      created
    }
  }
}`