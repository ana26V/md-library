import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Page404() {
  const navigate = useNavigate();
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <img
        height={900}
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
        alt=""
      />

      <Button
        variant="contained"
        sx={{ p: "0.8em 1.3em" }}
        onClick={() => navigate("/")}
      >
        GO back to home...
      </Button>
    </Box>
  );
}
