import { authClient } from "../auth.ts";

export async function getUser() {
    const {data,error} = await authClient.getSession();
   if  (error) {
    throw error;
   }

   if(data?.user) {
    return data.user;
   }

}

export async function verifyEmail() {
    const user = await getUser();
    if (user) {
      return user.emailVerified;
    }
}