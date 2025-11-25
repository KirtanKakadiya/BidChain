import { GraphQLError } from 'graphql';
import type { User } from '../types/userTypes';
import type { UserModel } from '../models/userModel';
import type { AuctionModel } from '../models/auctionModel';
import type { Auction } from '../types/auctionType';
import { HTTP_CODES } from '../httpCodes';

export function createQueryResolvers({
    userModel,
    auctionModel,
}: {
    userModel: UserModel;
    auctionModel: AuctionModel;
}) {
    async function user(
        _parent: unknown,
        { email }: { email: string }
    ): Promise<User> {
        const userData = await userModel.getUserByEmail(email);

        if (!userData) {
            throw new GraphQLError('User not found.', {
                extensions: { code: HTTP_CODES.NOT_FOUND },
            });
        }

        return userData;
    }

    async function auction(
        _parent: unknown,
        { id }: { id: number }
    ): Promise<Auction> {
        try {
            const auctionSearch = await auctionModel.getAuctionById(id);
            if (!auctionSearch) {
                throw new GraphQLError('Auction not found.', {
                    extensions: { code: HTTP_CODES.NOT_FOUND },
                });
            }
            return auctionSearch;
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(`Failed to fetch auction by id. ${error}`, {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }

    async function auctionByNftId(
        _parent: unknown,
        { nftId }: { nftId: number }
    ): Promise<Auction> {
        try {
            const auctionSearch = await auctionModel.getAuctionByNftId(nftId);
            if (!auctionSearch) {
                throw new GraphQLError('Auction not found.', {
                    extensions: { code: HTTP_CODES.NOT_FOUND },
                });
            }
            return auctionSearch;
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(
                `Failed to fetch auction by NFT id. ${error}`,
                {
                    extensions: { code: HTTP_CODES.SERVER_ERROR },
                }
            );
        }
    }

    return { user, auction };
}
