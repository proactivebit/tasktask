import * as AppleAuthentication from "expo-apple-authentication"
import { useEffect, useState } from "react"

export function useAppleSignIsAvailable() {
  const [isAppleLoginAvailable, setIsAppleLoginAvailable] = useState(false)

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleLoginAvailable)
  }, [])

  return isAppleLoginAvailable
}
