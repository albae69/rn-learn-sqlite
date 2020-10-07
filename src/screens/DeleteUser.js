import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';

const db = openDatabase({name: 'UserDatabase.db'});

const Deleteuser = ({navigation}) => {
  const [inputUserId, setInputUserId] = useState('');

  const deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM table_user WHERE user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User Deleted succesfully',
              [{text: 'Ok', onPress: () => navigation.navigate('Home')}],
              {cancelable: false},
            );
          } else {
            Alert.alert('Please insert a valid user id');
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
          inputStyle={{padding: 10}}
          value={inputUserId}
        />
        <MyButton title="Delete User" onPress={() => deleteUser()} />
      </View>
    </SafeAreaView>
  );
};

export default Deleteuser;

const styles = StyleSheet.create({});
