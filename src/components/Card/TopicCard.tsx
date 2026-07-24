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
        <CardContent sx={{ margin: 2 }}>
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
        <CardActions
          sx={{ display: "flex", flexDirection: "column", margin: 4 }}
        >
          <Typography variant="h4">
            <span className="logo text-blue-400"> Search TOPIC</span>
          </Typography>
          <TextField
            multiline
            rows={4}
            placeholder="Type something..."
            variant="outlined"
            fullWidth
            onChange={(e) => setTopic(e.target.value)}
            sx={{
              marginBottom: 4,
              marginRight: 4,
              pointerEvents: "auto",
              borderColor: "black",
              borderWidth: 5,
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
