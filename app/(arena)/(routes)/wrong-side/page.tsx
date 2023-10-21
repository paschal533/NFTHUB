"use client";
import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { NFTContext } from "@/context/NFTContext";
import { shortenAddress } from "@/utils/shortenAddress";
import { TwitterShareButton } from "react-twitter-embed";
import { Loader } from "@/components/loader";
//@ts-ignore
import uniqid from "uniqid";
//@ts-ignore
import $ from "jquery";
import { client } from "@/lib/sanityClient";
import bike from "@/assets/hero-car.png";
import car from "@/assets/car.png";
import Right from "@/assets/right-btn.png";
import Left from "@/assets/left-btn.png";
import Play from "@/assets/play-btn.png";
import Retry from "@/assets/retry-btn.png";
import Image from "next/image";
import Start from "@/assets/startpage-bg.png";
import GameOver from "@/assets/gameover-bg.png";

import {
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const Wrong_side = () => {
  const { game, currentAccount, stakeAmount, getTotalStakedToken } =
    useContext(NFTContext);
  const [topScores, setTopScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLeaderBoard = async () => {
    try {
      setLoading(true);
      const query = `*[_type == "players"] {
        walletAddress,
        score
      }`;
      const data = await client.fetch(query);
      setTopScores(data.sort((a: any, b: any) => a.score - b.score).reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaderBoard();
    getTotalStakedToken();
  }, []);

  const toast = useToast();
  var carPosition = [0, 1, 0];
  var currentLane = 1;
  var rockPosition = 0;
  var score = 0;
  var valid = 1;
  //@ts-ignore
  var gameRunningInterval;
  //@ts-ignore
  var gameScoreInterval;
  // round start
  function start() {
    score = 0;
    const node = document.getElementsByClassName("bike");
    if (game !== "") {
      //@ts-ignore
      node[0].src = game;
    } else {
      //@ts-ignore
      node[0].src = bike.src;
    }

    $(".dl").addClass("road-animation");
    $(".dr").addClass("road-animation");
    gameRunningInterval = setInterval(() => {
      $(".rock").removeClass("start-game");
      rockPosition = Math.floor(Math.random() * 3);
      $(".rock").css("left", 29 + rockPosition * 14 + "%");
      $(".rock").addClass("start-game");
    }, 1500);
    gameScoreInterval = setInterval(() => {
      score++;
      $(".score-text").text(score);
      checkGameOver();
    }, 100);
  }

  // end game
  async function endGame() {
    //@ts-ignore
    clearInterval(gameRunningInterval);
    //@ts-ignore
    clearInterval(gameScoreInterval);
    $(".game-screen").addClass("hide");
    $(".game-over-screen").removeClass("hide");
    $(".final-score").text(score);
    if (currentAccount) {
      const userDoc = {
        _type: "players",
        _id: uniqid(),
        walletAddress: currentAccount,
        score: `${score}`,
      };
      const result = await client.createIfNotExists(userDoc);
    }
    if (score) {
      toast({
        title: "Congratulations 🎉",
        description: `Your score is ${score}`,
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
      getLeaderBoard();
      //$('.claim').removeClass('hide');
    }
  }

  //function to go left
  function goLeft() {
    if (currentLane > 0) {
      carPosition[currentLane] = 0;
      currentLane--;
      carPosition[currentLane] = 1;
    }
    $(".bike").css("left", 29 + currentLane * 14 + "%");
    // console.log(carPosition);
  }

  //function to go right
  function goRight() {
    if (currentLane < 2) {
      carPosition[currentLane] = 0;
      currentLane++;
      carPosition[currentLane] = 1;
    }
    $(".bike").css("left", 29 + currentLane * 14 + "%");
    // console.log(carPosition);
    // console.log(carPosition);
  }

  //check if game over
  function checkGameOver() {
    if (rockPosition == currentLane) {
      var rockTop = parseInt($(".rock").css("top"));
      var bikeTop = parseInt($(".bike").css("top"));
      if (rockTop - bikeTop > -70 && rockTop - bikeTop < 20) {
        $(".dl").removeClass("road-animation");
        $(".dr").removeClass("road-animation");
        endGame();
      }
    }
  }

  //on click listeners
  function onRightBtnClick() {
    goRight();
  }
  function onLeftBtnClick() {
    goLeft();
  }
  function onStartBtnClicked() {
    if (valid) {
      $(".start-screen").addClass("hide");
      $(".game-screen").removeClass("hide");
      start();
    }
  }
  function onRetryBtnClick() {
    start();
    $(".game-screen").removeClass("hide");
    $(".game-over-screen").addClass("hide");
    $(".claim").addClass("hide");
  }

  return (
    <div className="w-full mt-4 color-white">
      <Head>
        <title>Wrong-Side Game</title>
      </Head>
      <div className="w-full flex md:flex-row h-screen sm:flex-col items-center justify-center">
        <div className="content flex flex-col">
          <div className="app-wrapper game-screen hide">
            <div className="road"></div>
            <img className="bike"></img>
            <img className="rock" src={car.src}></img>
            <div className="right" id="btn" onClick={onRightBtnClick}>
              <Image alt="right" width={100} height={100} src={Right} />
            </div>
            <div className="left" id="btn" onClick={onLeftBtnClick}>
              <Image alt="left" width={100} height={100} src={Left} />
            </div>
            <div className="scoreboard">
              {shortenAddress(currentAccount)}
              <p className="score-title">Score</p>
              <p className="score-text">10</p>
            </div>
            <div className="dl" id="divider">
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
            </div>
            <div className="dr" id="divider">
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d1"></div>
            </div>
          </div>
          <div className="app-wrapper start-screen ">
            <div className="flex">
              <Image
                alt="start"
                src={Start}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="start-menu">
              <div className="start-title"></div>
              <div className="start-btn" onClick={onStartBtnClicked}>
                <Image
                  src={Play}
                  alt="play"
                  height={120}
                  width={300}
                  objectFit="contain"
                />
              </div>
            </div>
          </div>
          <div className="app-wrapper game-over-screen hide">
            <div className="flex">
              <Image
                alt="gameover"
                src={GameOver}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <div className="start-menu">
              <div className="start-title"></div>
              <div className="a-1">
                <p className="final-score">100</p>
                <div className="retry-btn" onClick={onRetryBtnClick}>
                  <Image
                    alt="retry"
                    src={Retry}
                    height={120}
                    width={300}
                    objectFit="contain"
                  />
                </div>
                <div className="flex w-full justify-center items-center mt-4">
                  <TwitterShareButton
                    url={"https://main.d1ncyh9ur4s3ig.amplifyapp.com/"}
                    options={{
                      text: "NFTHUB wrong side game",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="claim hide">
            {/* <a
              src="https://cloudflare-ipfs.com/ipfs/bafybeihz5jer6ad75ku3dh6mj4rlufrtiydv5mkoqurm55nv2uckmfiuya?contract=0xF04F9Ec03a8d0A7DA309951F5E616F8540C58D94&chainId=4&tokenId=0"
              target="_blank"
              rel="noreferrer"
            > */}
            <Button
              className="hidden ml-0 mt-10 md:ml-10 md:mt-0"
              as="a"
              href="https://cloudflare-ipfs.com/ipfs/bafybeihz5jer6ad75ku3dh6mj4rlufrtiydv5mkoqurm55nv2uckmfiuya?contract=0xF04F9Ec03a8d0A7DA309951F5E616F8540C58D94&chainId=4&tokenId=1"
              target="_blank"
              backgroundColor="#915bff"
              border="1px solid #915bff"
              _hover={{
                backgroundColor: "#000",
                border: "1px solid #915bff",
                color: "white",
              }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w={{ base: "full", sm: "auto" }}
              mb={{ base: 2, sm: 0 }}
              size="lg"
              cursor="pointer"
            >
              Claim your premium NFT
            </Button>
            {/* </a> */}
          </div>
        </div>
        <div className="ml-4 sm:ml-0 sm:p-2 p-0 sm:mt-4 mt-0 w-[400px] sm:w-full">
          <div className="bg-[#192339] rounded-md border-none p-10 mb-6 text-center text-xl text-white">
            Vault Amount : {stakeAmount} XDAI
          </div>
          <h1 className="text-bold text-white text-2xl">Leader Board</h1>
          {!loading ? (
            <TableContainer>
              <Table colorScheme="blue">
                <Thead>
                  <Tr className="text-white">
                    <Th className="text-white">Player</Th>
                    <Th className="text-white">Position</Th>
                    <Th className="text-white" isNumeric>
                      Score
                    </Th>
                  </Tr>
                </Thead>
                <Tbody className="text-bold text-white">
                  {topScores?.slice(0, 3).map((score: any, index) => (
                    <Tr>
                      <Td>{shortenAddress(score.walletAddress)}</Td>
                      <Td>#{index + 1}</Td>
                      <Td isNumeric>{score?.score}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          ) : (
            <div className="flex justify-center w-full items-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wrong_side;
