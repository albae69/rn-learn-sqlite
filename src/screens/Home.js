import React, {useEffect} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';

import MyButton from '../components/MyButton';
import MyText from '../components/MyText';

let db = openDatabase({name: 'UserDatabase.db'});

const Home = ({navigation}) => {
  useEffect(() => {
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        (tx, res) => {
          console.log('item', res.rows.length);
          if (res.rows.length === 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20),user_contact INT(10),user_address VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapBtn}>
        <View style={styles.btnContainer}>
          <MyText text="SQLITE Example" />
          <MyButton
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
          <MyButton
            title="Update"
            onPress={() => navigation.navigate('UpdateUser')}
          />
          <MyButton
            title="View"
            onPress={() => navigation.navigate('ViewUser')}
          />
          <MyButton
            title="ViewAll"
            onPress={() => navigation.navigate('ViewAllUser')}
          />
          <MyButton
            title="Delete"
            onPress={() => navigation.navigate('DeleteUser')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1},
  wrapBtn: {flex: 1, backgroundColor: 'white'},
  btnContainer: {flex: 1},
});
