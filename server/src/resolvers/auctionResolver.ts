import { GraphQLError } from 'graphql';
import { AuctionModel } from '../models/auctionModel';
import { HTTP_CODES } from '../httpCodes';
import { Auction } from '../types/auctionType';
import { Categories } from '@prisma/client';

export function createAuctionResolver({
    auctionModel,
}: {
    auctionModel: AuctionModel;
}) {}
