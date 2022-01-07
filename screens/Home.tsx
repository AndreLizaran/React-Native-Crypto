// Modules
import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Types
import { CoinType } from '../requests/generalRequests';

// Contexts
import { GeneralContext } from '../states/GeneralState';

export default function Home() {
  //
  const { coins, loadingCoins } = useContext(GeneralContext);

  if (!loadingCoins) {
    return (
      <View style={{ flex: 1, padding: 20, paddingBottom: 0 }}>
        <CoinsContainer coins={coins} />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AntDesign name='loading1' size={24} color='white' />
      </View>
    );
  }
}

type CoinsContainerProps = {
  coins: CoinType[];
};

export function CoinsContainer({ coins }: CoinsContainerProps) {
  return (
    <View>
      <ScrollView>
        {coins.map((coin) => (
          <CoinRow coin={coin} key={coin.id} />
        ))}
      </ScrollView>
    </View>
  );
}

type CoinRowProps = {
  coin: CoinType;
};

function CoinRow({ coin }: CoinRowProps) {
  //
  const { name, image, current_price, price_change_24h, id } = coin;
  const { addFavoriteCoin, removeFromFavorites, favoriteCoins, uid } =
    useContext(GeneralContext);

  return (
    <TouchableOpacity
      onPress={() => {
        if (uid) {
          let mapedFavoriteCoins = favoriteCoins.map((coin) => {
            return coin.id;
          });
          mapedFavoriteCoins.includes(id)
            ? removeFromFavorites(coin)
            : addFavoriteCoin(coin);
        } else Alert.alert('You need to sign in first');
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={{ uri: image }}
            style={{ width: 30, height: 30, marginRight: 20 }}
          />
          <View>
            <Text style={{ color: 'white', fontSize: 18 }}>{name}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'gray', fontSize: 14 }}>
                ${current_price}
              </Text>
              <Text style={{ color: 'gray', fontSize: 14 }}> / </Text>
              <Text
                style={
                  price_change_24h > 0
                    ? { color: 'green', fontSize: 14 }
                    : { color: 'red', fontSize: 14 }
                }
              >
                {price_change_24h.toFixed(4)}
              </Text>
            </View>
          </View>
        </View>
        <AntDesign
          name={
            favoriteCoins.filter((e) => e.id === id).length ? 'star' : 'staro'
          }
          size={24}
          color='white'
        />
      </View>
    </TouchableOpacity>
  );
}
