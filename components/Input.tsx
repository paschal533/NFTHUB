"use client";

import { useContext } from "react";

import { NFTContext } from "@/context/NFTContext";

const Input = ({
  inputType,
  title,
  placeholder,
  handleClick,
  textColor,
  bgColor,
}: any) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <div className="mt-10 w-full">
      <p className={`font-poppins ${textColor} font-semibold text-xl`}>
        {title}
      </p>

      {inputType === "number" ? (
        <div
          className={` ${bgColor} border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins ${textColor} text-base mt-4 px-4 py-3 flexBetween flex-row`}
        >
          <input
            type="number"
            className={`lex-1 w-full  ${bgColor} outline-none `}
            placeholder={placeholder}
            onChange={handleClick}
          />
          <p className={`font-poppins ${textColor} font-semibold text-xl`}>
            {nftCurrency}
          </p>
        </div>
      ) : inputType === "textarea" ? (
        <textarea
          rows={10}
          className={` ${bgColor} border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins ${textColor} text-base mt-4 px-4 py-3`}
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className={` ${bgColor} border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins ${textColor} text-base mt-4 px-4 py-3`}
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};

export default Input;
