import type { UserModel } from '../models/userModel';
import { createUserResolver } from './userResolvers';
import { createQueryResolvers } from './queryResolvers';

export function createResolvers(models: { userModel: UserModel }) {
    return {
        Query: createQueryResolvers(models),
        Mutation: {
            ...createUserResolver(models),
        },
    };
}
