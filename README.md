# **BidChain – Real-Time NFT Auction Platform**

BidChain is a real-time NFT auction platform designed for both artists and collectors.  
It provides seamless NFT creation, browsing, and bidding with a modern UI and real-time auction interaction powered by Socket.io.

---

## 📌 **Overview**

BidChain delivers a transparent, fast, and interactive way to auction NFTs.  
Users can upload NFTs, participate in live auctions, manage their wallet balance, and browse a feature-rich marketplace.

The platform is built with a modular architecture featuring:

- Real-time bid updates  
- Strongly typed GraphQL API  
- Secure user authentication  
- Responsive and dynamic UI  
- Supabase-powered media storage  

---

## ⭐ **Features**

### 🔐 **Authentication & User Profiles**
- Role-based access for **Artists** and **Collectors**
- Customizable user profiles (avatar, banner, description)
- Wallet balance tracking and total bids
- View owned NFTs, created NFTs, and bidding history

### 🎨 **NFT Creation & Management**
- Artists can upload NFTs with images, metadata, and tags
- Marketplace browsing with search and category filters
- Dedicated NFT detail pages with auction info and creator data

### 🔥 **Live Auctions (Socket.io)**
- Real-time bidding updates synchronized across all clients
- Automatic auction state management
- Bid validation (prevents low or invalid bids)
- Live current price updates

### 🛒 **Marketplace**
- Explore NFTs by category (Art, Gaming, Music, Photography, Video, Sport)
- Search NFTs by name
- Filter by active auctions
- Quick navigation to creator profiles

### 💸 **Wallet Operations**
- Secure "Add Funds" mutation via GraphQL
- Live balance updates
- Track total spending on bids

### ☁️ **Supabase Storage**
- NFT image hosting
- User avatar & banner uploading
- CDN support for fast delivery

### 🧩 **GraphQL API**
- Strongly typed schema using SDL
- Queries for users, NFTs, auctions, and bids
- Mutations for actions like creating NFTs, placing bids, updating users, etc.
- Prisma-based database interaction

### 📱 **Responsive UI**
- Custom mobile hamburger menu with smooth slide-out animation
- Fully responsive layouts for marketplace, profiles, and NFT cards

---

## 🛠️ **Technology Stack**

### **Frontend**
- React  
- Vite  
- Material UI (MUI)  
- Socket.io Client  

### **Backend**
- Node.js  
- Express  
- GraphQL  
- Prisma ORM  
- Socket.io  
- PostgreSQL  
- Supabase Storage  

### **DevOps & Tooling**
- Docker  
- ESLint / Prettier  

---

## Installation

### Prerequisites

- Docker Desktop
- Node.js (with NVM)
- npm

### Setup

1. Clone the repository

```bash
git clone https://csgit.ucalgary.ca/kirtan.kakadiya/seng513-202401-group-30.git
```

2. Install dependencies in both client and server directories

```bash
cd client && npm install
cd ../server && npm install
```

3. Start the application

```bash
docker compose up --build
```

## Technology Stack
