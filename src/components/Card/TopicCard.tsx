import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ImageIcon } from "../Icon";
import { img } from "../../assets/img";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "../Button/Button";
import BaseCard from "./BaseCard";
import { useState } from "react";

interface TopicCardProps {
  onSearch: (topic: string) => void;
  loading: boolean;
  error: string | null;
}

export default function TopicCard({
  onSearch,
  loading,
  error,
}: TopicCardProps) {
  const [topic, setTopic] = useState<any>("");

  const handleClick = () => {
    if (!topic.trim()) return;
    onSearch(topic);
  };

  return (
    <BaseCard>
      <div className="w-1/3 ">
        <ImageIcon src={img.meo} className="w-full h-auto" />
      </div>
      <div className="w-2/3 flex flex-col ">
        <CardContent>
          {" "}
          <Typography variant="h2">
            <span className="logo text-blue-400"> Aqua Research AI</span>
          </Typography>
          <Typography>
            An AI-powered literature review assistant that helps researchers
            search, screen, extract, evaluate and summarize scientific papers
            efficiently.
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4">
            <span className="logo text-blue-400"> Search TOPIC</span>
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Type topic..."
            variant="outlined"
            fullWidth
            onChange={(e) => setTopic(e.target.value)}
            sx={{
              pointerEvents: "auto",
              mb: 4,
              mr: 4,

              "& .MuiOutlinedInput-root": {
                borderRadius: "16px",
                backgroundColor: "#90caf9",
                backdropFilter: "blur(12px)",

                "& fieldset": {},

                "&:hover fieldset": {
                  borderColor: "#90caf9",
                  borderWidth: 3,
                },

                "&.Mui-focused fieldset": {
                  borderColor: "#42a5f5",
                  borderWidth: 3,
                },
              },

              "& textarea": {
                color: "black",
                fontSize: "1rem",
                padding: "16px",
              },

              "& textarea::placeholder": {
                color: "rgba(255,255,255,.6)",
                opacity: 1,
              },
            }}
          />
          <Button
            content={loading ? "Searching..." : "Search TOPIC"}
            className="effect-color-change pointer-events-auto"
            onClick={handleClick}
          />
          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </CardActions>
      </div>
    </BaseCard>
  );
}
