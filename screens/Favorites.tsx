import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { GeneralContext } from '../states/GeneralState';

export default function Favorites() {
  //
  const { username } = useContext(GeneralContext);

  if (!username) {
    return <NoUser />;
  } else {
    return <></>;
  }
}

function NoUser() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          width: '100%',
          padding: 15,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: 'white',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
          You need to sign in first!
        </Text>
      </View>
    </View>
  );
}
