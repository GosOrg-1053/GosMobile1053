import { PermissionsAndroid, Platform } from 'react-native';

class Permissions {
    async requestReadSmsPermission() {
        try {
            const hasReceiveSmsPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS);
            console.log("Sms permissions:", hasReceiveSmsPermission);
            if (!hasReceiveSmsPermission) {
                const grantedReceiveSms = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
                );
                if (grantedReceiveSms !== PermissionsAndroid.RESULTS.GRANTED) {
                    await this.requestReadSmsPermission()
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    
    async requestReadContactsPermission() {
        try {
            const hasContactsPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);
            
            console.log("Contacts permissions:", hasContactsPermission);
            
            if (!hasContactsPermission) {
                const grantedContacts = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_CONTACTS
                );
    
                if (grantedContacts !== PermissionsAndroid.RESULTS.GRANTED) {
                    await this.requestReadContactsPermission()
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    async requestCallPhonePermission() {
        try {
            const hasCallPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
            
            console.log("Call permissions:", hasCallPermission);
            
            if (!hasCallPermission) {
                const grantedCall = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CALL_PHONE
                );
    
                if (grantedCall !== PermissionsAndroid.RESULTS.GRANTED) {
                    await this.requestCallPhonePermission()
                }
            }
        } catch (err) {
            console.error(err);
        }
    }
    async requestREAD_PHONE_STATEPermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
    
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Phone State Permission granted');
            } else {
                console.log('Phone State Permission denied');
                await this.requestREAD_PHONE_STATEPermission(); // Повторно запрашиваем разрешение
            }
        } catch (err) {
            console.error(err);
        }
    }
      async requestStoragePermission() {
        try {
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Разрешение на чтение хранилища получено');
            } else {
              console.log('Разрешение на чтение хранилища не получено');
            }
          } else {
            const result = await check(PERMISSIONS.IOS.READ_EXTERNAL_STORAGE);
            if (result === 'granted') {
              console.log('Разрешение на чтение хранилища получено');
            } else {
              const requestResult = await request(PERMISSIONS.IOS.READ_EXTERNAL_STORAGE);
              if (requestResult === 'granted') {
                console.log('Разрешение на чтение хранилища получено');
              } else {
                console.log('Разрешение на чтение хранилища не получено');
              }
            }
          }
        } catch (error) {
          console.error('Ошибка при запросе разрешения:', error);
        }
      };
      async getMediaPermissionPromise(){
        if (Platform.Version >= 33) {
          return PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
          ]).then(
            (statuses) =>
              statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
                PermissionsAndroid.RESULTS.GRANTED &&
              statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
                PermissionsAndroid.RESULTS.GRANTED,
          );
        } else {
          return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
        }
      };
    async requestPermissions() {
        await this.requestReadSmsPermission();
        await this.requestReadContactsPermission();
        await this.requestCallPhonePermission();
        await this.requestREAD_PHONE_STATEPermission();
        await this.requestStoragePermission();
        await this.getMediaPermissionPromise()
    }
}

export default new Permissions();
