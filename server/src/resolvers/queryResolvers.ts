import { GraphQLError } from 'graphql';
import type { User } from '../types/userTypes';
import type { UserModel } from '../models/userModel';
import { HTTP_CODES } from '../httpCodes';

export function createQueryResolvers({ userModel }: { userModel: UserModel }) {
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

    return { user };
}
