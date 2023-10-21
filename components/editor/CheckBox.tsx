import { Checkbox } from "@chakra-ui/react";

const CheckBox = ({ index, title, isChecked, onChange }: any) => {
  return (
    <Checkbox
      isChecked={isChecked}
      onChange={onChange}
      //@ts-ignore
      defaultIsChecked={index == 1}
    >
      {title}
    </Checkbox>
  );
};

export default CheckBox;
