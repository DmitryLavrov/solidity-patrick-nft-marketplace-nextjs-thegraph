import React, {useEffect, useState} from 'react'
import basicNftAbi from '../constants/abiBasicNft.json'
import nftMarketplaceAbi from '../constants/abiNftMarketplace.json'
import {useMoralis, useWeb3Contract} from 'react-moralis'
import {AttributesNft} from '../models/models'
import {Card, useNotification} from 'web3uikit'
import Image from 'next/image'
import {ethers} from 'ethers'
import UpdateListingModal from './updateListingModal'

const truncateStr = (str: string, strLen: number) => {
  const separator = '...'

  if ((str.length <= strLen) || (str.length <= separator.length)) {
    return str
  }

  return str.substring(0, Math.ceil((strLen - separator.length) / 2))
    + separator
    + str.substring(Math.ceil(str.length - (strLen - separator.length) / 2), str.length)
}

const NftBox = ({marketplaceAddress, nftAddress, price, tokenId, seller}: AttributesNft) => {
  const [imageUrl, setImageUrl] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenDescription, setTokenDescription] = useState('')
  const [showModal, setShowModal] = useState(false)

  const hideModal = () => setShowModal(false)

  const dispatch = useNotification()

  const {isWeb3Enabled, account} = useMoralis()

  const {runContractFunction: getTokenUri} = useWeb3Contract({
    abi: basicNftAbi,
    contractAddress: nftAddress,
    functionName: 'tokenURI',
    params: {tokenId: tokenId}
  })

  const {runContractFunction: buyItem} = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: 'buyItem',
    msgValue: price,
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId
    }
  })


  const updateUI = async () => {
    const tokenUri = (await getTokenUri({onError: (error) => console.error(error)})) as (string | undefined)
    //--------------------------
    console.log(`Token URL is ${tokenUri}`)
    //--------------------------
    if (tokenUri) {
      const requestUri = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
      const tokenUriResponse = await (await fetch(requestUri)).json()
      setImageUrl(tokenUriResponse.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))
      //--------------------------
      console.log(`Image URL is ${tokenUriResponse.image}`)
      //--------------------------

      setTokenName(tokenUriResponse.name)
      setTokenDescription(tokenUriResponse.description)
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  const isOwnedByUser = (seller === account) || (seller === undefined)
  const formattedSellerAddress = isOwnedByUser ? 'you' : truncateStr(seller || '', 15)

  const handleClick = () => {
    isOwnedByUser
      ? setShowModal(true)
      : buyItem({
        onError: error => console.error(error),
        onSuccess: () => handleBuyItemSuccess()
      })
  }
  
  const handleBuyItemSuccess = () => {
    dispatch({
      type: 'success',
      message: 'Item bought!',
      title: 'Item bought',
      position: 'topR'
    })
  }

  return (<>
    {imageUrl
      ?
      <div className="inline-block">
        <UpdateListingModal isVisible={showModal}
                            marketplaceAddress={marketplaceAddress}
                            nftAddress={nftAddress}
                            price={price}
                            tokenId={tokenId}
                            hideModal={hideModal}/>
        <Card title={tokenName}
              description={tokenDescription}
              onClick={handleClick}>
          <div className="flex flex-col items-center gap-2">
            <div>#{tokenId}</div>
            <div className="italic text-sm">Owned by {formattedSellerAddress}</div>
            <Image loader={() => imageUrl} src={imageUrl} height="200" width="200"/>
            <div className="font-bold">{ethers.utils.formatUnits(price, 'ether')} ETH</div>
          </div>
        </Card>
      </div>

      : <div>Loading...</div>
    }
  </>)
}

export default NftBox
