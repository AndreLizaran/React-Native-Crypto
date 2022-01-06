// Modules
import { createContext, ReactNode, useState } from 'react';

// Requests
import { CoinType, getCoinsRequest } from '../requests/generalRequests';

type initialStateType = {
  username: string;
  token: string;
  coins: CoinType[];
  favoriteCoins: string[];
};

const initialState: initialStateType = {
  username: '',
  token: '',
  coins: [],
  favoriteCoins: [],
};

export const GeneralContext = createContext({
  ...initialState,
  getCoins: function () {},
});

type GeneralStateProps = {
  children: ReactNode;
};

function GeneralState({ children }: GeneralStateProps) {
  //
  const [generalState, setGeneralState] = useState(initialState);

  async function getCoins() {
    const { data } = await getCoinsRequest();
    setGeneralState({ ...generalState, coins: data });
  }

  return (
    <GeneralContext.Provider
      value={{
        ...generalState,
        getCoins,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export default GeneralState;
