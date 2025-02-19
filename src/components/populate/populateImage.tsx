import { useQuery } from "react-query";
import { axiosInstance } from "../datafetch";
import { IPokemonDetailsSingle } from "../../interfaces";

export const PopulateImage = ({ id }: { id: string }) => {
  const { data } = useQuery<IPokemonDetailsSingle>(
    "pokemonData" + id,
    async () => {
      const res = await axiosInstance.get(`/pokemon/${id}`);
      return res.data;
    }
  );

  return (
    <>
      <img
        src={data?.sprites.front_default}
        style={{
          height: "90%",
          width: "100%",
          objectFit: "contain",
          borderRadius: "inherit",
        }}
      />
    </>
  );
};
