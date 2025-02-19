import { Box, Typography } from "@mui/material";
import { PopulateImage } from "../populate/populateImage";
import { capitalizeFirstLetterOfEachWord } from "../../helpers";
import { useNavigate } from "react-router-dom";

interface props {
  name: string;
  id: string;
}
export const PokemonCard = ({ name, id }: props) => {
  const nav = useNavigate();
  return (
    <Box>
      <div
        className="pokemonCard"
        onClick={() => {
          nav(`pokemon/${name}`);
        }}
      >
        <PopulateImage id={id} />
        <Typography>{capitalizeFirstLetterOfEachWord(name)}</Typography>
      </div>
    </Box>
  );
};
