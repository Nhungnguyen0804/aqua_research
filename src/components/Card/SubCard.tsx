import BaseCard from "./BaseCard";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import ListItemIcon from "@mui/material/ListItemIcon";
interface SubQueryProps {
  title: string;
  sub_queries: string[];
}
export default function PicoCard({ title, sub_queries }: SubQueryProps) {
  return (
    <BaseCard>
      {" "}
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
        />
        {/* danh sach item   */}
        <List>
          {sub_queries.map((query, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <SearchIcon
                  sx={{ color: "lightblue", fontSize: 50, margin: 2 }}
                />
              </ListItemIcon>{" "}
              <ListItemText
                primary={query}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: 18,
                    },
                  },
                }}
                sx={{
                  backgroundColor: "skyblue",
                  paddingY: 2,
                  paddingX: 5,
                  borderRadius: 10,
                }}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </BaseCard>
  );
}
