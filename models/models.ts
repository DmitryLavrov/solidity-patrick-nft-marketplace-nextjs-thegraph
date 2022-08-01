import Attributes from 'moralis'

export interface AttributesNft{
    marketplaceAddress: string;
    nftAddress: string;
    price: string;
    tokenId: string;
    seller: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

type NetworkConfigItem = {
    NftMarketplace: string
}

export type NetworkConfigMap = {
    [chainId: string]: NetworkConfigItem
}
