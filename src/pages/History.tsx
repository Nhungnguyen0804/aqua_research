import BaseCard from "../components/Card/BaseCard";
import { getHistory } from "../utils/History";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function History() {
  const items = getHistory();

  if (items.length === 0) {
    return (
      <BaseCard>
        <div
          className="w-full"
          style={{
            textAlign: "center",
            padding: "40px",
            color: "gray",
            fontSize: 30,
          }}
        >
          Danh sách đang rỗng
        </div>
      </BaseCard>
    );
  }

  return (
    <BaseCard>
      <div className="flex flex-col gap-4 pointer-events-auto">
        {items.map((item) => (
          <Accordion
            key={item.id}
            disableGutters
            variant="outlined"
            sx={{
              borderRadius: 2,
              borderWidth: 2,
              borderColor: "violet",
              padding: 2,
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <div className="flex justify-between w-full pr-2 items-center">
                <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                  {item.topic}
                </Typography>
                <Chip
                  size="small"
                  color="primary"
                  variant="outlined"
                  icon={<ArticleOutlinedIcon />}
                  label={new Date(item.createdAt).toLocaleString()}
                />
              </div>
            </AccordionSummary>

            <AccordionDetails>
              <div className="prose max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {item.report_content}
                </ReactMarkdown>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </BaseCard>
  );
}
