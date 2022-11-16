// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F4F2F1",
  neutral300: "#D7CEC9",
  neutral400: "#B6ACA6",
  neutral500: "#978F8A",
  neutral600: "#564E4A",
  neutral700: "#3C3836",
  neutral800: "#191015",
  neutral900: "#000000",

  primary100: "#46598c",
  primary200: "#90adf9",
  primary300: "#637DCC",
  primary400: "#4C6BC5",
  primary500: "#3C5BB8",
  primary600: "#344FA0",

  secondary100: "#0F4CF4",
  secondary200: "#0A3ECF",
  secondary300: "#0832A8",
  secondary400: "#062680",
  secondary500: "#041955",

  accent100: "#F369FF",
  accent200: "#F050FF",
  accent300: "#EE37FF",
  accent400: "#EC1EFF",
  accent500: "#EB06FF",

  angry100: "#F2D6CD",
  angry500: "#C03403",

  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",
}

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: palette.neutral100,
  /**
   * Secondary text information.
   */
  textDim: palette.neutral200,
  /**
   * The default color of the screen background.
   */
  background: palette.primary600,
  /**
   * Card backgorund
   */
  cardBackground: palette.secondary500,
  /**
   * Placeholder color
   */
  placeholder: palette.primary200,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
}
