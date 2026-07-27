import {
  Typography,
  Divider,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SummarizeOutlined from "@mui/icons-material/SummarizeOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";

import type { ThemeGroup, ResearchGap } from "../services/type";
import BaseCard from "./Card/BaseCard";

interface Props {
  title: string;
  summary: string;
  themes: ThemeGroup[];
  gaps: ResearchGap[];
  recommendations: string;
}

// Class dùng chung cho hàng "icon + tiêu đề"
const rowClass = "flex gap-[18px] p-[5px]";

export default function Synthesis({
  title,
  summary,
  themes,
  gaps,
  recommendations,
}: Props) {
  return (
    <BaseCard>
      <div className="flex flex-col gap-8 p-5">
        {/* ===== Title ===== */}
        <div>
          <Typography variant="h4">{title}</Typography>
          <Divider
            sx={{ mt: 2, borderWidth: 2, borderColor: "primary.light" }}
          />
        </div>

        {/* ===== Summary ===== */}
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            borderRadius: 3,
            borderWidth: 3,
            borderColor: "lightblue",
          }}
        >
          <div className={rowClass}>
            <SummarizeOutlined color="primary" sx={{ fontSize: 50 }} />
            <Typography variant="h4">
              <span className="logo text-blue-700 ">Overall Summary</span>
            </Typography>
          </div>
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.9, whiteSpace: "pre-line" }}
          >
            {summary}
          </Typography>
        </Paper>

        {/* ===== Themes ===== */}
        <div className="pointer-events-auto">
          <div className={rowClass}>
            <LightbulbOutlinedIcon color="warning" sx={{ fontSize: 50 }} />
            <Typography variant="h4">
              <span className="logo text-purple-700">Main Research Themes</span>
            </Typography>
          </div>

          <div className="flex flex-col gap-4">
            {themes.map((theme, index) => (
              <Accordion
                key={index}
                disableGutters
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: "violet",
                  padding: 2,
                  gap: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <div className="flex justify-between w-full pr-2">
                    <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
                      {index + 1}. {theme.theme_name}
                    </Typography>
                    <Chip
                      size="small"
                      color="primary"
                      variant="outlined"
                      label={`${theme.papers.length} papers`}
                    />
                  </div>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography
                    color="text.secondary"
                    sx={{ lineHeight: 1.8, mb: 2 }}
                  >
                    {theme.description}
                  </Typography>

                  {theme.papers.length > 0 && (
                    <div className="flex gap-2 ">
                      {theme.papers.map((paper, i) => (
                        <Chip
                          key={i}
                          icon={<ArticleOutlinedIcon />}
                          label={paper}
                          variant="outlined"
                        />
                      ))}
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>

        {/* ===== Research Gaps ===== */}
        <div>
          <div className={rowClass}>
            <ReportProblemOutlinedIcon color="warning" sx={{ fontSize: 50 }} />
            <Typography variant="h4">
              <span className="logo text-orange-700">Research Gaps</span>
            </Typography>
          </div>

          <div className="flex flex-col gap-4">
            {gaps.map((gap, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderLeft: "4px solid",
                  borderRight: 1,
                  borderBottom: 1,
                  borderTop: 1,
                  borderLeftColor: "warning.main",
                  bgcolor: "warning.50",
                  padding: 2,
                }}
              >
                <Typography>
                  <b>Gap {index + 1}.</b> {gap.gap_description}
                </Typography>

                {gap.supporting_papers.length > 0 && (
                  <ul className="mt-2 mb-0 p2">
                    {gap.supporting_papers.map((paper, i) => (
                      <li key={i}>
                        <Typography variant="body2" color="text.secondary">
                          {paper}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                )}
              </Paper>
            ))}
          </div>
        </div>

        {/* ===== Recommendations ===== */}
        <div>
          <div className={rowClass}>
            <TipsAndUpdatesOutlinedIcon color="primary" sx={{ fontSize: 50 }} />
            <Typography variant="h4">
              <span className="logo text-green-700">
                Future Research Recommendations
              </span>
            </Typography>
          </div>

          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "primary.50",
              borderWidth: 2,
              borderColor: "lightgreen",
            }}
          >
            <Typography sx={{ whiteSpace: "pre-line", lineHeight: 1.9 }}>
              {recommendations}
            </Typography>
          </Paper>
        </div>
      </div>
    </BaseCard>
  );
}
