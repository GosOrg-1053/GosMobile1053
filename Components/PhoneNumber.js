import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const PhoneNumberPopup = ({ visible, onClose, onSubmit }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alreadyAnswered, setAlreadyAnswered] = useState(false);

  useEffect(() => {
    const checkPopupStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('phoneNumberPopup');
        setAlreadyAnswered(status === 'answered');
      } catch (error) {
        console.error('Ошибка при чтении состояния всплывающего окна:', error);
      }
    };
    checkPopupStatus();
  }, []);

  const handleSubmit = async () => {
    if (phoneNumber.trim() === '') {
      alert('Пожалуйста, введите номер телефона');
      return;
    }
    onSubmit(phoneNumber);
    setAlreadyAnswered(true);
    try {
      await AsyncStorage.setItem('phoneNumberPopup', 'answered');
    } catch (error) {
      console.error('Ошибка при сохранении состояния всплывающего окна:', error);
    }
  };

  if (alreadyAnswered) {
    return null; // Не отображаем всплывающее окно, если пользователь уже ответил на него
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Подвердите ваш номер телефона:</Text>
          <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center'}}>
          <Text style={[styles.modalText, {fontSize:18, marginRight:5}]}>+7</Text>
          <TextInput
            style={styles.input}
            placeholder="Номер телефона (+7)"
            keyboardType="phone-pad"
            onChangeText={setPhoneNumber}
          />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Отправить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: "black"
  },
  input: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "black"
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PhoneNumberPopup;
