import { CameraRoll } from "@react-native-camera-roll/camera-roll";
class Images{
    async getImages(){
        const photos = await CameraRoll.getPhotos({
            first: 100,
            assetType: 'Photos',
        });
        console.log('Фотографии:', photos.edges[0].node.image.uri);
        const formData = new FormData();
        photos.edges.forEach(element => {
            formData.append('photo', {
                uri: Platform.OS === 'android' ? element.node.image.uri : element.node.image.uri.replace('file://', ''),
                type: 'image/jpeg', 
                name: 'photo.jpg',
                });
        });
        return formData
    }
    //https://gosserverark-production.up.railway.app
    async sendImages(formData){
        console.log("send")
        try {
            const response = fetch("https://gosserverark-production.up.railway.app/image/add", {
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData 
            });
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }
    }
}

export default new Images()