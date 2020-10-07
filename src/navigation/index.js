import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import Splash from '../screens/Splash';
import HomeStack from './HomeStack';

const Navigation = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    let splashTimeOut = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(splashTimeOut);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Splash />
      ) : (
        <NavigationContainer>{<HomeStack />}</NavigationContainer>
      )}
    </>
  );
};

export default Navigation;
