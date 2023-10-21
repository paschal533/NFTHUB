import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import images from "../../assets";
import { NFTContext } from "../../context/NFTContext";
import { shortenAddress } from "../../utils/shortenAddress";

const NFTCard = ({ nft, onProfilePage }: any) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <Link href={{ pathname: "/nft-details", query: nft }}>
      <div className="flex-1 w-[285px] min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 md:min-w-256 lg:min-w-327 bg-nft-black-3 rounded-2xl p-4 m-2 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer shadow-md">
        <div className="relative w-[185px] h-52 sm:h-36 xs:h-56 md:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            //@ts-ignore
            src={nft.image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
            //@ts-ignore
            alt={nft.image || images[`nft${nft.i}`]}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins text-white font-semibold text-sm lg:text-xl">
            {nft.name}
          </p>
          <div className="flexBetween mt-1 lg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3">
            <p className="font-poppins text-white mr-4 font-semibold text-xs lg:text-md">
              {nft.price}
              <span className="font-normal"> {nftCurrency}</span>
            </p>
            <p className="font-poppins text-white font-semibold text-xs lg:text-md">
              {shortenAddress(onProfilePage ? nft.owner : nft.seller)}
            </p>
          </div>
          <div className="mt-1 lg:mt-3 flexBetween flex-row" />
        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
