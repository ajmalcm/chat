import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import React from 'react'

const AvatarCard = ({avatar=[],max=4}) => {
  return (
   <Stack direction={"row"} spacing={0.4}>
    <AvatarGroup max={max}>
        <Box width={"5rem"} height={"3rem"}>
            {
                avatar?.map((i,index)=>(
                    <Avatar
                        key={Math.random()*100}
                        src={i}
                        alt={`avatar ${index}`}
                        sx={{
                            width:"3rem",
                            height:"3rem",
                            position:"absolute",
                            left:{
                                xs:`${0.5+ index}rem`,
                                sm:`${index}rem`
                            }
                        }}
                    />
                ))
            }
        </Box>
    </AvatarGroup>
   </Stack>
  )
}

export default AvatarCard