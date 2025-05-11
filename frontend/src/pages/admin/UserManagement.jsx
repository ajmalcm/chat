import { Avatar, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useErrors } from '../../../hooks/hook';
import AdminLayout from '../../components/layout/AdminLayout';
import Table from '../../components/shared/Table';
import { transformImage } from '../../lib/features';
import { useGetAdminAllUsersQuery } from '../../redux/api/api';


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
    width:200
  },
  {
    field:"username",
    headerName:"Username",
    headerClassName:"table-header",
    width:200
  },
  {
    field:"friends",
    headerName:"Friends",
    headerClassName:"table-header",
    width:150
  },
  {
    field:"groups",
    headerName:"Groups",
    headerClassName:"table-header",
    width:200
  },
];

const UserManagement = () => {

  const [rows,setRows]=useState([]);

  const {isLoading,isError,error,data}=useGetAdminAllUsersQuery();

  useErrors([{isError,error}]);

  useEffect(()=>{
    if(data)
    {
      setRows(data?.users.map((i)=>({...i,id:i._id,avatar:transformImage(i.avatar,50)})))
    }
  },[data])


  return (
    <AdminLayout>
    {
      isLoading?<Skeleton height={"100vh"}/>:
    <Table heading={"All Users"} columns={columns} rows={rows}/>
    }
    </AdminLayout>
  )
}

export default UserManagement