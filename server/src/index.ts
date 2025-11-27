import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { gqlSchema } from './graphql/gqlSchema';
import { createResolvers } from './resolvers/resolvers';
import { createUserModel } from './models/userModel';
import { createDbClient } from './db/dbClient';
import { createNFTModel } from './models/nftModel';
import { createAuctionModel } from './models/auctionModel';
import { createBidModel } from './models/bidModel';

dotenv.config();

const DEV_FALLBACK_PORT = 4000;
const PORT = Number(process.env.PORT) || DEV_FALLBACK_PORT;
const PG_DB_URL = `postgresql://postgres:${process.env.POSTGRES_PASSWORD}@db:5432/bidchain-db?schema=public`;

const app: Application = express();

const dbClient = createDbClient(PG_DB_URL);
const userModel = createUserModel(dbClient);
const nftModel = createNFTModel(dbClient);
const auctionModel = createAuctionModel(dbClient);
const bidModel = createBidModel(dbClient);

async function main() {
    const server: ApolloServer = new ApolloServer({
        typeDefs: gqlSchema,
        resolvers: createResolvers({
            userModel,
            nftModel,
            auctionModel,
            bidModel,
        }),
    });

    const { url } = await startStandaloneServer(server, {
        listen: { port: PORT },
    });

    console.log(`🚀 Server ready at ${url}`);
}

main();
