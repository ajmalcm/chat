import ErrorIcon from "@mui/icons-material/Error";
import { Button, Container, Stack, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack
        alignItems={"center"}
        justifyContent="center"
        spacing={"2rem"}
        height={"100vh"}
      >
        <ErrorIcon sx={{ fontSize: "8rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Not Found</Typography>
        <Button
          variant="contained"
          href="/"
          sx={{ width: "10rem", backgroundColor: "#000" }}
        >
          Go Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;
