import type {NextPage} from 'next'
import Header from '../components/header'
import {useMoralis, useMoralisQuery} from 'react-moralis'
import {AttributesNft, NetworkConfigMap} from '../models/models'
import NftBox from '../components/nftBox'
import networkMapping from '../constants/networkMapping.json'
import {useQuery} from '@apollo/client'
import {GET_ACTIVE_ITEMS} from '../constants/subgraphQueries'

const Home: NextPage = () => {
  // const {data: listedNfts, isFetching} = useMoralisQuery('ActiveItem', query => query.limit(10))


  const {isWeb3Enabled, chainId} = useMoralis()
  const chainIdString = chainId ? parseInt(chainId).toString() : '31337'
  const marketplaceAddress = (networkMapping as NetworkConfigMap)[chainIdString].NftMarketplace

  const {loading, error, data: listedNfts} = useQuery(GET_ACTIVE_ITEMS)

  return (
    <>
      <Header/>

      <main className="container mx-auto">
        <h1 className="text-2xl p-4 font-bold text-slate-600">Recently listed</h1>

        {isWeb3Enabled
          ?
          loading || !listedNfts
            ? <p>Loading...</p>
            : <div className="flex flex-wrap gap-4 justify-center">
              {listedNfts.activeItems.map((nft: AttributesNft) => {
                const {nftAddress, price, tokenId, seller} = nft
                return <NftBox key={`${marketplaceAddress}${tokenId}`}
                               marketplaceAddress={marketplaceAddress}
                               nftAddress={nftAddress}
                               price={price}
                               tokenId={tokenId}
                               seller={seller}/>
              })}
            </div>

          : <div className='text-center mt-4'>Web3 currently not enabled</div>
        }
      </main>
    </>
  )
}

export default Home
