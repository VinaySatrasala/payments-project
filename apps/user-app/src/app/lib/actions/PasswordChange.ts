"use server"
import prisma from "@repo/db/client";
export const passwordChange = async ({oldPassword,newPassword}:{oldPassword:string,newPassword:string}) =>{
    // write your logic here
    
    return {message:"Password Changed Successfully"}
}