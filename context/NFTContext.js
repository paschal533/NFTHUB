"use client";

import React, { useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { MarketAddress, MarketAddressABI } from "./constants";

export const NFTContext = React.createContext();

const fetchContract = (signerOrProvider) =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTProvider = ({ children }) => {
  const nftCurrency = "MNT";
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoadingNFT, setIsLoadingNFT] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const [game, setGame] = useState("");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [isPlayer, setIsPlayer] = useState(false);
  const [baseImageUrl, setBaseImageUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const toast = useToast();

  // Not Authenticated toast
  const handleNewNotification = () => {
    toast({
      position: "top-left",
      title: "Not Authenticated",
      description: "Please connect to a Matamask Wallet",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  // Authenticated toast
  const handleConnect = () => {
    toast({
      position: "top-left",
      title: "Wallet connect",
      description: "Wallet connected successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const fetchNFTs = async () => {
    try {
      setIsLoadingNFT(false);

      const provider = new ethers.providers.JsonRpcProvider(
        `https://rpc.testnet.mantle.xyz/`
      );
      const contract = fetchContract(provider);

      const data = await contract.fetchMarketItems();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId.toString());
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              id: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyNFTsOrCreatedNFTs = async (type) => {
    try {
      setIsLoadingNFT(false);

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);
      const data =
        type === "fetchItemsListed"
          ? await contract.fetchItemsListed()
          : await contract.fetchMyNFTs();

      const items = await Promise.all(
        data.map(
          async ({ tokenId, seller, owner, price: unformattedPrice }) => {
            const tokenURI = await contract.tokenURI(tokenId.toString());
            const {
              data: { image, name, description },
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
              unformattedPrice.toString(),
              "ether"
            );

            return {
              price,
              tokenId: tokenId.toNumber(),
              seller,
              owner,
              image,
              name,
              description,
              tokenURI,
            };
          }
        )
      );

      return items;
    } catch (error) {
      console.log(error);
    }
  };

  const createSale = async (url, formInputPrice, isReselling, id) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, {
          value: listingPrice.toString(),
        })
      : await contract.resellToken(id, price, {
          value: listingPrice.toString(),
        });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const createPersonalNFT = async (url, formInputPrice) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, "ether");
    const contract = fetchContract(signer);

    const transaction = await contract.createPersonalToken(url, price);

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  const buyNft = async (nft) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        MarketAddress,
        MarketAddressABI,
        signer
      );

      const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: price,
      });
      setIsLoadingNFT(true);
      await transaction.wait();
      setIsLoadingNFT(false);
    } catch (error) {
      toast({
        position: "top-left",
        title: "Insufficient Fund",
        description:
          "You do not have sufficient money on your wallet to purchase this NFT.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleImage = (img) => {
    setImageURL(img);
  };

  const connectWallet = async () => {
    if (!window.ethereum) return handleNewNotification();

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setCurrentAccount(accounts[0]);
    handleConnect();
    window.location.reload();
  };

  const checkIfWalletIsConnect = async () => {
    if (!window.ethereum) return handleNewNotification();

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
      handleConnect();
    } else {
      handleNewNotification();
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  const handleGame = (newGame) => {
    setGame(newGame);
  };

  const getStakedNFTs = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const data = await contract.getStakedTokens(currentAccount);

    const items = await Promise.all(
      data.map(async ({ tokenId, staker }) => {
        const tokenURI = await contract.tokenURI(tokenId);
        const {
          data: { image, name, description },
        } = await axios.get(tokenURI);

        return {
          tokenId: tokenId.toNumber(),
          id: tokenId.toNumber(),
          staker,
          image,
          name,
          description,
          tokenURI,
        };
      })
    );

    return items;
  };

  const stakeNFT = async (tokenID) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    const data = await contract.stake(tokenID);

    toast({
      position: "top-left",
      title: "NFT Skated",
      description: "Your NFT has been staked successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const Claimable = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      const data = await contract.availableRewards(currentAccount);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const joinGame = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);
      const listingPrice = await contract.getListingPrice();

      await contract.joinGame({ value: listingPrice.toString() });

      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      window.location.reload();
    }
  };

  const checkIfUserIsPlayer = async (account) => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);
      const result = await contract.getPlayers();

      const UpperCaseResult = await result.map(function (x) {
        return x.toUpperCase();
      });

      setIsPlayer(UpperCaseResult.includes(account.toUpperCase()));
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalStakedToken = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://rpc.testnet.mantle.xyz/`
      );

      const contract = fetchContract(provider);
      const result = await contract.totalStakedToken();
      const price = ethers.utils.formatEther(result.toString());

      setStakeAmount(price);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalStakedToken();
  }, []);

  const Withdraw = async (tokenID) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);

    await contract.withdraw(tokenID);

    toast({
      position: "top-left",
      title: "Unstaked NFT",
      description: "Your NFT has been unstaked successfully",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const claimRewards = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const contract = fetchContract(signer);

      await contract.claimRewards();

      toast({
        position: "top-left",
        title: "Reward Claimed",
        description: "Your Rewards have been sent to your account. ",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        position: "top-left",
        title: "Not enough Reward",
        description: "Get up to 0.5 MNT and claim reward",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <NFTContext.Provider
      value={{
        claimRewards,
        stakeNFT,
        Withdraw,
        getStakedNFTs,
        Claimable,
        nftCurrency,
        game,
        handleGame,
        handleImage,
        imageURL,
        createPersonalNFT,
        buyNft,
        createSale,
        fetchNFTs,
        fetchMyNFTsOrCreatedNFTs,
        connectWallet,
        currentAccount,
        isLoadingNFT,
        joinGame,
        checkIfUserIsPlayer,
        stakeAmount,
        getTotalStakedToken,
        isPlayer,
        baseImageUrl,
        setBaseImageUrl,
        downloadLink,
        setDownloadLink,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};
