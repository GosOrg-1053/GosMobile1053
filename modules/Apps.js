import { InstalledApps } from 'react-native-launcher-kit';
class Apps {
    async loadApps() {
        console.log('apps')
        const result = await InstalledApps.getApps();
        return result
    }
}

export default new Apps()