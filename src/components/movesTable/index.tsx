import { useQueries } from "react-query";
import { IMoveDetail, IMoves } from "../../interfaces";
import { axiosInstance } from "../datafetch";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { capitalizeFirstLetterOfEachWord } from "../../helpers";

interface props {
  moves: IMoves[] | undefined;
}

const TableCellBordered = (props: TableCellProps) => {
  return (
    <TableCell
      {...props}
      sx={{
        bgcolor: "none",
        border: "1px solid",
        borderColor: "black",
      }}
    ></TableCell>
  );
};

export const MovesTable = ({ moves }: props) => {
  const fetchMovesDetail = async (move: string) => {
    return (await axiosInstance.get("/move/" + move)).data;
  };

  const results = useQueries<IMoveDetail[]>(
    moves?.map((data) => {
      return {
        queryKey: ["post", data.move.name],
        queryFn: () => fetchMovesDetail(data.move.name),
      };
    }) || []
  );

  const data = results.map((data) => data.data as IMoveDetail);

  console.log(data);

  if (results.some((r) => r.isLoading)) return <>Loading</>;
  if (results.some((r) => r.isError)) {
    return <>Error</>;
  }

  return (
    <Paper sx={{ bgcolor: "transparent" }}>
      <TableContainer>
        <Table sx={{ bgcolor: "none", border: "1px solid black" }}>
          <TableHead
            sx={{
              bgcolor: "none",
              border: "1px solid",
              borderColor: "black",
            }}
          >
            <TableRow
              sx={{
                bgcolor: "none",
                border: "1px solid",
                borderColor: "black",
              }}
            >
              <TableCellBordered>SN</TableCellBordered>

              <TableCellBordered>Name</TableCellBordered>
              <TableCellBordered>Accuracy</TableCellBordered>
              <TableCellBordered>Power</TableCellBordered>
              <TableCellBordered>PP</TableCellBordered>
              <TableCellBordered>Priority</TableCellBordered>
              <TableCellBordered>Damage Class</TableCellBordered>

              <TableCellBordered>Contest Type</TableCellBordered>
              <TableCellBordered>Flavour Text</TableCellBordered>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              bgcolor: "none",
              border: "1px solid",
              borderColor: "black",
            }}
          >
            {data.map((move, ind) => {
              let flavor_text = "NA";
              for (let i = move.flavor_text_entries.length; i >= 0; i--) {
                if (
                  !!move.flavor_text_entries[i] &&
                  move.flavor_text_entries[i].language.name === "en"
                ) {
                  flavor_text = move.flavor_text_entries[i].flavor_text;
                  break;
                }
              }

              return (
                <TableRow
                  sx={{
                    bgcolor: "none",
                    border: "1px solid",
                    borderColor: "black",
                  }}
                >
                  <TableCellBordered>{ind + 1}</TableCellBordered>
                  <TableCellBordered>
                    {capitalizeFirstLetterOfEachWord(move.name)}
                  </TableCellBordered>
                  <TableCellBordered>{move.accuracy ?? "NA"}</TableCellBordered>
                  <TableCellBordered>{move.power ?? "NA"}</TableCellBordered>
                  <TableCellBordered>{move.pp ?? "NA"}</TableCellBordered>

                  <TableCellBordered>{move.priority ?? "NA"}</TableCellBordered>
                  <TableCellBordered>
                    {move.damage_class
                      ? capitalizeFirstLetterOfEachWord(move.damage_class.name)
                      : "NA"}
                  </TableCellBordered>
                  <TableCellBordered>
                    {move.contest_type
                      ? capitalizeFirstLetterOfEachWord(move.contest_type.name)
                      : "NA"}
                  </TableCellBordered>
                  <TableCellBordered>{flavor_text}</TableCellBordered>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
