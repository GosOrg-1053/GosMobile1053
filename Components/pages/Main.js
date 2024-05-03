import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import SvgComponent from '../../svgs/Logo';
import MyInput from '../MyInput';
import StorageManager from '../StorageManager';
export default function Main() {
  const [inputText, setInputText] = useState('');
  const [hotlineNumber, setHotlineNumber] = useState('')
  const isButtonEnabled = inputText.length >= 4;
  const defaultHeaders = new Headers();
  defaultHeaders.append('Content-Type', 'application/json');
  defaultHeaders.append('Authorization', 'Bearer your_token_here');
  const handleInputChange = (text) => {
    setInputText(text);
  };
  const handleContinuePress = () => {
    console.log('Продолжить');
  };
  const formatHotlineNumber = async () => {
    const storedHotline = await StorageManager.getData('hotline');
    const formattedNumber = storedHotline.replace(/[\s-]/g, '');
    await setHotlineNumber(formattedNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '8 $2 $3-$4-$5'))
  };
  useEffect(() => {
    //formatHotlineNumber()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <SvgComponent style={styles.svg} />
        <View>
          <Text style={styles.text}>Восстановление пароля</Text>
        </View>
        <View style={styles.maintext}>
          <Text style={styles.text2}>
            Контрольный вопрос:
          </Text>
        </View>
        <View style={styles.numberview}>
          <Text style={styles.numberview_text}>Ваш аккаунт заблокирован, свяжитесь с оператором {hotlineNumber}</Text>
        </View>
        <View>
          <MyInput onTextChange={handleInputChange} />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isButtonEnabled ? '#007AFF' : '#ccc' }]}
          onPress={handleContinuePress}
          disabled={!isButtonEnabled}
        >
          <Text style={styles.buttonText}>Продолжить</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c1d4f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    backgroundColor: '#fff',
    height: 500,
    width: 350,
    borderRadius: 15,
    alignItems: "center",
    flexDirection: "column",
  },
  svg: {
    paddingTop: 110
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: 'black'
  },
  text2: {
    fontSize: 18,
    color: 'black'
  },
  maintext: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 10,
    color: 'black'
  },
  numberview: {
    alignItems: "center",

  },
  numberview_text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    lineHeight: 25,
    color: 'black'
  },
  button: {
    width: 300,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
