import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import ImageIcon from "@mui/icons-material/Image";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import toast from "react-hot-toast";
import { useSendAttachMentsMutation } from "../../redux/api/api";

export const FileMenu = ({ anchorE1,chatId }) => {
  const dispatch = useDispatch();
  const { isFileMenu } = useSelector((state) => state.misc);

  const [sendAttachments]=useSendAttachMentsMutation();

  const imageRef=useRef(null);
  const audioRef=useRef(null);
  const videoRef=useRef(null);
  const fileRef=useRef(null);

  const selectRef=(ref)=>{
    ref.current?.click();
  }


  const handleFileClose = () => {
    dispatch(setIsFileMenu(false));
  };

  const fileChangeHandler =async (e,key) => {
    const files=Array.from(e.target.files);

    if(files.length<=0)
      return;

    if(files.length>5){
      return toast.error(`you can only send 5 ${key} at a time`)
    }

    dispatch(setUploadingLoader(true));

    const toastId=toast.loading(`sending ${key}...`);
    handleFileClose();

    try{
      const myForm=new FormData();

      myForm.append("chatId",chatId);
      files.forEach((file)=>myForm.append("files",file));


      const res=await sendAttachments(myForm);

      if(res.data)
        toast.success(`${key} sent successfully.`,{id:toastId});
      else
      toast.error(`failed to send ${key}`, {id:toastId})

    }catch(error)
    {
      toast.error(error,{id:toastId})
    }finally{
      dispatch(setUploadingLoader(false))
    }



  };

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} onClose={handleFileClose}>
      <div style={{ width: "10rem" }}>
        <MenuList>
          <MenuItem onClick={()=>selectRef(imageRef)}>
            <Tooltip title="Image">
              <ImageIcon />
            </Tooltip>
            <ListItemText sx={{ marginLeft: "0.5rem" }}>Image</ListItemText>
            <input
              type="file"
              multiple
              accept="image/png, image/jpeg, image/gif"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Images")}
              ref={imageRef}
            />
          </MenuItem>

          <MenuItem onClick={()=>selectRef(audioRef)}>
            <Tooltip title="Audio">
              <AudioFileIcon />
            </Tooltip>
            <ListItemText sx={{ marginLeft: "0.5rem" }}>Audio</ListItemText>
            <input
              type="file"
              multiple
              accept="audio/mpeg, audio/wav, audio/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "Audios")}
              ref={audioRef}
            />
          </MenuItem>

          <MenuItem onClick={()=>selectRef(videoRef)}>
            <Tooltip title="Video">
              <VideoFileIcon />
            </Tooltip>
            <ListItemText sx={{ marginLeft: "0.5rem" }}>Video</ListItemText>
            <input
              type="file"
              multiple
              accept="video/mp4, video/webm, video/ogg"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "ImaFilesges")}
              ref={videoRef}
            />
          </MenuItem>

          <MenuItem onClick={()=>selectRef(fileRef)}>
            <Tooltip title="File">
              <UploadFileIcon />
            </Tooltip>
            <ListItemText sx={{ marginLeft: "0.5rem" }}>File</ListItemText>
            <input
              type="file"
              multiple
              accept="*"
              style={{ display: "none" }}
              onChange={(e) => fileChangeHandler(e, "ImaFilesges")}
              ref={fileRef}
            />
          </MenuItem>
        </MenuList>
      </div>
    </Menu>
  );
};
