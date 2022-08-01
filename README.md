## Getting Started

### Prerequisites

```bash
npm i npm@latest -g
npx create-next-app@latest --typescript .
```

### Installation

```bash
npm i web3uikit 
npm i moralis react-moralis
npm i magic-sdk
npm i -g moralis-admin-cli


npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```shell
# for addEvents.js
npm i -D dotenv
```

```shell
# for The Graph
# Apollo Client
npm i @apollo/client graphql
```
## Resources   
Install Tailwind CSS with Next.js   
https://tailwindcss.com/docs/guides/nextjs

Devchain Proxy Server   
https://admin.moralis.io/dapps/networks   
https://github.com/fatedier/frp/releases   

useMoralisQuery()   
https://github.com/MoralisWeb3/react-moralis#usemoralisquery

web3uikit -- Card   
https://github.com/web3ui/web3uikit#card-   
https://web3ui.github.io/web3uikit/?path=/docs/4-ui-card--regular

web3uikit -- Modal  
https://github.com/web3ui/web3uikit#modal-   
https://web3ui.github.io/web3uikit/?path=/docs/5-popup-modal--regular

web3uikit -- Form   
https://github.com/web3ui/web3uikit#form-   
https://web3ui.github.io/web3uikit/?path=/docs/2-forms-form   





# Usage

## Useful commands

```shell
# Add events to Moralis database (for listening them)
# https://docs.moralis.io/moralis-dapp/connect-the-sdk/connect-using-node
node addEvents.js
```

```shell
# Start Moralis sync
$ start ./frp/frpc.exe -c frp/frpc.ini
```

## Test Stand

```shell
# 🟨 solidity-patrick-nft-marketplace-hardhat
# terminal 1
$ hh node

# terminal 2
$ hh run scripts/mintAndList.ts --network localhost
$ hh run scripts/cancelItem.ts --network localhost
$ hh run scripts/buyItem.ts --network localhost

# 🟨 solidity-patrick-nft-marketplace-nextjs-moralis
# terminal 1
# package.json -> script "moralis:sync"

# terminal 2
# package.json -> script "moralis:cloud"
```

# Build and deploy

## Manual deploy to IPFS

## Deploy with Fleek

### Settings

Build command:
```shell
npm install && npm run build && npm run export
```

### Result
