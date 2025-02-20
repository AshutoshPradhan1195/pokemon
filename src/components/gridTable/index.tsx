import { UseQueryResult } from "react-query";
import { PulsingDataGrid } from "../datafetch/loading/pulsingDataGrid";
import { PokemonCard } from "../pokemonCard";
import { IPokemonListSingle } from "../../interfaces";

type props = {
  results: IPokemonListSingle[] | undefined;
} & UseQueryResult;

export const GridTable = ({ isFetching, isLoading, results }: props) => {
  return (
    <div className="w-full flex justify-center">
      {isFetching || isLoading ? (
        <PulsingDataGrid />
      ) : (
        <div className=" grid sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 sm:gap-x-10 gap-10 xl:gap-x-10 w-full  ">
          {results?.map((pokemon) => {
            const urlId = pokemon.url.split("/")[6];

            return <PokemonCard id={urlId} name={pokemon.name} />;
          })}
        </div>
      )}
    </div>
  );
};
