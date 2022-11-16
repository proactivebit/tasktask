import * as AppleAuthentication from "expo-apple-authentication"
import * as Crypto from "expo-crypto"
import { OAuthCredential, OAuthProvider } from "firebase/auth"
import { useState } from "react"

export function useAppleAuthentication() {
  const nonce = Math.random().toString(36).substring(2, 10)
  const [credential, setCredentials] = useState<OAuthCredential>()
  async function authWithApple() {
    console.log("login with apple")
    try {
      const hashedNonce = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, nonce)
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      })
      const { identityToken } = appleCredential
      const provider = new OAuthProvider("apple.com")
      const credential = provider.credential({
        idToken: identityToken!,
        rawNonce: nonce,
      })
      setCredentials(credential)
    } catch (error) {
      console.log(error)
    }
  }

  return [authWithApple, credential] as const
}
