import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { StackNavigationProp } from '@react-navigation/stack';

type PreferencesScreenRouteProp = RouteProp<RootStackParamList, 'Preferences'>;

interface Props {
  route: PreferencesScreenRouteProp;
}

const PreferencesScreen: React.FC<Props> = ({ route }) => {
  const [hobbies, setHobbies] = useState('');
  const [favoriteGenres, setFavoriteGenres] = useState('');
  const [favoriteMusic, setFavoriteMusic] = useState('');
  const [favoriteColor, setFavoriteColor] = useState('');
  const [favoriteActivities, setFavoriteActivities] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNext = () => {
    navigation.navigate('ProfileImage', {
      userId: route.params.userId,
      realName: route.params.realName,
      age: route.params.age,
      gender: route.params.gender,
      hobbies,
      favoriteGenres,
      favoriteMusic,
      favoriteColor,
      favoriteActivities,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Hobbies"
        value={hobbies}
        onChangeText={setHobbies}
      />
      <TextInput
        style={styles.input}
        placeholder="Géneros de Películas/Libros Favoritos"
        value={favoriteGenres}
        onChangeText={setFavoriteGenres}
      />
      <TextInput
        style={styles.input}
        placeholder="Música Favorita"
        value={favoriteMusic}
        onChangeText={setFavoriteMusic}
      />
      <TextInput
        style={styles.input}
        placeholder="Color Favorito"
        value={favoriteColor}
        onChangeText={setFavoriteColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Actividades Favoritas"
        value={favoriteActivities}
        onChangeText={setFavoriteActivities}
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

export default PreferencesScreen;