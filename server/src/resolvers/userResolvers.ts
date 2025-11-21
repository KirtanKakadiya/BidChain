import { GraphQLError } from 'graphql';
import { UserModel } from '../models/userModel';
import { HTTP_CODES } from '../httpCodes';
import { CreateUserArgs, UpdateUserInput, User } from '../types/userTypes';
import { __param } from 'tslib';

type LoginArgs = {
    data: {
        email: string;
        password: string;
    };
};

export function createUserResolver({ userModel }: { userModel: UserModel }) {
    async function login(
        _parent: unknown,
        { data }: LoginArgs
    ): Promise<User | GraphQLError> {
        const { email, password } = data;

        const emailSearch = await userModel.getUserByEmail(email);

        if (!emailSearch) {
            throw new GraphQLError('User not found.', {
                extensions: { code: HTTP_CODES.NOT_FOUND },
            });
        }

        if (password == emailSearch.password) {
            return emailSearch;
        }

        throw new GraphQLError('Password is Incorrect.', {
            extensions: { code: HTTP_CODES.UNAUTHORIZED },
        });
    }

    async function register(
        _parent: unknown,
        { data }: { data: CreateUserArgs }
    ): Promise<User | GraphQLError> {
        const { name, email, password, role } = data;

        if (name.length == 0 || email.length == 0 || password.length == 0) {
            throw new GraphQLError('Input Parameters are missing', {
                extensions: { code: HTTP_CODES.BAD_REQUEST },
            });
        }

        const existing = await userModel.getUserByEmail(email);
        if (existing) {
            throw new GraphQLError('Email already in use.', {
                extensions: { code: HTTP_CODES.UNAUTHORIZED },
            });
        }
        const created = await userModel.createUser({
            name,
            email,
            password,
            role,
        });

        return created;
    }

    /**
     * TODO
     * add logic that if user selects to update photo or banner it updates in the supabase first
     * then updates the postgres db
     *
     * also add logic to check if email already exists in the db, throw error if it already does
     */
    async function updateUser(
        _parent: unknown,
        { data }: { data: UpdateUserInput }
    ): Promise<boolean> {
        const { name, email, password, avatarPicture, bannerPicture } = data;

        if (!email) {
            throw new GraphQLError('Email not found.', {
                extensions: { code: HTTP_CODES.NOT_FOUND },
            });
        }

        const existing = await userModel.getUserByEmail(email);
        if (!existing) {
            throw new GraphQLError('User not found.', {
                extensions: { code: HTTP_CODES.NOT_FOUND },
            });
        }

        try {
            const updated = await userModel.updateUser(existing.id, data);
            if (!updated) {
                throw new GraphQLError('Failed to update user.', {
                    extensions: { code: HTTP_CODES.SERVER_ERROR },
                });
            }

            return true;
        } catch (e) {
            throw new GraphQLError('Failed to update user.', {
                extensions: { code: HTTP_CODES.SERVER_ERROR },
            });
        }
    }

    return {
        login,
        register,
        updateUser,
    };
}
