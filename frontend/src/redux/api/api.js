import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config';

const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["Chat","User"],  //for caching
    endpoints:(builder)=>({
        myChats:builder.query({
            query:()=>({
                url:"chat/my",
                credentials:"include"
            }),
            providesTags:["Chat"] //for caching
        }),
        // invalidateTags:["Chat"]  //for refetching
        searchUser:builder.query({
            query:(name)=>({
                url:`user/search?name=${name || ""}`,
                credentials:"include",
            }),
            providesTags:["User"]
        }),
        sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:'/user/sendrequest',
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["User"]
        })
    })

});

export default api;
export const {useMyChatsQuery,useLazySearchUserQuery,useSendFriendRequestMutation}=api;