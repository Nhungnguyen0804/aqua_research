import Box from "@mui/material/Box";
export default function CircleCard({ children }: any) {
  return (
    <Box
      sx={{
        width: 56,
        height: 56,
        borderRadius: "50%",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
        background:
          "radial-gradient(circle at 30% 30%, #eef9ff 0%, #d7efff 60%, #c4e5ff 100%)",

        boxShadow: `
            inset 0 2px 4px rgba(255,255,255,.8),
            inset 0 -4px 8px rgba(130,180,255,.25),
            0 4px 10px rgba(120,170,255,.25)
            `,
      }}
    >
      {children}
    </Box>
  );
}
