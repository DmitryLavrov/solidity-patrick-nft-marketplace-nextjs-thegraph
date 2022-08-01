import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {MoralisProvider} from 'react-moralis'
import {NotificationProvider} from 'web3uikit'
import Head from 'next/head'
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.studio.thegraph.com/query/31398/nft-marketplace/v0.0.2',
  cache: new InMemoryCache(),
})

function MyApp({Component, pageProps}: AppProps) {

  return (
    <>
      <Head>
        <title>NFT marketplace</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <ApolloProvider client={client}>
        <MoralisProvider initializeOnMount={false}>
          <NotificationProvider>
            <Component {...pageProps} />
          </NotificationProvider>
        </MoralisProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
