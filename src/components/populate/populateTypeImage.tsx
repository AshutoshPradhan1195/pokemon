import { IPokemonTypeSingle } from "../../interfaces";
import { useQuery } from "react-query";
import { axiosInstance } from "../datafetch";

interface props {
  id: string;
}

export const PopulateTypeImage = ({ id }: props) => {
  const { data } = useQuery<IPokemonTypeSingle>({
    queryKey: "typeData" + id,
    queryFn: async () => {
      const res = await axiosInstance.get(`/type/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return (
    <>
      <img
        src={data?.sprites["generation-viii"]["sword-shield"].name_icon}
        height={10}
        width={120}
        style={{ objectFit: "contain" }}
      />
    </>
  );
};
