import { axiosInstance } from "../../components/datafetch/index";
import { IPokemonGeneration, IPokemonList } from "../../interfaces";
import logo from "../../assets/logo.png";

import { useState } from "react";
import { Pagination } from "../../components/pagination";
import { GridTable } from "../../components/gridTable";
import ClearIcon from "@mui/icons-material/Clear";
import { useQuery } from "react-query";
import { IconButton, InputAdornment, MenuItem, Select } from "@mui/material";

const fetchPokemonList = async (offset: number = 0, limit: number = 20) => {
  const res = await axiosInstance.get(
    `/pokemon?offset=${offset}&limit=${limit}`
  );
  return res.data;
};

const fetchPokemonByGen = async (gen: number) => {
  const res = await axiosInstance.get(`/generation/${gen}`);
  return res.data;
};
export const Home = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [allPages, setAllPages] = useState(0);
  const [gen, setGen] = useState(0);

  const query = useQuery<IPokemonList>({
    queryKey: ["pokemonAll", offset, page, limit],
    queryFn: () => {
      return fetchPokemonList(offset, limit);
    },
    keepPreviousData: true,
    onSettled(data) {
      const total = data?.count;
      if (total) {
        setAllPages(Math.ceil(total / limit));
      }
    },
  });

  const queryGeneration = useQuery<IPokemonGeneration>({
    queryKey: ["pokemonGeneration", gen],
    queryFn: () => {
      return fetchPokemonByGen(gen);
    },
    enabled: !!gen && gen > 0,
    keepPreviousData: true,
  });

  const { data, refetch } = query;

  const queryParam = gen === 0 ? query : queryGeneration;

  const resultData =
    gen === 0 ? data?.results : queryGeneration.data?.pokemon_species;

  return (
    <div className=" pb-8">
      <div className="w-full flex justify-center">
        <img src={logo} height={200} width={400} />
      </div>

      <div className=" px-15">
        <div className=" flex justify-end mb-5">
          <Select
            value={gen}
            sx={{ borderRadius: 2, borderWidth: 1, borderStyle: "solid" }}
            endAdornment={
              <InputAdornment sx={{ marginRight: "10px" }} position="end">
                <IconButton
                  onClick={() => {
                    setGen(0);
                  }}
                >
                  <ClearIcon></ClearIcon>
                </IconButton>
              </InputAdornment>
            }
            onChange={({ target }) => {
              setGen(target.value as number);
            }}
          >
            <MenuItem value={0}>All Gen</MenuItem>
            <MenuItem value={1}>Gen I</MenuItem>
            <MenuItem value={2}>Gen II</MenuItem>
            <MenuItem value={3}>Gen III</MenuItem>
            <MenuItem value={4}>Gen IV</MenuItem>
            <MenuItem value={5}>Gen V</MenuItem>
            <MenuItem value={6}>Gen VI</MenuItem>
            <MenuItem value={7}>Gen VII</MenuItem>
            <MenuItem value={8}>Gen VIII</MenuItem>
            <MenuItem value={9}>Gen IX</MenuItem>
          </Select>
        </div>
        <GridTable {...queryParam} results={resultData} />
      </div>

      {gen === 0 && (
        <Pagination
          setOffset={setOffset}
          setPage={setPage}
          offset={offset}
          limit={limit}
          setLimit={setLimit}
          allPages={allPages}
          page={page}
          data={data}
          refetch={refetch}
        />
      )}
    </div>
  );
};
