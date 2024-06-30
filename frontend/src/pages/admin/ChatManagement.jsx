import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Stack } from '@mui/material';
import { dashboardData } from '../../constants/sampleData';
import { transformImage } from '../../lib/features';
import AvatarCard from '../../components/shared/AvatarCard';


const columns=[
  {
    field:"id",
    headerName:"ID",
    headerClassName:"table-header",
    width:200
  },
  {
    field:"avatar",
    headerName:"Avatar",
    headerClassName:"table-header",
    width:150,
    renderCell:(params)=>(
      <Avatar alt={params.row.name} src={params.row.avatar}/>
    )
  },
  {
    field:"name",
    headerName:"Name",
    headerClassName:"table-header",
    width:300
  },
  {
    field:"totalMembers",
    headerName:"Total Members",
    headerClassName:"table-header",
    width:120
  },
  {
    field:"members",
    headerName:"Members",
    headerClassName:"table-header",
    width:400,
    renderCell:(params)=><AvatarCard max={100} avatar={params.row.members} />
  },
  {
    field:"total messages",
    headerName:"Total Messages",
    headerClassName:"table-header",
    width:120
  },
  {
    field:"creator",
    headerName:"Created By",
    headerClassName:"table-header",
    width:250,
    renderCell:(params)=>(
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar}/>
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },
];

const ChatManagement = () => {

  const [rows,setRows]=useState([]);

  useEffect(()=>{
  },[])

  return (
    <AdminLayout>
    <Table heading={"All Chats"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}


export default ChatManagement