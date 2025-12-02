// src/models/userModel.ts
import { DbClient } from '../db/dbClient';
import type { CreateUserArgs, UpdateUserInput, User } from '../types/userTypes';

export interface UserModel {
    readonly getUserById: (id: number) => Promise<User | undefined>;
    readonly getUserByEmail: (email: string) => Promise<User | undefined>;
    readonly createUser: (data: CreateUserArgs) => Promise<User>;
    readonly updateUser: (id: number, data: UpdateUserInput) => Promise<User>;
}

export function createUserModel(db: DbClient): UserModel {
    async function getUserById(id: number) {
        return (
            (await db.user.findUnique({
                where: { id },
                include: { bids: true, nfts: true },
            })) ?? undefined
        );
    }

    async function getUserByEmail(email: string) {
        return (
            (await db.user.findUnique({
                where: { email },
                include: { bids: true, nfts: true },
            })) ?? undefined
        );
    }

    async function createUser(data: CreateUserArgs) {
        return db.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role ?? 'COLLECTOR',
            },
            include: { bids: true, nfts: true },
        });
    }

    async function updateUser(id: number, data: UpdateUserInput) {
        return db.user.update({
            where: { id },
            data: {
                name: data.name ?? undefined,
                email: data.email ?? undefined,
                password: data.password ?? undefined,
                walletBalance: data.walletBalance ?? undefined,
                bidsTotal: data.bidsTotal ?? undefined,
                avatarPicture: data.avatarPicture ?? undefined,
                bannerPicture: data.bannerPicture ?? undefined,
                description: data.description ?? undefined,
            },
            include: { bids: true, nfts: true },
        });
    }

    return Object.freeze({
        getUserById,
        getUserByEmail,
        createUser,
        updateUser,
    });
}
