import BaseCard from "./Card/BaseCard";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Box from "@mui/material/Box";
import { useRef } from "react";
import Button from "./Button/Button";

interface Props {
  title: string;
  content: string | undefined;
}

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function Report({ title, content }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  // Dùng cho .md
  const handleDownloadMd = (title: string, content: any) => {
    downloadFile(`${title}.md`, content, "text/markdown;charset=utf-8");
  };

  // Dùng cho .txt nên bỏ bớt cú pháp markdown
  const stripMarkdown = (md: string) =>
    md
      .replace(/^#+\s+/gm, "") // heading
      .replace(/\*\*(.*?)\*\*/g, "$1") // bold
      .replace(/\*(.*?)\*/g, "$1") // italic
      .replace(/`{1,3}([^`]*)`{1,3}/g, "$1") // code
      .replace(/\[(.*?)\]\((.*?)\)/g, "$1 ($2)"); // link

  const handleDownloadTxt = (title: string, content: any) => {
    downloadFile(
      `${title}.txt`,
      stripMarkdown(content),
      "text/plain;charset=utf-8",
    );
  };

  return (
    <BaseCard>
      <div className="flex flex-col w-full">
        {" "}
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
        />
        <Box
          ref={contentRef}
          sx={{
            overflowX: "auto",
            "& p": {
              lineHeight: 1.8,
              mb: 2,
            },
            "& h1": {
              fontSize: "2rem",
              lineHeight: 1.3,
              fontWeight: "bold",
              mb: 3,
            },

            "& h2": {
              fontSize: "1.5rem",
              lineHeight: 1.35,
              fontWeight: "bold",
              mt: 4,
              mb: 2,
            },

            "& h3": {
              fontSize: "1.2rem",
              lineHeight: 1.4,
              fontWeight: "bold",
              mt: 3,
              mb: 1.5,
            },
            "& table": {
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              overflow: "hidden",
            },

            "& th, & td": {
              padding: "12px 16px",
              borderBottom: "1px solid",
              borderRight: "1px solid",
              borderColor: "divider",
            },

            "& th": {
              backgroundColor: "grey.100",
              fontWeight: 700,
            },

            "& tr:last-child td": {
              borderBottom: 0,
            },

            "& th:last-child, & td:last-child": {
              borderRight: 0,
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            m: 3,

            pointerEvents: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            content="Tải .md"
            onClick={() => handleDownloadMd(title, content)}
            className="effect-color-change pointer-events-auto"
          />
          <Button
            content="Tải .txt"
            onClick={() => handleDownloadTxt(title, content)}
            className="effect-color-change pointer-events-auto"
          />
        </Box>
      </div>
    </BaseCard>
  );
}
