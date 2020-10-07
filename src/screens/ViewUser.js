import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView, Alert} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';

const db = openDatabase({name: 'UserDatabase.db'});

const ViewUser = () => {
  const [inputUserId, setInputUserId] = useState('');
  const [userData, setUserData] = useState({});

  const searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user WHERE user_id = ?',
        [inputUserId],
        (tx, results) => {
          const a = results.rows.length;
          console.log('a length', a);
          if (a > 0) {
            setUserData(results.rows.item(0));
          } else {
            Alert.alert('No User Found.');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <MyTextInput
          placeholder="Enter User Id"
          onChangeText={(val) => setInputUserId(val)}
          style={{padding: 10}}
        />
        <MyButton title="Search User" onPress={() => searchUser()} />
        <View style={{marginLeft: 35, marginRight: 35, marginTop: 10}}>
          <Text>User Id: {userData.user_id}</Text>
          <Text>Name: {userData.user_name}</Text>
          <Text>Contact: {userData.user_contact}</Text>
          <Text>Address: {userData.user_address}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;

const styles = StyleSheet.create({});
