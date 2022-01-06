// Modules
import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

// Types
import { CoinType } from '../requests/generalRequests';

// Contexts
import { GeneralContext } from '../states/GeneralState';

export default function Home() {
  //
  const { getCoins, coins } = useContext(GeneralContext);

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, paddingBottom: 0 }}>
      <CoinsContainer coins={coins} />
    </View>
  );
}

type CoinsContainerProps = {
  coins: CoinType[];
};

function CoinsContainer({ coins }: CoinsContainerProps) {
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

function CoinRow({
  coin: { name, image, current_price, price_change_24h },
}: CoinRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <View>
        <Text style={{ color: 'white', fontSize: 18 }}>{name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'gray', fontSize: 14 }}>${current_price}</Text>
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
      <Image source={{ uri: image }} style={{ width: 20, height: 20 }} />
    </View>
  );
}
