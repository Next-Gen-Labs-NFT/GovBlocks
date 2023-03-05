# ethdenver2023hackathon

# Project Title
GovBlocks.xyz

## Description
We make governance easier so you can Buidl more. 

## Getting Started
Clone the project. 
Run `yarn`
Run `yarn build`
Create a .env file for your private key(see `/solidity/.env.example`)
run `npx hardhat run scripts/deploy.js --network <the network you are deploying to>` 
    Network options are:
    `bsc` for binance smartchaing testnet
    `mumbai` for polygon testnet
    `base` for coinbase base chain

The deploy script will log the addresses of the deployed contracts to the terminal.
Copy the contract addresses to `/frontend/src/utils/contracts.ts` under the network you have deployed to. 

Follow instructions from readme to start frontend application.

