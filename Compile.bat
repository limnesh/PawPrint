ionic cordova build --prod --release android
xcopy  platforms\android\build\outputs\apk\release\android-release-unsigned.apk C:\MobileApp\modernshop\pawprint.apk  /Y /I
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore C:\National\MobileApp\pawprint.keystore C:\MobileApp\modernshop\pawprint.apk paw -storepass P@ssw0rd1!
