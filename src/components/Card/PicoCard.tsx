import Card from "@mui/material/Card";
import BaseCard from "./BaseCard";
import Typography from "@mui/material/Typography";
import CircleCard from "./CircleCard";
import type { Pico } from "../../services/type";
import Divider from "@mui/material/Divider";
interface PicoChildCardProps {
  char?: string;
  namePico?: string;
  contentPico?: string;
}
function PicoChildCard({ char, namePico, contentPico }: PicoChildCardProps) {
  return (
    <Card
      sx={{
        margin: 2,
        padding: 4,
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        borderWidth: 2,
        borderColor: "skyblue",
        borderRadius: 10,
      }}
    >
      <CircleCard>
        <Typography variant="h2" sx={{ color: "black" }}>
          <span className="logo text-blue-700">{char}</span>
        </Typography>
      </CircleCard>

      <Typography variant="h4" sx={{ padding: 1 }}>
        <span className="logo text-blue-500">{namePico}</span>
      </Typography>
      <Typography sx={{ padding: 1 }}>{contentPico}</Typography>
    </Card>
  );
}

interface PicoCardProps {
  title: string;
  pico: Pico;
}
export default function PicoCard({ title, pico }: PicoCardProps) {
  return (
    <BaseCard>
      <div className="flex flex-col">
        <Typography variant="h2">
          <span className="logo text-blue-400"> {title}</span>
          <Divider
            sx={{ borderWidth: 3, borderColor: "skyblue", width: "100%" }}
          />
        </Typography>
        <p>{pico.research_question}</p>
        <div className="grid gap-6 md:grid-cols-4  w-full">
          <PicoChildCard
            char="P"
            namePico="Population"
            contentPico={pico.population}
          />
          <PicoChildCard
            char="I"
            namePico="Intervention"
            contentPico={pico.intervention}
          />
          <PicoChildCard
            char="C"
            namePico="Comparison"
            contentPico={pico.comparison}
          />
          <PicoChildCard
            char="O"
            namePico="Outcome"
            contentPico={pico.outcome}
          />
        </div>
      </div>
    </BaseCard>
  );
}
