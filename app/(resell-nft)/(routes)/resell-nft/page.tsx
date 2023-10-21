//@ts-nocheck

"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Head from "next/head";
import { NFTContext } from "@/context/NFTContext";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Loader } from "@/components/loader";

const ResellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const URLSearchParams2JSON_2 = (STRING: string) => {
    var searchParams = new URLSearchParams(STRING);
    var object = {};
    searchParams.forEach((value, key) => {
      var keys = key.split("."),
        last = keys.pop();
      keys.reduce((r, a) => (r[a] = r[a] || {}), object)[last] = value;
    });
    return object;
  };

  const { id, tokenURI } = URLSearchParams2JSON_2(searchParams.toString());

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  const resell = async () => {
    await createSale(tokenURI, price, true, id);

    router.push("/");
  };

  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: "51vh" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <Head>
        <title>Resell NFT</title>
      </Head>
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell NFT
        </h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e: any) => setPrice(e.target.value)}
        />

        {image && <img className="rounded mt-4" width="350" src={image} />}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default ResellNFT;
