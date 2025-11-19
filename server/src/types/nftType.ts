import { Auction } from './auctionType';

export interface NFT {
    id: number;
    title: string;
    description?: string | null;
    imageUrl: string;
    creatorId: number;
    createdAt: Date;
    auction?: Auction | null;
}
