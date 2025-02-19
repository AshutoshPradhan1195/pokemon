import { Box } from "@mui/material";

export const PulsingDataGrid = () => {
  return (
    <Box>
      <Box display={"grid"} gridTemplateColumns={"1fr 1fr 1fr 1fr"} gap={5}>
        {[...Array(20)].map(() => (
          <div className="pulsingPokemonCard skeleton"></div>
        ))}
        <Box />
      </Box>
    </Box>
  );
};
