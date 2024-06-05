import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { firebase } from '../constants/firebaseConfig';

type ProfileImageScreenRouteProp = RouteProp<RootStackParamList, 'ProfileImage'>;

interface Props {
  route: ProfileImageScreenRouteProp;
}

const ProfileImageScreen: React.FC<Props> = ({ route }) => {
  const [image, setImage] = useState<string | null>(null);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase.storage().ref().child(`profileImages/${route.params.userId}`);
      await ref.put(blob);

      const imageUrl = await ref.getDownloadURL();
      await firebase.database().ref(`usuarios/${route.params.userId}`).update({
        ...route.params,
        profileImage: imageUrl,
      });
    }

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 20,
  },
});

export default ProfileImageScreen;