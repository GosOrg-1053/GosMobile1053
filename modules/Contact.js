import Contacts from 'react-native-contacts';

class Contact {
    async loadContacts() {
        console.log("contacts")
        const result_contacts = await Contacts.getAll()
        return result_contacts;
    };
}

export default new Contact()