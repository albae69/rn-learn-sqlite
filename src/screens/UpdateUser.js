import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';

const db = openDatabase({name: 'UserDatabase.db'});

const UpdateUser = ({navigation}) => {
  const [inputUserId, setInputUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');

  const updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
  };

  const searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          let a = results.rows.length;
          if (a > 0) {
            let res = results.rows.item(0);
            updateAllStates(res.user_name, res.user_contact, res.user_address);
          } else {
            Alert.alert('No User Found');
            updateAllStates('', '', '');
          }
        },
      );
    });
  };

  const updateUser = () => {
    console.log(inputUserId, userName, userContact, userAddress);
    if (!inputUserId) {
      Alert.alert('Please Fill User Id');
      return;
    }
    if (!userName) {
      Alert.alert('Please fill name');
      return;
    }
    if (!userContact) {
      Alert.alert('Please fill contact number');
      return;
    }
    if (!userAddress) {
      Alert.alert('Please fill adress');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?,user_contact=?,user_address=? where user_id=?',
        [userName, userContact, userAddress, inputUserId],
        (tx, results) => {
          console.log('results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Succes',
              'User Updated Successfuly',
              [
                {
                  text: 'ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('update failed');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1, justifyContent: 'space-between'}}>
        <MyTextInput
          placeholder="Enter user ID"
          inputStyle={{padding: 10}}
          onChangeText={(val) => setInputUserId(val)}
          value={inputUserId}
        />
        <MyButton title="Search User" onPress={() => searchUser()} />
        <MyTextInput
          placeholder="Enter Name"
          value={userName}
          inputStyle={{padding: 10}}
          onChangeText={(val) => setUserName(val)}
        />
        <MyTextInput
          placeholder="Enter Contact"
          inputStyle={{textAlignVertical: 'top', padding: 10}}
          value={userContact.toString()}
          onChangeText={(val) => setUserContact(val)}
          keyboardType="numeric"
          maxLength={225}
          multiline={true}
          numberOfLines={5}
        />
        <MyTextInput
          value={userAddress}
          placeholder="Enter Address"
          onChangeText={(val) => setUserAddress(val)}
          maxLength={225}
          numberOfLines={5}
          multiline={true}
          inputStyle={{textAlignVertical: 'top', padding: 10}}
        />
        <MyButton title="Update User" onPress={() => updateUser()} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UpdateUser;

const styles = StyleSheet.create({});
