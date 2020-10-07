import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const db = openDatabase({name: 'UserDatabase.db'});

const Register = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  const handleSubmit = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <MyTextInput
                placeholder="Enter Name"
                value={userName}
                onChangeText={(val) => setUserName(val)}
                inputStyle={{padding: 10}}
              />
              <MyTextInput
                placeholder="Enter Contact Number"
                value={userContact}
                onChangeText={(val) => setUserContact(val)}
                inputStyle={{padding: 10}}
                maxLength={10}
                keyboardType="numeric"
              />
              <MyTextInput
                placeholder="Enter Address"
                value={userAddress}
                onChangeText={(val) => setUserAddress(val)}
                inputStyle={{padding: 10, textAlignVertical: 'top'}}
                maxLength={225}
                numberOfLines={5}
                multiline={true}
              />
              <MyButton title="Submit" onPress={() => handleSubmit()} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
