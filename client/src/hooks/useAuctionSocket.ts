import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:4001';

export function useAuctionSocket(auctionId: number | null) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  useEffect(() => {
    if (!auctionId) return;

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('joinAuction', auctionId);
    });

    newSocket.on('auction:updated', (updatedAuction) => {
      setCurrentPrice(updatedAuction.currentPrice);
    });

    newSocket.on('bid:placed', (data) => {
      if (data.auctionId === auctionId && data.bid?.amount) {
        setCurrentPrice(data.bid.amount);
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [auctionId]);

  return { socket, currentPrice };
}
