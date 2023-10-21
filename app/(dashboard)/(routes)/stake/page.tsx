"use client";

import { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { Flex, Box, Text } from "@chakra-ui/react";
import { NFTContext } from "@/context/NFTContext";
import { shortenAddress } from "@/utils/shortenAddress";
import { ethers } from "ethers";
import { SearchBar } from "@/components/marketplace";
import { Banner } from "@/components/marketplace";
import Button from "@/components/Button";
import { Loader } from "@/components/marketplace";
import Head from "next/head";
import images from "@/assets";

const Stake = () => {
  const {
    fetchMyNFTsOrCreatedNFTs,
    claimRewards,
    Withdraw,
    Claimable,
    currentAccount,
    getStakedNFTs,
    stakeNFT,
    nftCurrency,
  } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [stakedNFTS, setStakedNFTs] = useState([]);
  const [claimable, setClaimable] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSelect, setActiveSelect] = useState("Recently Added");
  const [balance, setBalance] = useState(0);

  const xDai = {
    name: "MNT",
    chainId: 5001,
    _defaultProvider: (providers: any) =>
      new providers.JsonRpcProvider(`https://rpc.testnet.mantle.xyz/`),
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMyNFTsOrCreatedNFTs("fetchMyNFTs").then((items: any) => {
      setNfts(items);
      setNftsCopy(items);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (currentAccount) {
      getStakedNFTs().then((items: any) => {
        setStakedNFTs(items);
      });
      setIsLoading(false);
    }
  }, [currentAccount]);

  useEffect(() => {
    setIsLoading(true);
    if (currentAccount) {
      getClaimable();
      getUserBalance();
    }
    setIsLoading(false);
  }, [currentAccount]);

  const getClaimable = async () => {
    const res = await Claimable();
    setClaimable(res.toString());
  };

  const getUserBalance = async () => {
    try {
      const provider = ethers.getDefaultProvider(xDai);
      const balance = await provider.getBalance(currentAccount);
      //@ts-ignore
      setBalance(ethers.utils.formatEther(balance.toString()));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a: any, b: any) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a: any, b: any) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a: any, b: any) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value: any) => {
    const filteredNfts = nfts.filter(({ name }: any) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  const Step = ({ title, amount, fixed }: any) => {
    return (
      <Flex
        className="text-black shadow-xl border-nft-gray-1"
        direction="column"
        bg="whiteAlpha.100"
        cursor="pointer"
        _hover={{ bg: "whiteAlpha.200" }}
        transitionDuration="200ms"
        p="10"
        rounded="xl"
      >
        <Box mt="2">
          <Text fontWeight="bold" fontSize="2xl">
            {title}
          </Text>
          <Text
            mt="1"
            fontWeight="bold"
            fontSize="2xl"
            className="text-nft-gray-2 border-nft-gray-1"
          >
            {fixed ? amount?.toFixed(9) : Number.parseFloat(amount).toFixed(3)}{" "}
            xDai
          </Text>
        </Box>
      </Flex>
    );
  };

  const NFTCard = ({ nft, action }: any) => {
    return (
      <div
        onClick={action}
        className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 bg-nft-black-3 rounded-2xl p-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md"
      >
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            //@ts-ignore
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
            alt="nft01"
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins text-white font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins text-white font-semibold text-xs minlg:text-lg">
              {nft.price}
              <span className="font-normal"> {nftCurrency}</span>
            </p>
            <p className="font-poppins text-white font-semibold text-xs minlg:text-lg">
              {shortenAddress(currentAccount)}
            </p>
          </div>
          <div className="mt-1 minlg:mt-3 flexBetween flex-row" />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <Head>
        <title>Stake NFTs</title>
      </Head>
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Stake Your Nifty NFTs and get rewards"
          childStyles="text-center mb-4"
          parentStyle="h-80 justify-center"
        />

        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full">
            <Image
              alt="creator"
              src={images.creator1}
              className="rounded-full object-cover"
              objectFit="cover"
            />
          </div>
          <p className="font-poppins text-black font-semibold text-2xl mt-6">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>
      <div className="w-full text-center items-center justify-center">
        <h1 className="font-poppins mt-4 text-black text-3xl font-extrabold">
          Your Tokens Rewards
        </h1>
        <div className="w-full flex mt-4 justify-center items-center sm:flex-col">
          <div className="mr-10 sm:mr-0 sm:mb-8 mb-0">
            <Step
              fixed={true}
              title="Claimable Rewards"
              amount={claimable / 10000000000}
            />
          </div>
          <Step title="Current Balance" amount={balance} />
        </div>
        <Button
          btnName="Claim Rewards"
          btnType="primary"
          classStyles="mx-2 mt-8 rounded-xl"
          handleClick={() => claimRewards()}
        />
      </div>

      <div className="w-full mt-8 flex-col justify-center text-center pl-16 pr-16 sm:pl-2 sm:pr-2">
        <h1 className="font-poppins mt-4 text-black text-3xl font-extrabold">
          Your Skated NFTs
        </h1>
        {stakedNFTS.length === 0 ? (
          <div className="flex-col sm:p-4 p-16 border border-nft-gray-2 mt-4 rounded-md bg-nft-black-1">
            <h1 className="font-poppins text-white text-2xl font-extrabold">
              No NFTs Staked
            </h1>
            <p className="font-poppins text-white mt-4 text-1xl font-bold">
              Skate some NFT first
            </p>
          </div>
        ) : (
          <div className="mt-3 w-full flex flex-wrap">
            {stakedNFTS?.map((nft) => (
              <NFTCard
                //@ts-ignore
                key={`nft-${nft.tokenId}`}
                nft={nft}
                //@ts-ignore
                action={() => Withdraw(nft.tokenId)}
              />
            ))}
          </div>
        )}
      </div>

      <h1 className="font-poppins mt-8 text-black mb-4 text-3xl font-extrabold">
        UnStaked NFTs
      </h1>
      {!isLoading && nfts.length === 0 ? (
        <div className="w-full mb-8 flex-col justify-center text-center pl-16 pr-16 sm:pl-2 sm:pr-2">
          <div className="flex-col sm:p-4 p-16 w-full text-center border-nft-gray-2 mt-4 rounded-md bg-nft-black-1">
            <h1 className="font-poppins text-white text-3xl font-extrabold">
              No NFTs owned
            </h1>
            <p className="font-poppins mt-4 text-white text-1xl font-bold">
              Mint or buy a NFT first
            </p>
          </div>
        </div>
      ) : (
        <div className="sm:px-4 pl-12 pr-12 pb-12 pt-4 sm:pl-2 sm:pr-2 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => (
              <NFTCard
                //@ts-ignore
                key={`nft-${nft.tokenId}`}
                //@ts-ignore
                action={() => stakeNFT(nft.tokenId)}
                nft={nft}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Stake;
