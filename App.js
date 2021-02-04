import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import axios from 'axios';

const fetchRandomData = () => {
  return axios.get('https://randomuser.me/api')
    .then(data => {
      return data;
    })
    .catch(err => {
      console.error(err);
    });
}

const getFullUserName = (userInfo) => {
  const {name: {title, first, last}} = userInfo;
  return `${title} ${first} ${last}`;
}

const App = () => {
  const [randomUserDataJSON, setRandomUserDataJSON] = useState('');
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    fetchRandomData().then(randomData => {
      setRandomUserDataJSON(JSON.stringify(randomData, null, 2) || 'No user data found.');
      setUserInfos(randomData.data.results);
    })
  }, []);

  return (
    <View style={styles.container}>
      {
        userInfos.map((userInfo, idx) => (
          <View style={styles.container} key={idx}>
            <Image
              style={styles.avatar}
              source={{
                uri: userInfo.picture.thumbnail
              }}
            />
            <Text style={styles.name}>{ getFullUserName(userInfo) }</Text>
            <Button
              style={{width: 200}}
              title='Random User'
              onPress={
                () => fetchRandomData().then(randomData => {
                  setUserInfos(randomData.data.results);
                })
              }
            />
            {/* <Text>{ randomUserDataJSON }</Text> */}
          </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;