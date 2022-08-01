import type {NextPage} from 'next'
import Header from '../components/header'
import {Button, Form, useNotification} from 'web3uikit'
import {BigNumber, ethers} from 'ethers'
import nftMarketplaceAbi from '../constants/abiNftMarketplace.json'
import basicNftAbi from '../constants/abiBasicNft.json'
import {useMoralis, useWeb3Contract} from 'react-moralis'
import networkMapping from '../constants/networkMapping.json'
import {useEffect, useState} from 'react'
import {NetworkConfigMap} from '../models/models'

const Home: NextPage = () => {
  const [proceeds, setProceeds] = useState('0')
  const dispatch = useNotification()

  const {chainId, isWeb3Enabled, account} = useMoralis()
  const chainIdString = chainId ? parseInt(chainId).toString() : '31337'
  const marketplaceAddress = (networkMapping as NetworkConfigMap)[chainIdString].NftMarketplace

  // @ts-ignore
  const {runContractFunction} = useWeb3Contract()

  useEffect(() => {
    if (isWeb3Enabled) {
      getProceeds()
    }
  },[proceeds, account, isWeb3Enabled, chainId])

  const approveAndList = async ({data}: any) => {
    const nftAddress = data[0].inputResult
    const tokenId = data[1].inputResult
    const price = ethers.utils.parseEther(data[2].inputResult).toString()

    console.log('Approving token to marketplace',)
    const approveOptions = {
      abi: basicNftAbi,
      contractAddress: nftAddress,
      functionName: 'approve',
      params: {
        to: marketplaceAddress,
        tokenId: tokenId
      }
    }

    await runContractFunction({
      params: approveOptions,
      onSuccess: () => handleApproveSuccess(nftAddress, tokenId, price),
      onError: error => console.error(error)
    })
  }

  const handleApproveSuccess = async (nftAddress: string, tokenId: string, price: string) => {
    console.log('Listing our token',)
    const listOptions = {
      abi: nftMarketplaceAbi,
      contractAddress: marketplaceAddress,
      functionName: 'listItem',
      params: {
        nftAddress: nftAddress,
        tokenId: tokenId,
        price: price
      }
    }

    await runContractFunction({
      params: listOptions,
      onSuccess: () => handleListSuccess(),
      onError: error => console.error(error)
    })
  }

  const handleListSuccess = async () => {
    dispatch({
      type: 'success',
      message: 'Item listed!',
      title: 'Item listed',
      position: 'topR'
    })
  }

  const withdrawProceeds = async () => {
    console.log('Withdrawing proceeds',)
    const withdrawProceedsOptions = {
      abi: nftMarketplaceAbi,
      contractAddress: marketplaceAddress,
      functionName: 'withdrawProceeds',
      params: {}
    }

    await runContractFunction({
      params: withdrawProceedsOptions,
      onSuccess: () => handleWithdrawProceeds(),
      onError: error => console.error(error)
    })
  }

  const handleWithdrawProceeds = async () => {
    dispatch({
      type: 'success',
      message: 'Proceeds withdrawn!',
      title: 'Proceeds withdrawn',
      position: 'topR'
    })
  }

  const getProceeds = async () => {
    console.log('Get proceeds',)
    const withdrawProceedsOptions = {
      abi: nftMarketplaceAbi,
      contractAddress: marketplaceAddress,
      functionName: 'getProceeds',
      params: {seller: account}
    }

    const currentProceeds = (await runContractFunction({
      params: withdrawProceedsOptions,
      onError: error => console.error(error)
    })) as BigNumber

    if (currentProceeds) {
      console.log('currentProceeds',currentProceeds.toString())
      setProceeds(currentProceeds.toString())
    }
  }


  return (
    <>
      <Header/>

      <main className="container mx-auto">
        <Form title="Sell your NFT"
              data={[
                {
                  name: 'NFT address',
                  type: 'text',
                  value: '',
                  inputWidth: '50%',
                  key: 'ntfAddress'
                },
                {
                  name: 'Token ID',
                  type: 'number',
                  value: '',
                  key: 'tokenId'
                },
                {
                  name: 'Price (in ETH)',
                  type: 'number',
                  value: '',
                  key: 'price'
                }
              ]}
              id="sell-form"
              onSubmit={approveAndList}/>

        {proceeds === '0'
          ? <p>No proceeds detected</p>
          : <Button text={`Withdraw proceeds: ${ethers.utils.formatUnits(proceeds, 'ether')} ETH`}
                    type='button'
                    onClick={withdrawProceeds}/>
        }
      </main>
    </>
  )
}

export default Home
