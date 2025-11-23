import { DbClient } from '../db/dbClient';
import type { Bid, CreateBidArgs } from '../types/bidType';

export interface BidModel {
    readonly getBidById: (id: number) => Promise<Bid | undefined>;
    readonly createBid: (data: CreateBidArgs) => Promise<Bid>;
}

export function createBidModel(db: DbClient): BidModel {
    async function getBidById(id: number) {
        return (
            (await db.bid.findUnique({
                where: { id },
                include: { auction: true, bidder: true },
            })) ?? undefined
        );
    }

    async function createBid(data: CreateBidArgs) {
        return db.bid.create({
            data: {
                amount: data.amount,
                bidderId: data.bidderId,
                auctionId: data.auctionId,
            },
            include: { auction: true, bidder: true },
        });
    }

    return Object.freeze({
        getBidById,
        createBid,
    });
}
