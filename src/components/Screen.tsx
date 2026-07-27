import type { PipelineState } from "@/services/api";
import TableCard from "./Card/TableCard";
import BaseCard from "./Card/BaseCard";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
interface ScreenProps {
  collected: PipelineState;
}
export default function Screen({ collected }: ScreenProps) {
  const rawPaperColumns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "authors",
      label: "Authors",
    },
    {
      key: "year",
      label: "Year",
    },
    {
      key: "doi",
      label: "Link",
    },
    {
      key: "source",
      label: "Source",
    },
  ];

  return (
    <BaseCard>
      <div className="flex flex-col w-full">
        <Typography variant="h2">
          <span className="logo text-blue-400">
            {" "}
            Step 1: Screening (Raw search)
          </span>
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
          raw_papers={collected.raw_papers ?? []}
          note={"Tổng số paper"}
          columns={rawPaperColumns}
        />
        <TableCard
          raw_papers={collected.deduped_papers ?? []}
          note={"Tổng số paper sau khi xóa trùng lặp"}
          columns={rawPaperColumns}
        />
        <TableCard
          raw_papers={collected.screened_papers ?? []}
          note={"Tổng số paper sau bước Screen (lọc năm, lọc qua abstract)"}
          columns={rawPaperColumns}
        />
      </div>
    </BaseCard>
  );
}

/*


   <>
      {" "}
     
      <RawListCard
        title="Screening"
        raw_papers={testPapers}
        note={"Tổng số paper sau khi xóa trùng"}
      />
    </> */
