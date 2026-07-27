import BaseCard from "./Card/BaseCard";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

import ListItemIcon from "@mui/material/ListItemIcon";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
interface CriteriaProps {
  title: string;
  inclusion: string[];
  exclusion: string[];
}
export default function Criteria({
  title,
  inclusion,
  exclusion,
}: CriteriaProps) {
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
        <div className="flex justify-center w-full gap-20">
          <List sx={{ flex: 1 }}>
            {inclusion.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <ExpandCircleDownIcon
                    sx={{ color: "green", fontSize: 50, margin: 2 }}
                  />
                </ListItemIcon>{" "}
                <ListItemText
                  primary={item}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 18,
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "lightgreen",
                    paddingY: 2,
                    paddingX: 5,
                    borderRadius: 10,
                  }}
                />
              </ListItem>
            ))}
          </List>
          <List sx={{ flex: 1 }}>
            {exclusion.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemIcon>
                  <DisabledByDefaultIcon
                    sx={{ color: "red", fontSize: 50, margin: 2 }}
                  />
                </ListItemIcon>{" "}
                <ListItemText
                  primary={item}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 18,
                      },
                    },
                  }}
                  sx={{
                    backgroundColor: "lightpink",
                    paddingY: 2,
                    paddingX: 5,
                    borderRadius: 10,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </BaseCard>
  );
}
