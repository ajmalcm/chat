import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chatModel.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE,
  NEW_MESSAGE_ALERT,
  REFETCH_CHAT,
} from "../constants/events.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/userModel.js";
import {Message} from "../models/messageModel.js";

export const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    return next(new ErrorHandler("Group chat must be atleast 3 members", 400));
  }

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHAT, members);

  return res.status(201).json({
    success: true,
    message: "Group created",
  });
});

export const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(({ name, _id, groupChat, members }) => {
    const otherMember = getOtherMember(members, req.user);

    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 3).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url], //since we are populating the avatar as array in frontend'
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  return res.status(200).json({
    success: true,
    message: "all chats retrieved",
    chats: transformedChats,
  });
});

export const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ members, _id, groupChat, name }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});

export const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;

  // if (!members || members.length < 1)
  //   return next(new ErrorHandler("Please provide members.", 400));

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not Found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to  add members.", 403));

  const allNewMembersPromise = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Group members limit reached", 400));
  }
  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(",");
  const allMembers = chat.members.map((i) => i.toString());

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${allUsersName} has been added to ${chat.name} group`
  );

  emitEvent(req, REFETCH_CHAT, allMembers);

  return res.status(200).json({
    success: true,
    message: "members added successfully.",
  });
});

export const removeMembers = TryCatch(async (req, res, next) => {
  const { chatId, userId } = req.body;

  const [chat, userToBeRemoved] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not Found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to  add members.", 403));

  if (chat.members.length <= 3)
    return next(new ErrorHandler("Group must atleast have 3 members", 400));

  const allChatMembers=chat.members.map((i)=>i.toString());

  chat.members = chat.members.filter(
    (member) => member.toString() !== userId.toString()
  );

  await chat.save();

  emitEvent(
    req,
    ALERT,
    chat.members,
    `${userToBeRemoved.name} has been removed from the group`
  );

  emitEvent(req, REFETCH_CHAT, allChatMembers);

  return res.status(200).json({
    success: true,
    message: "member removed successfully.",
  });
});

export const leaveGroup = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const chat = await Chat.findById(id);

  if (!chat) return next(new ErrorHandler("Chat not Found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not a group chat", 400));

  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have atleast 3 members", 400));

  if (chat.creator.toString() === req.user.toString()) {
    const randomMember = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = chat.members[randomMember];
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.members, `User ${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: `User ${user.name} has left the group`,
  });
});

export const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const files = req.files || [];
  if (files.length < 1)
    return next(new ErrorHandler("Please Upload attachments", 400));

  if (files.length > 5)
    return next(new ErrorHandler("files cannot be more than 5", 400));

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not Found", 404));


  if (files.length < 1)
    return next(new ErrorHandler("Please provide attachments", 404));

  //upload files here

  const attachments = await uploadFilesToCloudinary(files); //4:05

  const messageForDB = { content: "", attachments, sender: me._id, chat:chatId };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };


  const message=await Message.create(messageForDB);

  emitEvent(req, NEW_MESSAGE, chat.members, {
    message: messageForRealTime,
    chatId,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

export const getChatDetails=TryCatch(async(req,res,next)=>{
    if(req.query.populate==="true")
    {
        const chat=await Chat.findById(req.params.id).populate("members","name avatar").lean();
        //lean method will make the chat variable as a classic js object and wont be considered as a mongoDB object

        if (!chat) return next(new ErrorHandler("Chat not Found", 404));

        chat.members=chat.members.map(({_id,name,avatar})=>({_id,name,avatar:avatar.url}))

        return res.status(200).json({
            success:true,
            chat
        })
    }

    else
    {
        const chat=await Chat.findById(req.params.id);

        if(!chat)
            return next(new ErrorHandler("Chat not found",404));

        return res.status(200).json({
            success:true,
            chat
        })
    }
})

export const renameGroup=TryCatch(async(req,res,next)=>{
    const {name}=req.body;
    const {id}=req.params;

    const chat=await Chat.findById(id);

    if(!chat)
        return next(new ErrorHandler("chat not found",404));

    if(!chat.groupChat)
        return next(new ErrorHandler("This is not a group chat.",400))

    if(chat.creator.toString()!==req.user.toString())
        return next(new ErrorHandler("You are not allowed to rename the group",403))

    chat.name=name;

    await chat.save();

    emitEvent(req,REFETCH_CHAT,chat.members);

    return res.status(200).json({
        success:true,
        message:"chat renamed successfully",
    })

})

export const deleteChat=TryCatch(async(req,res,next)=>{
    const chatId=req.params.id;

    const chat=await Chat.findById(chatId);

    if(!chat)
        return next(new ErrorHandler("chat not found",404));

    const members=chat.members;

    if(chat.groupChat && chat.creator.toString()!==req.user.toString())
        return next(new ErrorHandler("You are not allowed to delete the group",403));

    if(!chat.groupChat && !chat.members.includes(req.user.toString()))
        return next(new ErrorHandler("You are not allowed to delete the group",403));

    //here we have to delete all messges as well as all attachments and files from cloudinary

    const messagesWithAttachments=await Chat.find({chat:chatId,attachments:{$exists:true,$ne:[]}})

    const public_ids=[];

    messagesWithAttachments.forEach(({attachments})=>
    attachments.forEach(({public_id})=>public_ids.push(public_id))//some error here
    )

    await Promise.all([
        //delete files from cloudinary
        deleteFilesFromCloudinary(public_ids),
        chat.deleteOne(),
        Message.deleteMany({chat:chatId})
    ])

    emitEvent(req,REFETCH_CHAT,members);

    return res.status(200).json({
        success:true,
        message:"Chat deleted successfully."
    })

})

export const getMessages=TryCatch(async(req,res,next)=>{
    const chatId=req.params.id;
    const {page=1}=req.query;
    const resultPerPage=20;
    const skip=(page-1)*resultPerPage;

    const chat=await Chat.findById(chatId);

    if(!chat)
      return next(new ErrorHandler("Chat not found",404));

    if(!chat.members.includes(req.user.toString()))
        return next(new ErrorHandler("You are not allowed to access this chat",403));

    const [messages,totalMessagesCount]=await Promise.all([
        Message.find({chat:chatId}).
        sort({createdAt:-1}).
        skip(skip).
        limit(resultPerPage).populate("sender","name").
        lean(),
        Message.countDocuments({chat:chatId})
    ])

    const totalPages=Math.ceil(totalMessagesCount/resultPerPage);

    return res.status(200).json({
        success:true,
        messages:messages.reverse(),
        totalPages
    })

})
