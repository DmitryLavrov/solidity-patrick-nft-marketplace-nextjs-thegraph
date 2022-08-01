import React from 'react'
import {ConnectButton} from 'web3uikit'
import Link from 'next/link'

const Header = () => {
  return (
    <nav className="p-4 border-b flex flex-row justify-between items-center">
      <h1 className="py-4 font-bold text-3xl text-slate-600">NFT Marketplace</h1>
      <div className='flex flex-row justify-between items-center'>
        <Link href="/">
          <a className='mx-2 p-2'>Home</a>
        </Link>

        <Link href="/sell-nft">
          <a className='mx-2 p-2'>Sell NFT</a>
        </Link>
        <ConnectButton moralisAuth={false}/>
      </div>
    </nav>
  )
}

export default Header
