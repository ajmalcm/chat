import moment from "moment";

const fileFormat=(url="")=>{
    const fileExt=url.split(".").pop();

    if(fileExt=="mp4"|| fileExt=="webm" || fileExt=="ogg")
        return 'video';
    if(fileExt=="mp3" || fileExt=="wav")
        return 'audio';
    if(fileExt=="png"||fileExt=="jpg"|| fileExt=="jpeg"||fileExt=="gif")
        return 'image'

    return 'file'
}

const transformImage=(url="",width=100)=>{
    // https://res.cloudinary.com/dzarpwrze/image/upload/dpr_auto/w_200/v1731519129/a94ecfd3-46ae-4bb1-bf5c-ea57cd46170f.jpg

    const newUrl=url.replace("upload/",`upload/dpr_auto/w_${width}/`)

    return newUrl;
};

const getLast7Days=()=>{

    const currentDate=moment();

    const last7Days=[];

    for(let i=0;i<7;i++)
        {

            const dayDate=currentDate.clone().subtract(i,"days");
            const dayName=dayDate.format("dddd");

            last7Days.unshift(dayName);

        }

        return last7Days;

}

const getorSaveFromStorage=({key,value,get})=>{
    if(get)
        return localStorage.getItem(key)?
            JSON.parse(localStorage.getItem(key)) : null;

    else
    localStorage.setItem(key,JSON.stringify(value))

}

export {fileFormat,transformImage,getLast7Days,getorSaveFromStorage};