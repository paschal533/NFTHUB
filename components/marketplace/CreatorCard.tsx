import { useContext } from "react";
import Image from "next/image";

import images from "../../assets";
import { NFTContext } from "../../context/NFTContext";

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths }: any) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <div className="min-w-190 lg:min-w-240 bg-nft-black-3 border border-nft-black-3 lg:w-[200px] w-full rounded-3xl flex flex-col p-4 sm:m-2 m-3">
      <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-nft-red-violet flexCenter">
        <p className="font-poppins text-white font-semibold text-base lg:text-lg ">
          {rank}
        </p>
      </div>

      <div className="my-2 flex justify-center">
        <div className="relative w-20 h-20  ">
          <Image
            src={creatorImage}
            layout="fill"
            objectFit="cover"
            alt="creator"
            className="rounded-full"
          />
          <div className="absolute w-4 h-4  bottom-2 -right-0">
            <Image
              src={images.tick}
              layout="fill"
              objectFit="contain"
              alt="tick"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 lg:mt-7 text-center flexCenter flex-col">
        <p className="font-poppins text-white  font-semibold text-base">
          {creatorName}
        </p>
        <p className="mt-1 font-poppins text-white font-semibold text-base">
          {creatorEths.toFixed(2)}{" "}
          <span className="font-normal">{nftCurrency}</span>
        </p>
      </div>
    </div>
  );
};

export default CreatorCard;
