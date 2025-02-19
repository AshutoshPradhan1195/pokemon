import { useState } from "react";
import { IPokemonDetailsSingle } from "../../interfaces";
import { Modal } from "@mui/material";

interface props {
  data: IPokemonDetailsSingle | undefined;
}

export const ImageCarasoul = ({ data }: props) => {
  const [pointer, setPointer] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const imageArray = [
    data?.sprites.front_default,
    data?.sprites.back_default,
    data?.sprites.front_shiny,
    data?.sprites.back_shiny,
    data?.sprites.front_female,
    data?.sprites.back_female,
    data?.sprites.front_shiny_female,
    data?.sprites.back_shiny_female,
  ].filter((x) => x);

  const handleImageClick = (ind: number) => {
    setPointer(ind);
    setShowImage(true);
  };

  return (
    <>
      <div className="w-full mt-10 ">
        <div
          style={{ border: 1, borderStyle: "solid" }}
          className="w-full  flex flex-row  flex-wrap xl:flex-nowrap lg:flex-nowrap  justify-evenly items-center  rounded-4xl"
        >
          {imageArray.map((data, ind) => {
            return (
              <>
                <img
                  onClick={() => {
                    handleImageClick(ind);
                  }}
                  src={data}
                  height={300}
                  width={300}
                  className="  object-contain cursor-pointer hoverScale "
                />
              </>
            );
          })}
        </div>
      </div>
      <Modal
        open={showImage}
        sx={{ width: "100%", height: "100%" }}
        onClose={() => {
          setShowImage(false);
        }}
      >
        <img
          onClick={() => {
            setShowImage(false);
          }}
          src={imageArray[pointer]}
          className=" object-contain w-full h-full"
        />
      </Modal>
    </>
  );
};
