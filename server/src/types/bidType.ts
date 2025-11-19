export interface Bid {
    id: number;
    amount: number;
    createdAt: Date;
    bidderId: number;
    auctionId: number;
}
