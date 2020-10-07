import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import DeleteUser from '../screens/DeleteUser';
import UpdateUser from '../screens/UpdateUser';
import ViewAllUser from '../screens/ViewAllUser';
import ViewUser from '../screens/ViewUser';
import Register from '../screens/Register';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        options={{
          title: 'Register',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{
          title: 'Delete User',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="DeleteUser"
        component={DeleteUser}
      />
      <Stack.Screen
        options={{
          title: 'Update User',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="UpdateUser"
        component={UpdateUser}
      />
      <Stack.Screen
        options={{
          title: 'View All User',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="ViewAllUser"
        component={ViewAllUser}
      />
      <Stack.Screen
        options={{
          title: 'View User',
          headerStyle: {backgroundColor: '#f4511e'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        name="ViewUser"
        component={ViewUser}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
