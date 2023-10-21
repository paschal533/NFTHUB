"use client";
import Image from "next/image";
import { useTheme } from "next-themes";

import images from "@/assets";
import { Button } from "@/components/ui/button";

const FooterLinks = ({ heading, items, extraClasses }: any) => (
  <div className={`flex-1 justify-start items-start ${extraClasses}`}>
    <h3 className="font-poppins text-white font-semibold text-xl mb-10">
      {heading}
    </h3>
    {items.map((item: any, index: any) => (
      <p
        key={item + index}
        className="font-poppins text-white font-normal text-base cursor-pointer hover:text-nft-gray-1 my-3"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t border-nft-black-1 sm:py-8 py-16">
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src="/logo.png"
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className=" text-white font-semibold text-lg ml-1">NFTHUB</p>
          </div>
          <p className="font-poppins text-white font-semibold text-base mt-6">
            Get the latest updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 bg-nft-black-2 border border-nft-black-2 rounded-md">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full flex-1 w-full px-4 rounded-md font-poppins text-white  font-normal text-xs minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              <Button
                variant="premium"
                className="md:text-lg mr-[-4px] p-4 md:p-6 rounded-l-md font-semibold"
              >
                Email me
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          <FooterLinks
            heading="NFTHUB"
            items={["Explore", "How it Works", "Contact Us"]}
          />
          <FooterLinks
            heading="Support"
            items={[
              "Help Center",
              "Terms of service",
              "Legal",
              "Privacy policy",
            ]}
            extraClasses="ml-4"
          />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t border-nft-black-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins text-white font-semibold text-base">
           NFTHUB, Inc. All Rights Reserved
          </p>
          <div className="flex flex-row sm:mt-4">
            {[
              images.instagram,
              images.twitter,
              images.telegram,
              images.discord,
            ].map((image, index) => (
              <div className="mx-2 cursor-pointer" key={`image ${index}`}>
                <Image
                  src={image}
                  key={index}
                  objectFit="contain"
                  width={24}
                  height={24}
                  alt="social"
                  className={theme === "light" ? "filter invert" : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
