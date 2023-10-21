import { auth } from "@clerk/nextjs";

//import prismadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/constants";
import { client } from "./sanityClient";

export const incrementApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const query = `*[_type == "userApiLimit"] {
    walletAddress,
    score
 }`;
  const data = await client.fetch(query);

  /*const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId: userId, count: 1 },
    });
  }*/
};

export const checkApiLimit = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const userApiLimit = 0; /*await prismadb.userApiLimit.findUnique({
    where: { userId: userId },
  });*/

  if (!userApiLimit || userApiLimit < MAX_FREE_COUNTS) {
    return true;
  } else {
    return false;
  }
};

export const getApiLimitCount = async () => {
  const { userId } = auth();

  if (!userId) {
    return 0;
  }

  const userApiLimit = 0; /*await prismadb.userApiLimit.findUnique({
    where: {
      userId
    }
  });*/

  if (!userApiLimit) {
    return 0;
  }

  return userApiLimit;
};
