import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google"
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/password";
import { DataModel } from "./_generated/dataModel";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      name: params.name as string,
      email: params.email as string,
    }
  }
})
 
export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    GitHub,
    Google,
    CustomPassword
  ],
});