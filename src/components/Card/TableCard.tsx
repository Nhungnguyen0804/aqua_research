import PaperTable from "./PaperTable";
import type { PaperType, ColumnType } from "../../services/type";

import Typography from "@mui/material/Typography";
interface RawListProps {
  raw_papers: PaperType[];
  note: string;
  columns: ColumnType[];
}
export default function TableCard({ raw_papers, note, columns }: RawListProps) {
  return (
    <>
      {/* content  */}{" "}
      <Typography sx={{ margin: 2, pointerEvents: "auto" }}>
        {note}: {raw_papers.length}
      </Typography>
      <PaperTable papers={raw_papers} columns={columns} />
    </>
  );
}
