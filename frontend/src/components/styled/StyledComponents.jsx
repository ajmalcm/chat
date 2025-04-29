import { keyframes, Skeleton, styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";

const VisualyHidden = styled("input")({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: 1,
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  width: 1,
  whiteSpace: "nowrap",
});

export const Link = styled(LinkComponent)({
  textDecoration: "none",
  color: "black",
  padding: "1rem",
  ":hover": {
    backgroundColor: "rgba(0,0,0,0.1)",
  },
});

export const InputBox = styled("input")({
  width: "100%",
  height: "100%",
  border: "none",
  outline: "none",
  padding: "0 3rem",
  borderRadius: "1.5rem",
  backgroundColor: "#EAEAEA",
});

export const SearchField=styled("input")({
  padding:"1rem 2rem",
  width:"20vmax",
  border:"none",
  outline:"none",
  borderRadius:"1.5rem",
  backgroundColor:"#f5f5f5",
  fontSize:"1.1rem"
})

export const CurveButton=styled("button")({
  borderRadius:"1rem",
  padding:"1rem 2rem",
  border:"none",
  outline:"none",
  cursor:"pointer",
  backgroundColor:"black",
  color:"white",
  fontSize:"1.1rem",
  ":hover":{
    backgroundColor:"rgba(0,0,0,0.8)"
  }
})

const bouncingAnimations=keyframes`
0% {transform:scale(1)}
50% {transform:scale(1.5)}
100% {transform:scale(1)}
`;

export const BouncingSkeleton=styled(Skeleton)(()=>({
animation:`${bouncingAnimations} 1s infinite`,
}))

export default VisualyHidden;
