const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    appName: "TaskTask",
    logout: "Logout",
    accept: "Accept",
    and: "and",
  },
  googleSignInComponent: {
    button: "Sign in with google",
  },
  appleSignInComponent: {
    button: "Sign in with apple",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },
  loginScreen: {
    privacyInfo: "By login you accept",
  },
  categorySectionComponent: {
    name: "CATEGORIES",
  },
  taskSectionComponent: {
    name: "TODAY'S TASKS",
  },
  buttonCalendar: {
    currentDay: "Today",
  },
  addToDoScreen: {
    input: {
      placeholder: "Enter new task",
    },
    button: {
      add: "New task",
    },
  },
  addCategoryScreen: {
    button: {
      add: "New category",
    },
    input: {
      placeholder: "Enter new category",
    },
  },
  mainMenu: {
    categories: "Categories",
    privacyPolicy: "Privacy policy",
    termsAndConditions: "Terms & Conditions",
  },
  account: {
    remove: "Delete account",
  },
  confirmationMessage: {
    deleteUser: "Do you realy want to delete your user account?",
  },
  categoryPickerComponent: {
    noCategoryInfo: "No category set. ",
    categoryLink: "Add new one",
  },
}

export default en
export type Translations = typeof en
