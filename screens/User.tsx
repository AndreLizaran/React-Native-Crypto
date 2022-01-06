// Modules
import React, { Dispatch, SetStateAction, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import generalStyles from '../styles/general';

// Colors
import { backgroundColor } from '../utils/colors';

export default function User() {
  //
  const [form, setForm] = useState<'user' | 'sign-in' | 'sign-up'>('sign-up');

  if (form === 'sign-in') return <SignInForm setForm={setForm} />;
  else if (form === 'sign-up') return <SignUpForm setForm={setForm} />;
  else return <></>;
}

type FormsProps = {
  setForm: Dispatch<SetStateAction<'user' | 'sign-in' | 'sign-up'>>;
};

function SignInForm({ setForm }: FormsProps) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
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
        <TextInput style={generalStyles.generalInputs} />
        <Text style={generalStyles.generalLabels}>Password</Text>
        <TextInput style={generalStyles.generalInputs} />
        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: 'white',
            paddingVertical: 15,
            alignItems: 'center',
          }}
        >
          <Text
            style={{ color: backgroundColor, fontSize: 16, fontWeight: 'bold' }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setForm('sign-up')}>
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
    </View>
  );
}

function SignUpForm({ setForm }: FormsProps) {
  return (
    <View
      style={{
        flex: 1,
        padding: 20,
      }}
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
        <TextInput style={generalStyles.generalInputs} />
        <Text style={generalStyles.generalLabels}>Email</Text>
        <TextInput style={generalStyles.generalInputs} />
        <Text style={generalStyles.generalLabels}>Password</Text>
        <TextInput style={generalStyles.generalInputs} />
        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor: 'white',
            paddingVertical: 15,
            alignItems: 'center',
          }}
        >
          <Text
            style={{ color: backgroundColor, fontSize: 16, fontWeight: 'bold' }}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setForm('sign-in')}>
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
    </View>
  );
}
