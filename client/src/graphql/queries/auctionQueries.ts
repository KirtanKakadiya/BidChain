export const getAuctionByNftId = `
    query GetAuctionByNftId($nftId: Int!) {
        auctionByNftId(nftId: $nftId) {
            id
            nftId
            startPrice
            currentPrice
            startTime
            endTime
            isActive
      }
    }
`;
