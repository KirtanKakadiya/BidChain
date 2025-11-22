// src/models/auctionModel.ts
import { DbClient } from '../db/dbClient';
import type {
    Auction,
    CreateAuctionArgs,
    UpdateAuctionInput,
} from '../types/auctionType';

export interface AuctionModel {
    readonly getAuctionById: (id: number) => Promise<Auction | undefined>;
    readonly getAuctionByNftId: (id: number) => Promise<Auction | undefined>;
    readonly createAuction: (data: CreateAuctionArgs) => Promise<Auction>;
    readonly updateAuction: (id: number, data: any) => Promise<Auction>;
}

export function createAuctionModel(db: DbClient): AuctionModel {
    async function getAuctionById(id: number) {
        return (
            (await db.auction.findUnique({
                where: { id },
                include: { nft: true },
            })) ?? undefined
        );
    }

    async function getAuctionByNftId(id: number) {
        return (
            (await db.auction.findUnique({
                where: { nftId: id },
            })) ?? undefined
        );
    }

    async function createAuction(data: CreateAuctionArgs) {
        return db.auction.create({
            data: {
                nftId: data.nftId,
                startPrice: data.startPrice,
                startTime: data.startTime,
                endTime: data.endTime,
                isActive: data.isActive ?? true,
            },
            include: { nft: true },
        });
    }

    async function updateAuction(id: number, data: UpdateAuctionInput) {
        return db.auction.update({
            where: { id },
            data: {
                currentPrice: data.currentPrice ?? undefined,
                endTime: data.endTime ?? undefined,
                isActive: data.isActive ?? undefined,
            },
            include: { nft: true },
        });
    }

    return Object.freeze({
        getAuctionById,
        getAuctionByNftId,
        createAuction,
        updateAuction,
    });
}
