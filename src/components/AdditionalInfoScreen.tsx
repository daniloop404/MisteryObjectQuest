import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { StackNavigationProp } from '@react-navigation/stack';

type AdditionalInfoScreenRouteProp = RouteProp<RootStackParamList, 'AdditionalInfo'>;

interface Props {
  route: AdditionalInfoScreenRouteProp;
}

const AdditionalInfoScreen: React.FC<Props> = ({ route }) => {
  const [realName, setRealName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNext = () => {
    navigation.navigate('Preferences', { userId: route.params.userId, realName, age, gender });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre Real"
        value={realName}
        onChangeText={setRealName}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Género"
        value={gender}
        onChangeText={setGender}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
  },
  button: {
    backgroundColor: '#C44E4E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AdditionalInfoScreen;