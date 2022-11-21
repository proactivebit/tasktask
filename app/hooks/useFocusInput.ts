import { useEffect, useRef } from "react"
import { TextInput } from "react-native"

export const useFocusInput = () => {
  const inputRef = useRef<TextInput>()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return inputRef
}
