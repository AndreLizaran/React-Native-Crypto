// Modules
import { createContext, ReactNode, useState } from 'react';

// Requests
import { CoinType, getCoinsRequest } from '../requests/generalRequests';

type initialStateType = {
  username: string;
  token: string;
  coins: CoinType[];
  favoriteCoins: string[];
  loadingIcons: boolean;
};

const initialState: initialStateType = {
  username: '',
  token: '',
  coins: [],
  favoriteCoins: [],
  loadingIcons: true,
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
    try {
      setGeneralState({ ...generalState, loadingIcons: true });
      const { data } = await getCoinsRequest();
      setGeneralState({ ...generalState, coins: data });
      setGeneralState({ ...generalState, loadingIcons: false });
    } catch {
      setGeneralState({ ...generalState, loadingIcons: false });
    }
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
