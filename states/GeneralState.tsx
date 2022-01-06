// Modules
import { createContext, ReactNode, useEffect, useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';

// Requests
import { CoinType, getCoinsRequest } from '../requests/generalRequests';
import app from '../utils/firebase';

type initialStateType = {
  coins: CoinType[];
  favoriteCoins: string[];
  loadingCoins: boolean;
  loadingSignUp: boolean;
  loadingSignIn: boolean;
  userScreen: 'sign-up' | 'sign-in' | 'user';
};

const initialState: initialStateType = {
  coins: [],
  favoriteCoins: [],
  loadingCoins: false,
  loadingSignUp: false,
  loadingSignIn: false,
  userScreen: 'sign-in',
};

const initialStateUser = {
  uid: '',
  displayName: '',
};

export const GeneralContext = createContext({
  ...initialState,
  ...initialStateUser,
  getCoins: function (user: any) {},
  createUser: function (username: string, email: string, password: string) {},
  signInUser: function (email: string, password: string) {},
  changeUserScreen: function (screen: 'sign-in' | 'sign-up' | 'user') {},
  signOutUser: function () {},
  addFavoriteCoin: function (idCoin: string) {},
  removeFromFavorites: function (idCoin: string) {},
});

type GeneralStateProps = {
  children: ReactNode;
};

const auth = getAuth(app);
const db = getFirestore(app);

function GeneralState({ children }: GeneralStateProps) {
  //
  const [generalState, setGeneralState] = useState(initialState);
  const [userState, setUserState] = useState(initialStateUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState({ uid: user.uid, displayName: user.displayName || '' });
        getCoins(user.uid);
      } else {
        setUserState({
          uid: '',
          displayName: '',
        });
        getCoins('');
      }
    });
  }, []);

  async function getCoins(user: string) {
    try {
      setGeneralState({ ...generalState, loadingCoins: true });
      const { data } = await getCoinsRequest();
      if (user) {
        let coins: string[] = [];
        const querySnapshot = await getDocs(collection(db, user));
        querySnapshot.forEach((doc) => {
          coins = doc.data().idCoins;
        });
        setGeneralState({
          ...generalState,
          coins: data,
          loadingCoins: false,
          favoriteCoins: coins,
          userScreen: 'user',
        });
      } else {
        setGeneralState({
          ...generalState,
          coins: data,
          loadingCoins: false,
        });
      }
    } catch {
      setGeneralState({ ...generalState, loadingCoins: false });
    }
  }

  async function createUser(username: string, email: string, password: string) {
    try {
      setGeneralState({ ...generalState, loadingSignUp: true });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      setGeneralState({
        ...generalState,
        loadingSignUp: false,
        userScreen: 'user',
      });
      setUserState({
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName || '',
      });
    } catch (error: any) {
      console.log(error);
      setGeneralState({ ...generalState, loadingSignUp: false });
    }
  }

  async function signInUser(email: string, password: string) {
    try {
      setGeneralState({ ...generalState, loadingSignIn: true });
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setGeneralState({
        ...generalState,
        loadingSignIn: false,
        userScreen: 'user',
      });
      setUserState({
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName || '',
      });
    } catch (error: any) {
      console.log(error);
      setGeneralState({ ...generalState, loadingSignIn: false });
    }
  }

  function signOutUser() {
    signOut(auth);
  }

  function changeUserScreen(screen: 'sign-in' | 'sign-up' | 'user') {
    setGeneralState({ ...generalState, userScreen: screen });
  }

  async function addFavoriteCoin(idCoin: string) {
    try {
      let newFavoriteCoins = [...generalState.favoriteCoins, idCoin];
      await setDoc(doc(db, userState.uid, 'favorite-coins'), {
        idCoins: newFavoriteCoins,
      });
      setGeneralState({
        ...generalState,
        favoriteCoins: [...generalState.favoriteCoins, idCoin],
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async function removeFromFavorites(idCoin: string) {
    try {
      let newFavoriteCoins = generalState.favoriteCoins.filter((coin) => {
        if (coin !== idCoin) return coin;
      });
      await setDoc(doc(db, userState.uid, 'favorite-coins'), {
        idCoins: newFavoriteCoins,
      });
      setGeneralState({ ...generalState, favoriteCoins: newFavoriteCoins });
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <GeneralContext.Provider
      value={{
        ...generalState,
        ...userState,
        getCoins,
        createUser,
        signInUser,
        changeUserScreen,
        signOutUser,
        addFavoriteCoin,
        removeFromFavorites,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export default GeneralState;
