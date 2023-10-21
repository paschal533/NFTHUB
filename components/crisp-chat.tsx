"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a8e07b12-13f4-493b-8745-136c5384ebac");
  }, []);

  return null;
};
