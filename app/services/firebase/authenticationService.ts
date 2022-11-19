import {
  AuthCredential,
  signInWithCredential,
  signOut,
  updateEmail,
  updateProfile,
} from "@firebase/auth"
import { auth } from "../../config/firebase"

export class AuthenticationService {
  public async loginWithCredential(credential: AuthCredential, data?: any) {
    console.log("Logging in with credential", credential, data)

    const { user } = await signInWithCredential(auth, credential)

    console.log("Signed in with credential. Updating profile details...")

    if (data?.email && !user.email) {
      await updateEmail(user, data.email)
    }

    if (data?.displayName && !user.displayName) {
      await updateProfile(user, { displayName: data.displayName })
    }

    return user
  }

  public async logout() {
    await signOut(auth)
  }
}

export const authenticationService = new AuthenticationService()
