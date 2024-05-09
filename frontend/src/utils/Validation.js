import { isValidUsername } from "6pp"

export const userNameValidator=(u)=>{
    if(!isValidUsername(u))
      return {isValid:false,errorMessage:"Invalid userName"}
  
}