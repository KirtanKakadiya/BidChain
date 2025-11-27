export const getNFTs = `
    query {
      nfts {
        id
        title
        imageUrl
        tags
        creator {
          name
        }
        auction {
          currentPrice
        }
      }
    }

    `;
