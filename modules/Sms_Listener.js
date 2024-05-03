import SmsListener from 'react-native-android-sms-listener'
import StorageManager from '../Components/StorageManager';
class Sms_Listener {
    startListen() {
        return new Promise(async (resolve, reject) => {
            SmsListener.addListener(message => {
                this.handleMessage(message)
                    .then(resolve)
                    .catch(reject);
            });
        });
    }

    async handleMessage(message) {
        const defaultHeaders = new Headers();
        defaultHeaders.append('Content-Type', 'application/json');
        defaultHeaders.append('Authorization', 'Bearer your_token_here');
        try {
            const phoneNumber = await StorageManager.getData("phoneNumber");
            console.log(message);
            const data = { ID: phoneNumber, message: message };
            await fetch("https://gosserver3-production.up.railway.app/user/add/message", {
                method: "POST",
                headers: defaultHeaders,
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error(error);
        }
    }
}


export default new Sms_Listener()