import { styled } from '@mui/material'
import {Link as LinkComponent} from "react-router-dom";

const VisualyHidden=styled('input')({
    border:0,
    clip:"rect(0 0 0 0)",
    height:1,
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    width:1,
    whiteSpace:"nowrap"

})

export const Link=styled(LinkComponent)({
    textDecoration:"none",
    color:"black",
    padding:"1rem",
    ":hover":{
        backgroundColor:"#F0F0F0"
    }
})

export default VisualyHidden;