import { GraphQLError } from 'graphql';
import { AuctionModel } from '../models/auctionModel';
import { HTTP_CODES } from '../httpCodes';
import {
    Auction,
    CreateAuctionArgs,
    UpdateAuctionInput,
} from '../types/auctionType';

export function createAuctionResolver({
    auctionModel,
}: {
    auctionModel: AuctionModel;
}) {
    async function createAuction(
        _parent: unknown,
        { data }: { data: CreateAuctionArgs }
    ): Promise<Auction> {
        const { nftId, startPrice, startTime, endTime } = data;

        if (!nftId || !startPrice || !startTime || !endTime) {
            throw new GraphQLError('Missing requiredNFT fields.', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        try {
            return await auctionModel.createAuction(data);
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(`Failed to create Auction. ${error}`, {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }

    async function getAuctionById(
        _parent: unknown,
        id: number
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

    async function getAuctionByNftId(
        _parent: unknown,
        id: number
    ): Promise<Auction> {
        try {
            const auctionSearch = await auctionModel.getAuctionByNftId(id);
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

    async function updateAuction(
        _parent: unknown,
        { data }: { data: UpdateAuctionInput }
    ): Promise<Auction> {
        const { id, currentPrice, endTime, isActive } = data;

        if (!id) {
            throw new GraphQLError('Missing required id field.', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        try {
            const auctionSearch = await auctionModel.getAuctionById(id);
            if (!auctionSearch) {
                throw new GraphQLError('Auction not found.', {
                    extensions: { code: HTTP_CODES.NOT_FOUND },
                });
            }

            if (!currentPrice && !endTime && !isActive) {
                throw new GraphQLError(
                    'At least one field must be provided to update.',
                    {
                        extensions: { code: HTTP_CODES.BAD_REQUEST },
                    }
                );
            }

            const updated = await auctionModel.updateAuction(
                auctionSearch.id,
                data
            );
            if (!updated) {
                throw new GraphQLError('Failed to update auction.', {
                    extensions: { code: HTTP_CODES.SERVER_ERROR },
                });
            }
            return updated;
        } catch (error: any) {
            console.error(error);
            throw new GraphQLError(`Failed to update auction. ${error}`, {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }

    return {
        createAuction,
        getAuctionById,
        getAuctionByNftId,
        updateAuction,
    };
}
