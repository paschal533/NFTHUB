import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import images from "../../assets";

const SearchBar = ({
  activeSelect,
  setActiveSelect,
  handleSearch,
  clearSearch,
}: any) => {
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { theme } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setSearch(debouncedSearch), 1000);

    return () => clearTimeout(timer);
  }, [debouncedSearch]);

  useEffect(() => {
    if (search) {
      handleSearch(search);
    } else {
      clearSearch();
    }
  }, [search]);

  return (
    <>
      <div className="flex-1 flexCenter lg:w-[500px] w-full bg-nft-black-3 border border-nft-black-3  py-3 px-4 rounded-md">
        <Image
          src={images.search}
          objectFit="contain"
          width={20}
          height={20}
          alt="search"
          className={theme === "light" ? "filter invert" : undefined}
        />
        <input
          type="text"
          placeholder="Search item here"
          className="bg-nft-black-3 mx-4 w-full text-white font-poppins font-normal text-xs outline-none"
          onChange={(e) => setDebouncedSearch(e.target.value)}
          value={debouncedSearch}
        />
      </div>

      <div
        onClick={() => setToggle(!toggle)}
        className="relative flexBetween lg:w-[200px] w-full ml-4 sm:ml-0 sm:mt-2 min-w-190 cursor-pointer bg-nft-black-3 border border-nft-black-3 py-3 px-4 rounded-md"
      >
        <p className="font-poppins text-white font-normal text-xs">
          {activeSelect}
        </p>
        <Image
          src={images.arrow}
          objectFit="contain"
          width={15}
          height={15}
          alt="arrow"
          className={theme === "light" ? "filter invert" : undefined}
        />

        {toggle && (
          <div className="absolute top-full text-white left-0 right-0 w-full mt-3 z-10 bg-nft-black-3 border border-nft-black-3 py-3 px-4 rounded-md">
            {[
              "Recently added",
              "Price (low to high)",
              "Price (high to low)",
            ].map((item) => (
              <p
                className="font-poppinstext-white font-normal text-xs my-3 cursor-pointer"
                onClick={() => setActiveSelect(item)}
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
