import type { PipelineState } from "@/services/api";
import TableCard from "./Card/TableCard";
import BaseCard from "./Card/BaseCard";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
interface Props {
  title: string;
  collected: PipelineState;
}
export default function Review({ title, collected }: Props) {
  const nameColumns = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    // {key: "year",label: "Year",},
    { key: "doi", label: "Link" },
    { key: "source", label: "Source" },
    { key: "review_status", label: "review_status" },
  ];

  return (
    <BaseCard>
      <div className="flex flex-col w-full">
        <Typography variant="h2">
          <span className="logo text-blue-400"> {title}</span>
        </Typography>{" "}
        <Divider
          sx={{
            borderWidth: 3,
            borderColor: "skyblue",
            width: "100%",
            marginTop: 2,
            marginBottom: 5,
          }}
        />{" "}
        <TableCard
          raw_papers={collected.reviewed_papers ?? []}
          note={"Tổng số paper"}
          columns={nameColumns}
        />
      </div>
    </BaseCard>
  );
}
