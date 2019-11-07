// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

declare let ENV_VARS: { [key: string]: string };

export const environment = {
  production: false,
  firebase: Object.assign(
    {
      FIREBASE_MAPS_API_KEY: '',
      FIREBASE_MAPS_AUTH_DOMAIN: '',
      FIREBASE_MAPS_DATABASE_URL: '',
      FIREBASE_MAPS_PROJECT_ID: '',
      FIREBASE_MAPS_STORAGE_BUCKET: '',
      FIREBASE_MAPS_MESSAGING_ID: '',
      FIREBASE_MAPS_APP_ID: ''
    },
    ENV_VARS
  )
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
