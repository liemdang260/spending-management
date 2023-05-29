import { Card, IconButton, LinearProgress, Modal } from "@mui/material";
import React, { ReactElement, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { formatMoney } from "../../utils/moneyFormatter";
import { IJar } from "../../interfaces/spending.interfaces";
import AddSpendingForm from "../AddSpendingForm";

type JarProps = {
  jar?: IJar;
  create?: boolean;
};
const Jar = ({ jar, create }: JarProps): ReactElement => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isAddNewSpending, setIsAddNewSpending] = useState<boolean>(false);
  const renderCreateButton = () => {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center ">
        <IconButton onClick={() => console.log("test")}>
          <AddCircleRoundedIcon sx={{ fontSize: 90 }} color="secondary" />
        </IconButton>
      </div>
    );
  };
  const renderJar = () => {
    const { name, income, outcome } = jar!;
    const avaiable = income - outcome;
    return (
      <div
        className=" w-full h-full relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {isHovered && (
          <div className="w-full h-full flex flex-col justify-center items-center absolute z-10">
            <IconButton
              onClick={() => {
                // setIsHovered(false);
                setIsAddNewSpending(true);
              }}
            >
              <AddCircleRoundedIcon sx={{ fontSize: 90 }} color="secondary" />
            </IconButton>
          </div>
        )}
        <div
          className={`text-center flex flex-col justify-end pb-5 w-full h-full ${
            isHovered && "opacity-10"
          }`}
        >
          <p className="font-dancingScript text-3xl ">{name}</p>
          <p>{`Khả dụng: ${formatMoney(avaiable)}`}</p>
          <LinearProgress
            variant="determinate"
            value={((income - avaiable) / outcome) * 100}
          />
        </div>
        <Modal
          open={isAddNewSpending}
          onClose={() => setIsAddNewSpending(false)}
        >
          <Card className="w-[30%] mx-auto top-[25%] left-[40%] absolute">
            <AddSpendingForm />
          </Card>
        </Modal>
      </div>
    );
  };

  const content = create ? renderCreateButton() : renderJar();

  return <div className="w-full h-full ">{content}</div>;
};

export default Jar;
