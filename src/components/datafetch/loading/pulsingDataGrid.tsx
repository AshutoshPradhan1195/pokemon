import { Box } from "@mui/material";

export const PulsingDataGrid = () => {
  return (
    <Box>
      <div className=" grid sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 sm:gap-x-5 gap-5 xl:gap-x-5  ">
        {[...Array(20)].map(() => (
          <div className="pulsingPokemonCard skeleton"></div>
        ))}
      </div>
    </Box>
  );
};
