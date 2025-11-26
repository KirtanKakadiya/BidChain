import { GraphQLError } from 'graphql';
import { BidModel } from '../models/bidModel';
import { HTTP_CODES } from '../httpCodes';
import { Bid, PlaceBidArgs } from '../types/bidType';
import { UserModel } from '../models/userModel';
import { AuctionModel } from '../models/auctionModel';
import { configDotenv } from 'dotenv';

export function createBidResolver({
    bidModel,
    userModel,
    auctionModel,
}: {
    bidModel: BidModel;
    userModel: UserModel;
    auctionModel: AuctionModel;
}) {
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

        // Attempt to retrieve user by ID
        const user = await userModel.getUserById(bidderId);
        if (!user) {
            throw new GraphQLError(
                'User not found while attempting to place bid.',
                { extensions: { code: HTTP_CODES.NOT_FOUND } }
            );
        }

        // Check if user has enough balance to place bid
        if (user.walletBalance < amount) {
            throw new GraphQLError('Insufficient wallet balance.', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        // Attempt to retrieve auction by ID
        const auction = await auctionModel.getAuctionById(auctionId);
        if (!auction) {
            throw new GraphQLError(
                'Auction not found while attempting to place bid.',
                { extensions: { code: HTTP_CODES.NOT_FOUND } }
            );
        }

        // Verify bid is higher than current price
        if (amount <= auction.currentPrice) {
            throw new GraphQLError('Bid must be higher than current price.', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        try {
            const bid = await bidModel.placeBid(data);

            // update auction's price
            await auctionModel.updateAuction(auctionId, {
                currentPrice: amount,
            });

            return bid;
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(`Failed to create bid. ${error}`, {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }

    return {
        placeBid,
    };
}
