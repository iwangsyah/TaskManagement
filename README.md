# TaskManagement App

### Images App

<img width="472" alt="Screen Shot 2022-12-26 at 13 24 16" src="https://user-images.githubusercontent.com/31063335/209511780-b9a25b64-2804-4dc4-b334-b49954a760ea.png">
<img width="472" alt="Screen Shot 2022-12-26 at 13 24 26" src="https://user-images.githubusercontent.com/31063335/209511811-fd21d0a3-7a1d-4b51-8c5b-b4de1e48b93b.png">
<img width="472" alt="Screen Shot 2022-12-26 at 13 24 32" src="https://user-images.githubusercontent.com/31063335/209511835-222555d5-70c0-4e1a-ac13-a7adadab50d9.png">


### Run project in development

1. Clone the repo
   ```sh
   git clone https://github.com/iwangsyah/TaskManagement.git
   ```
2. Install dependencies
   ```sh
   npm install
   ```
   or
   
   ```sh
   yarn install
   ```
3. Install Podfile for iOS
   ```sh
   npx pod-install
   ```
    or
  
   ```sh
   cd ios && pod install && cd ..
   ```
4. Start the app
  - Run on Android: `npx react-native run-android` (or `yarn android`)  (or `npm run android`).

  - Run on iOS: `npx react-native run-ios` (or `yarn ios`) (or `npm run ios`).


# Generating the APK
Run the following in a terminal:

```
$ cd android
$ ./gradlew assembleRelease
```

The generated APK can be found under:
```
android/app/build/outputs/apk/release/app-release.apk
```
