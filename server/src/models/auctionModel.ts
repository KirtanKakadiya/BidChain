// src/models/auctionModel.ts
import { DbClient } from '../db/dbClient';
import type { Auction } from '../types/auctionType';

export interface AuctionModel {
    readonly getAuctionById: (id: number) => Promise<Auction | undefined>;
    readonly createAuction: (data: any) => Promise<Auction>;
    readonly updateAuction: (id: number, data: any) => Promise<Auction>;
}

export function createAuctionModel(db: DbClient): AuctionModel {
    async function getAuctionById(id: number) {
        return null;
    }

    async function createAuction(data: any) {
        return null;
    }

    async function updateAuction(id: number, data: any) {
        return null;
    }

    return Object.freeze({
        getAuctionById,
        createAuction,
        updateAuction,
    });
}
