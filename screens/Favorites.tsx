import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { GeneralContext } from '../states/GeneralState';
import { CoinsContainer } from './Home';

export default function Favorites() {
  //
  const { uid } = useContext(GeneralContext);

  if (!uid) {
    return <NoUser />;
  } else {
    return <FavoritesList />;
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

function FavoritesList() {
  //
  const { favoriteCoins } = useContext(GeneralContext);

  return (
    <View style={{ flex: 1, padding: 20, paddingBottom: 0 }}>
      <CoinsContainer coins={favoriteCoins} />
    </View>
  );
}
