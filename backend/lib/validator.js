import {body, check, param, validationResult} from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler=(req,res,next)=>{
    const errors=validationResult(req);

    const errorMessages=errors.array().map(error=>error.msg).join(",")

    console.log(errorMessages);

    if(errors.isEmpty()) return next();
    else
    return next(new ErrorHandler(errorMessages,400));
}

const registerValidator=()=>[
    body("name","please enter name.").notEmpty(),
    body("username","please enter username.").notEmpty(),
    body("password","please enter password.").notEmpty(),
    body("bio","please enter bio.").notEmpty(),
    check("avatar","Please upload avatar.").notEmpty()
];

const loginValidator=()=>[
    body("username","Please enter Username.").notEmpty(),
    body("password","please enter password.").notEmpty()
]

const newGroupChatValidator=()=>[
    body("name","Please provide groupchat name").notEmpty(),
    body("members").notEmpty().withMessage("Please provide members.").isArray({min:2,max:100}).withMessage("Members must be between 3-100")
]

const addMemberValidator=()=>[
    body("chatId","Please provide chat Id").notEmpty(),
    body("members").notEmpty().withMessage("Please provide members.").isArray({min:1,max:97}).withMessage("Members must be between 1-97")
]

const removeMemberValidator=()=>[
    body("chatId","Please provide chat Id").notEmpty(),
    body("userId","Please provide User Id").notEmpty(),
]


const sendAttachmentsValidator=()=>[
    body("chatId","Please enter chat ID").notEmpty(),
    check("files").notEmpty().withMessage("Please Upload attachments").isArray({min:1,max:5}).withMessage("Attachments must be 1-5")
]

const chatIdValidator=()=>[
    param("id","Please enter Chat ID").notEmpty()
]

const renameGroupValidator=()=>[
    body("name","Please Provide name").notEmpty(),
    param("id","Please enter Chat ID").notEmpty()
]

const sendRequestValidator=()=>[
    body("userId","Please enter userId").notEmpty()
]



export {registerValidator,validateHandler,loginValidator,newGroupChatValidator,addMemberValidator,removeMemberValidator,sendAttachmentsValidator,chatIdValidator,renameGroupValidator,sendRequestValidator};