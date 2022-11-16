import "dotenv/config"

export default ({ config }) => {
  return {
    ...config,
    android: {
      ...config.android,
      config: {
        googleSignIn: {
          apiKey: process.env.ANDROID_API_KEY,
          certificateHash: process.env.ANDROID_CERTIFICATE_HASH,
        },
      },
      intentFilters: [
        {
          action: "VIEW",
          category: ["BROWSABLE", "DEFAULT"],
          data: {
            scheme: process.env.ANDROID_CLIENT_ID_REVERSED,
            path: "/oaouth2redirect",
          },
        },
      ],
    },
    ios: {
      ...config.ios,
      config: {
        googleSignIn: {
          reservedClientId: process.env.IOS_CLIENT_SCHEME,
        },
      },
    },
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENTID_ID,
      firebaseWebApi: process.env.FIREBASE_WEB_API,
      iosKey: process.env.IOS_CLIENT_ID,
      androidKey: process.env.ANDROID_CLIENT_ID,
      androidKeyRedirect: process.env.ANDROID_CLIENT_ID_REDIRECT,
    },
  }
}
