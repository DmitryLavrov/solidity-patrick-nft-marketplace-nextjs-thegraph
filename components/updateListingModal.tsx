import React, {useState} from 'react'
import {Input, Modal, useNotification} from 'web3uikit'
import {useWeb3Contract} from 'react-moralis'
import nftMarketplaceAbi from '../constants/abiNftMarketplace.json'
import {ethers} from 'ethers'

interface IUpdateListingModal {
  marketplaceAddress: string,
  nftAddress: string,
  price: string,
  tokenId: string,
  isVisible: boolean,
  hideModal: ()=>void
}

const UpdateListingModal = ({marketplaceAddress, nftAddress, price, tokenId, isVisible, hideModal}: IUpdateListingModal) => {
  const [priceToUpdateListingWith, setPriceToUpdateListingWith] = useState(ethers.utils.formatUnits(price, 'ether'))

  const dispatch = useNotification()

  const {runContractFunction: updateListing} = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: marketplaceAddress,
    functionName: 'updateListing',
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(priceToUpdateListingWith || '0')
    }
  })

  const handleUpdateListingSuccess = async (tx:any) => {
    tx.wait(1)
    dispatch({
      type: 'success',
      message: 'Listing updated!',
      title: 'Listing updated. Please refresh (and move blocks)',
      position: 'topR'
    })

    hideModal && hideModal()

    setPriceToUpdateListingWith('0')
  }

  return (
    <Modal isVisible={isVisible}
           onCancel={hideModal}
           onCloseButtonPressed={hideModal}
           onOk={() => {
             updateListing({
               onError: error => console.error(error),
               onSuccess: handleUpdateListingSuccess
             })
           }}>
      <Input label="Update listing price in L1 currency (ETH)"
             name="New listing price"
             type="number"
             value={priceToUpdateListingWith}
             onChange={event => {
               setPriceToUpdateListingWith(event.target.value)
             }}/>
    </Modal>
  )
}

export default UpdateListingModal
