import Card from "@mui/material/Card";
export default function BaseCard({ children }: any) {
  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: 10,
        borderColor: "skyblue",
        borderWidth: 3,
        display: "flex",
        margin: 4,
        padding: 3,
      }}
    >
      {children}
    </Card>
  );
}
