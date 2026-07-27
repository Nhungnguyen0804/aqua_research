import type { PipelineState } from "@/services/api";
import TableCard from "./Card/TableCard";
import BaseCard from "./Card/BaseCard";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
interface Props {
  title: string;
  collected: PipelineState;
}
export default function DeepFilter({ title, collected }: Props) {
  const nameColumns = [
    { key: "title", label: "Title" },
    { key: "authors", label: "Authors" },
    // {key: "year",label: "Year",},
    { key: "doi", label: "Link" },
    { key: "source", label: "Source" },
    { key: "eligibility_reason", label: "Eligibility Reason" },
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
          raw_papers={collected.eligible_papers ?? []}
          note={"Tổng số paper"}
          columns={nameColumns}
        />
      </div>
    </BaseCard>
  );
}
