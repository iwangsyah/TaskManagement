# TaskManagement App

### Images App

<img width="472" alt="Screen Shot 2022-12-26 at 13 36 58" src="https://user-images.githubusercontent.com/31063335/209512905-3e298420-e179-4e17-80cb-aabeb6925a08.png">
<img width="472" alt="Screen Shot 2022-12-26 at 13 50 06" src="https://user-images.githubusercontent.com/31063335/209514046-bdaef322-70dd-47e8-918a-f387c356f858.png">
<img width="472" alt="Screen Shot 2022-12-26 at 13 44 39" src="https://user-images.githubusercontent.com/31063335/209513550-ebb5b9c6-1b43-4850-bd69-be101c68cf27.png">


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
