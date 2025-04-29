import { Grid, Skeleton, Stack } from '@mui/material';
import React from 'react'
import { BouncingSkeleton } from '../styled/StyledComponents';

const LayoutLoader = () => {
  return (
    <Grid container height='96vh' spacing={"1rem"}>
                <Grid item sm={4} md={3} sx={{display:{xs:"none",sm:"block"}}} height={"100%"}><Skeleton variant='rounded' height={"100vh"}/></Grid>
                <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                <Stack spacing={"1rem"}>
                    {
                        Array(7).fill().map((it,index)=>(
                <Skeleton key={index} variant='rounded' height={"5rem"}/>
                        ))
                    }
                </Stack>
                </Grid>
                <Grid item md={4} lg={3} height={"100%"} sx={{display:{xs:"none",md:"block"}}}><Skeleton variant='rounded' height={"100vh"}/></Grid>
            </Grid>
  )
}

export default LayoutLoader;

export const TypingLoader=()=>{
return (
  <Stack
  spacing={"0.5rem"}
  direction={"row"}
  justifyContent={"center"}
  padding={"0.5rem"}
  >
    <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay:'0.1s'}}/>
    <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay:'0.2s'}}/>
    <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay:'0.4s'}}/>
    <BouncingSkeleton variant='circular' width={15} height={15} style={{animationDelay:'0.6s'}}/>

  </Stack>
)  
}