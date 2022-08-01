import React from 'react'
import {ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery} from '@apollo/client'

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 5, where: {buyer: null}) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`

const GraphExample = () => {
  const {loading, error, data} = useQuery(GET_ACTIVE_ITEMS)
  //--------------------------
  console.log('data:', data)
  //--------------------------


  return (
    <div>

    </div>
  )
}

export default GraphExample
