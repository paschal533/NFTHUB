import Features from "@/components/Game-Components/Features";
import Intro from "@/components/Game-Components/Intro";
import Swiper from "@/components/Swiper";
import Head from "next/head";

const Game = ({ user }: any) => {
  return (
    <div className="min-h-screen bg-nft-dark">
      <Head>
        <title>Play Game</title>
      </Head>
      <Swiper />
      <Intro />
      <Features />
    </div>
  );
};

export default Game;
