import { Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { capitalizeFirstLetterOfEachWord } from "../../helpers";

interface props {
  children: React.ReactNode;
}
export const DetailsPageLayout = ({ children }: props) => {
  const { id } = useParams();
  return (
    <div>
      <div className="h-full flex flex-col content-center justify-center pt-10 pb-5">
        <div className="w-full">
          <Typography variant="h5">
            <Link to={"/"}> Pokemon </Link>/{" "}
            <Link to={"/pokemon/" + id}>
              {capitalizeFirstLetterOfEachWord(id ?? "")}
            </Link>
          </Typography>
        </div>

        {children}
      </div>
    </div>
  );
};
