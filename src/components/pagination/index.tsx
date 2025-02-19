import { Button, MenuItem, Select, Stack } from "@mui/material";
import { IPokemonList } from "../../interfaces";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";

interface props {
  data: IPokemonList | undefined;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  offset: number;
  limit: number;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<IPokemonList, unknown>>;
  allPages: number;
}
export const Pagination = ({
  data,
  setOffset,
  setPage,
  page,
  setLimit,
  refetch,
  offset,
  limit,
  allPages,
}: props) => {
  const handlePageSizeChange = (val: number) => {
    setLimit(val);
    setOffset(0);
    setPage(1);
    refetch();
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      mt={5}
      gap={1}
      alignItems={"center"}
      justifyItems={"center"}
    >
      <Button
        variant="contained"
        onClick={() => {
          if (data?.previous) {
            setOffset((prev) => prev - limit);
            setPage((prev) => prev - 1);
            window.scrollTo({ top: 0 });
          }
        }}
      >
        Previous
      </Button>
      {page + " / " + allPages}
      <Button
        variant="contained"
        onClick={() => {
          if (data && data.next) {
            setOffset((prev) => prev + limit);
            setPage((prev) => prev + 1);
            window.scrollTo({ top: 0 });
          }
        }}
      >
        Next
      </Button>
      <Select
        value={limit}
        sx={{ height: 40 }}
        onChange={({ target }) => handlePageSizeChange(target.value as number)}
      >
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </Stack>
  );
};
