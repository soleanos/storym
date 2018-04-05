// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "AIzaSyDBpy2vxyXzfe-WIcZoKo881A4J9VUTNbs",
    authDomain: "storym-application.firebaseapp.com",
    databaseURL: "https://storym-application.firebaseio.com",
    projectId: "storym-application",
    storageBucket: "storym-application.appspot.com",
    messagingSenderId: "83464863131"
  }
};
