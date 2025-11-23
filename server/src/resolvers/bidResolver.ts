import { GraphQLError } from 'graphql';
import { BidModel } from '../models/bidModel';
import { HTTP_CODES } from '../httpCodes';
import { Bid, PlaceBidArgs } from '../types/bidType';

export function placeBidResolver({ bidModel }: { bidModel: BidModel }) {
    async function placeBid(
        _parent: unknown,
        { data }: { data: PlaceBidArgs }
    ): Promise<Bid> {
        const { amount, bidderId, auctionId } = data;

        if (!amount || !bidderId || !auctionId) {
            throw new GraphQLError('Missing required bid fields.', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        try {
            return await bidModel.placeBid(data);
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(`Failed to create bid. ${error}`, {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }
}
