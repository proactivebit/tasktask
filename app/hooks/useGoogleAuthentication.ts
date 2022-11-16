import { GoogleAuthProvider } from "@firebase/auth"
import { makeRedirectUri } from "expo-auth-session"
import { useIdTokenAuthRequest } from "expo-auth-session/providers/google"
import Constants from "expo-constants"
import { maybeCompleteAuthSession } from "expo-web-browser"
import { OAuthCredential } from "firebase/auth"
import { useEffect, useState } from "react"
import { Platform } from "react-native"

maybeCompleteAuthSession()

function login(id_token: string, accessToken: string) {
  console.log("Signing in with Google...", { id_token })
  try {
    const credential = GoogleAuthProvider.credential(id_token, accessToken)
    return credential
  } catch (error) {
    throw error
  }
}

export function useGoogleAuthentication() {
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    iosClientId: Constants.manifest?.extra?.iosKey,
    androidClientId: Constants.manifest?.extra?.androidKey,
    clientId: Constants.manifest?.extra?.firebaseWebApi,
    redirectUri: makeRedirectUri({
      useProxy: true,
      native: Platform.select({
        android: Constants.manifest?.extra?.androidKeyRedirect,
        default: undefined,
      }),
    }),
  })
  const [credntial, setCredentials] = useState<OAuthCredential>()

  useEffect(() => {
    if (response?.type === "success") {
      const credential = login(response.params.id_token, response.params.accessToken)
      setCredentials(credential)
    }
  }, [response])

  async function prompt() {
    await promptAsync()
  }

  return [prompt, credntial] as const
}
