import { GraphQLError } from 'graphql';
import { BidModel } from '../models/bidModel';
import { HTTP_CODES } from '../httpCodes';
import { Bid, CreateBidArgs } from '../types/bidType';

export function createBidResolver({ bidModel }: { bidModel: BidModel }) {
    async function createBid(
        _parent: unknown,
        { data }: { data: CreateBidArgs }
    ): Promise<Bid> {
        const { amount, bidderId, auctionId } = data;

        if (!amount || !bidderId || !auctionId) {
            throw new GraphQLError('Missing required bid fields.', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        try {
            return await bidModel.createBid(data);
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(`Failed to create bid. ${error}`, {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }
}
