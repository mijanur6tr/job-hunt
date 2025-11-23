// import { signIn,signOut } from "@/auth";
import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "next-auth/react";

export const login = async () => {
    await nextAuthSignIn("google",{redirectTo:"/"});
}

export const logout = async () => {
    await nextAuthSignOut({redirectTo:"/auth/signin"});
}