"use client";
import styles from "./ImageReset.module.css";
import { Button, Icon } from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";

const ImageSelector = ({ onChange }: any) => {
  return (
    <div className={styles.wrapper}>
      <Button
        rightIcon={<Icon as={MdUpload} w={5} h={5} />}
        width="160px"
        colorScheme="teal"
        className="bg-blue-700 text-white"
      >
        Select Image
      </Button>

      <input
        type="file"
        className={styles.fileUpload}
        onChange={onChange}
        accept=".jpg, .png"
      />
    </div>
  );
};

export default ImageSelector;
