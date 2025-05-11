import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config';
import { getAdmin } from '../thunks/admin';

const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["Chat","User","Message"],  //for caching
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
        }),
        acceptFriendRequest:builder.mutation({
            query:(data)=>({
                url:'/user/acceptrequest',
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }),
        getNotifications:builder.query({
            query:()=>({
                url:"/user/notifications",
                credentials:"include",

            }),
            keepUnusedDataFor:0,
        }),
        chatDetails:builder.query({
            query:({chatId,populate=false})=>{
                let url=`chat/${chatId}`
                if(populate)
                    url+='?populate=true'

                return {
                    url,
                    credentials:'include'
                }
            },
            providesTags:["Chat"]
        }),
        getMessages:builder.query({
            query:({chatId,page})=>({
                url:`chat/message/${chatId}?page=${page}`,
                credentials:'include'
            }),
            keepUnusedDataFor:0,
        }),
        sendAttachMents:builder.mutation({
            query:(data)=>({
                url:"chat/messages",
                method:"POST",
                body:data,
                credentials:"include"
            })
        }),
        myGroups:builder.query({
            query:(data)=>({
                url:"chat/my/groups",
                credentials:"include"
            }),
            providesTags:["Chat"]
        }),
        availableFriends:builder.query({
            query:(chatId)=>{
                let url="user/friends";
                if(chatId)
                    url+=`?chatId=${chatId}`
                return {
                    url,
                    credentials:"include"
                }
            },
            providesTags:["Chat"]
        }),
        newGroup:builder.mutation({
            query:({name,members})=>({
                url:"chat/new",
                method:"POST",
                credentials:"include",
                body:{name,members}
            }),
            invalidatesTags:["Chat"]
        }),
        renameGroup:builder.mutation({
            query:({chatId,name})=>({
                url:`chat/${chatId}`,
                method:"PUT",
                credentials:"include",
                body:{name}
            }),
            invalidatesTags:["Chat"]
        }),
        removeGroupmember:builder.mutation({
            query:({chatId,userId})=>({
                url:`chat/removemember`,
                method:"PUT",
                credentials:"include",
                body:{chatId,userId},
            }),
            invalidatesTags:["Chat"]
        }),
        addGroupMember:builder.mutation({
            query:({members,chatId})=>({
                url:`chat/addmembers`,
                method:"PUT",
                credentials:"include",
                body:{members,chatId},
            }),
            invalidatesTags:["Chat"]
        }),
        deleteChat:builder.mutation({
            query:(chatId)=>({
                url:`chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"]
        }),
        leaveGroup:builder.mutation({
            query:(chatId)=>({
                url:`chat/leave/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"]
        }),
        getAdminStats:builder.query({
            query:()=>({
                url:"admin/stats",
                credentials:"include"
            })
        }),
        getAdminAllUsers:builder.query({
            query:()=>({
                url:"admin/users",
                credentials:"include"
            }),
            invalidatesTags:["User"]
        }),
        getAdminAllChats:builder.query({
            query:()=>({
                url:"admin/chats",
                credentials:"include"
            }),
            invalidatesTags:["Chat"],
        }),
        getAdminAllMessages:builder.query({
            query:()=>({
                url:"admin/messages",
                credentials:"include"
            }),
            invalidatesTags:["Message"]
        }),
    })

});

export default api;
export const {useMyChatsQuery,useLazySearchUserQuery,useSendFriendRequestMutation,useGetNotificationsQuery,useAcceptFriendRequestMutation,useChatDetailsQuery,useGetMessagesQuery,useSendAttachMentsMutation,useMyGroupsQuery,useAvailableFriendsQuery,useNewGroupMutation,useRenameGroupMutation,useRemoveGroupmemberMutation,useAddGroupMemberMutation,useDeleteChatMutation,useLeaveGroupMutation,useGetAdminStatsQuery,useGetAdminAllUsersQuery,useGetAdminAllChatsQuery,useGetAdminAllMessagesQuery}=api;