// Modules
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Colors
import { backgroundColor, normalRed } from '../utils/colors';

// Styles
import generalStyles from '../styles/general';
import { GeneralContext } from '../states/GeneralState';

export default function User() {
  //
  const { userScreen } = useContext(GeneralContext);
  if (userScreen === 'sign-in') return <SignInForm />;
  else if (userScreen === 'sign-up') return <SignUpForm />;
  else return <UserForm />;
}

function SignInForm() {
  //
  const { signInUser, changeUserScreen, loadingSignIn } =
    useContext(GeneralContext);

  const [signInValues, setSignInValues] = useState({
    email: 'test1@gmail.com',
    password: 'testing',
  });
  const { email, password } = signInValues;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={generalStyles.generalTitle}>Sign In</Text>
        <View
          style={{
            borderRadius: 5,
            borderColor: 'white',
            borderWidth: 2,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text style={generalStyles.generalLabels}>Email</Text>
          <TextInput
            style={generalStyles.generalInputs}
            value={email}
            onChangeText={(text) =>
              setSignInValues({ ...signInValues, email: text })
            }
            keyboardType='email-address'
            autoCapitalize='none'
            autoCompleteType='email'
            editable={!loadingSignIn}
          />
          <Text style={generalStyles.generalLabels}>Password</Text>
          <TextInput
            style={generalStyles.generalInputs}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) =>
              setSignInValues({ ...signInValues, password: text })
            }
            editable={!loadingSignIn}
          />
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: 'white',
              paddingVertical: 15,
              alignItems: 'center',
            }}
            onPress={() => signInUser(email, password)}
          >
            <Text
              style={{
                color: backgroundColor,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {!loadingSignIn ? (
                'Sign in'
              ) : (
                <AntDesign name='loading1' size={24} color={backgroundColor} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => changeUserScreen('sign-up')}
          disabled={loadingSignIn}
        >
          <Text
            style={{
              textDecorationLine: 'underline',
              color: 'white',
              fontSize: 16,
            }}
          >
            Don't you already have an account? Sign up!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

function SignUpForm() {
  //
  const { createUser, changeUserScreen, loadingSignUp } =
    useContext(GeneralContext);

  const [signUpValues, setSignUpValues] = useState({
    username: 'Test 1',
    email: 'test1@gmail.com',
    password: 'testing',
  });

  const { username, email, password } = signUpValues;

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={generalStyles.generalTitle}>Sign Up</Text>
        <View
          style={{
            borderRadius: 5,
            borderColor: 'white',
            borderWidth: 2,
            padding: 20,
            marginBottom: 20,
          }}
        >
          <Text style={generalStyles.generalLabels}>Name</Text>
          <TextInput
            style={generalStyles.generalInputs}
            value={username}
            onChangeText={(text) =>
              setSignUpValues({ ...signUpValues, username: text })
            }
            editable={!loadingSignUp}
          />
          <Text style={generalStyles.generalLabels}>Email</Text>
          <TextInput
            style={generalStyles.generalInputs}
            value={email}
            onChangeText={(text) =>
              setSignUpValues({ ...signUpValues, email: text })
            }
            keyboardType='email-address'
            autoCapitalize='none'
            autoCompleteType='email'
            editable={!loadingSignUp}
          />
          <Text style={generalStyles.generalLabels}>Password</Text>
          <TextInput
            style={generalStyles.generalInputs}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) =>
              setSignUpValues({ ...signUpValues, password: text })
            }
            editable={!loadingSignUp}
          />
          <TouchableOpacity
            style={{
              borderRadius: 5,
              backgroundColor: 'white',
              paddingVertical: 15,
              alignItems: 'center',
            }}
            onPress={() => createUser(username, email, password)}
          >
            <Text
              style={{
                color: backgroundColor,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              {!loadingSignUp ? (
                'Sign up'
              ) : (
                <AntDesign name='loading1' size={24} color={backgroundColor} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => changeUserScreen('sign-in')}
          disabled={loadingSignUp}
        >
          <Text
            style={{
              textDecorationLine: 'underline',
              color: 'white',
              fontSize: 16,
            }}
          >
            Do you already have an account? Sign in!
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

function UserForm() {
  //
  const { signOutUser, displayName, favoriteCoins } =
    useContext(GeneralContext);

  return (
    <View style={{ padding: 20, flex: 1, alignItems: 'center' }}>
      <TouchableOpacity
        style={{
          height: 60,
          width: 60,
          borderRadius: 100,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text
          style={{ color: backgroundColor, fontSize: 18, fontWeight: 'bold' }}
        >
          {displayName.charAt(0)}
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          color: 'white',
          fontSize: 18,
          marginBottom: 10,
          fontWeight: 'bold',
        }}
      >
        {displayName}
      </Text>
      <Text style={{ color: 'white', fontSize: 16, marginBottom: 20 }}>
        Saved coins: {favoriteCoins.length}
      </Text>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          borderWidth: 2,
          borderColor: normalRed,
        }}
        onPress={() => signOutUser()}
      >
        <Text style={{ color: normalRed, fontSize: 16, fontWeight: 'bold' }}>
          Sign out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
