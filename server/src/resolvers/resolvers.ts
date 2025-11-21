import type { UserModel } from '../models/userModel';
import { createUserResolver } from './userResolvers';
import { createQueryResolvers } from './queryResolvers';
import { createNFTResolver } from './nftResolvers';
import { NFTModel } from '../models/nftModel';


type Models = {
    userModel: UserModel;
    nftModel: NFTModel;
};

export function createResolvers(models: Models) {
    return {
        Query: createQueryResolvers(models),
        Mutation: {
            ...createUserResolver(models),
            ...createNFTResolver(models)

        },
    };
}
