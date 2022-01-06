// Modules
import axios from 'axios';

export type CoinType = {
  id: string;
  name: string;
  current_price: number;
  image: string;
  price_change_24h: number;
};

type GetCoinsRequestType = CoinType[];

export function getCoinsRequest() {
  return axios.get<GetCoinsRequestType>(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );
}
