import { useParams } from "react-router-dom";
import { DetailsPageLayout } from "../../components/detailsPage";
import { useQuery } from "react-query";
import { axiosInstance } from "../../components/datafetch";
import { ImageCarasoul } from "../../components/imageCarasouel";
import { IPokemonDetailsSingle, IStats } from "../../interfaces";
import { PulsingDetails } from "../../components/datafetch/loading/pulsingDetails";
import { Typography } from "@mui/material";
import { capitalizeFirstLetterOfEachWord } from "../../helpers";
import { PopulateTypeImage } from "../../components/populate/populateTypeImage";
import { MovesTable } from "../../components/movesTable";

export const DetailPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<IPokemonDetailsSingle>({
    queryKey: "detail" + id,
    queryFn: async () => {
      return (await axiosInstance.get(`/pokemon/${id}`)).data;
    },
  });

  enum statName {
    "hp" = "hp",
    "attack" = "attack",
    "defence" = "defence",
    "special-attack" = "special-attack",
    "special-defense" = "special-defense",
    "speed" = "speed",
  }

  console.log(data);

  const StatItemReturn = (stat: IStats, ind: number) => {
    if (stat.stat.name === statName["special-attack"]) {
      stat.stat.name = "S.Attack";
    }
    if (stat.stat.name === statName["special-defense"]) {
      stat.stat.name = "S.Defence";
    }

    const colors = [
      "bg-red-300",
      "bg-purple-300",
      "bg-green-300",
      "bg-yellow-300",
      "bg-pink-300",
      "bg-orange-300",
    ];

    const fillcolors = [
      "bg-red-200",
      "bg-purple-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-pink-200",
      "bg-orange-200",
    ];

    return (
      <>
        <div className="flex flex-row gap-1  sm:hidden ">
          <div className={`w-24 text-left ${colors[ind]} p-1`}>
            <Typography>
              {capitalizeFirstLetterOfEachWord(stat.stat.name)}:
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
            }}
            className={` ${fillcolors[ind]} flex justify-start items-center`}
          >
            <div
              style={{
                width: stat.base_stat,
                height: "100%",
              }}
              className={`  ${colors[ind]} z-30 flex justify-center items-center`}
            >
              {stat.base_stat}
            </div>
          </div>
        </div>
        <div className=" flex-row gap-1  hidden sm:flex ">
          <div className={`w-24 text-left ${colors[ind]} p-1`}>
            <Typography>
              {capitalizeFirstLetterOfEachWord(stat.stat.name)}:
            </Typography>
          </div>
          <div
            style={{
              width: "100%",
            }}
            className={` ${fillcolors[ind]} flex justify-start items-center`}
          >
            <div
              style={{
                width: stat.base_stat * 2.7,
                height: "100%",
              }}
              className={`  ${colors[ind]} z-30 flex justify-center items-center`}
            >
              {stat.base_stat}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <DetailsPageLayout>
      {isLoading ? (
        <PulsingDetails />
      ) : (
        <>
          <ImageCarasoul data={data} />
          <div className=" flex flex-col items-start  rounded-4xl  mt-5 w-full  ">
            <Typography variant="h5" mb={1}>
              Base Details
            </Typography>

            <div className="grid xl:grid-cols-4 mb-4  lg:grid-cols-4  sm:grid-cols-2 ">
              <Typography alignItems={"start"} variant="h6" align="left">
                Name: {capitalizeFirstLetterOfEachWord(data?.name ?? " ")}
              </Typography>
              <Typography alignItems={"start"} variant="h6" align="left">
                Weight: {data?.weight}
              </Typography>
              <Typography alignItems={"start"} variant="h6" align="left">
                Height: {data?.height}
              </Typography>

              <div className="flex flex-row w-full items-center justify-center gap-2">
                <Typography alignItems={"start"} variant="h6" align="left">
                  Types: {"  "}
                </Typography>
                <div className="grid grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-2 ">
                  {data?.types.map((type) => {
                    return <PopulateTypeImage id={type.type.name} />;
                  })}
                </div>
              </div>
            </div>

            <Typography variant="h5" mb={1}>
              Stats
            </Typography>

            <div className="grid  xl:grid-cols-2 grid-cols-1 mb-4 justify-start gap-5 items-start max-w-full w-full overflow-hidden ">
              {data?.stats.map((stat, ind) => {
                return StatItemReturn(stat, ind);
              })}
            </div>

            <Typography variant="h5" mb={1}>
              Moves
            </Typography>

            <MovesTable moves={data?.moves} />
          </div>
        </>
      )}
    </DetailsPageLayout>
  );
};
