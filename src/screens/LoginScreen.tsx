import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ImageBackground, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext'; // Importa el contexto
import CustomModal from '../components/CustomModal';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const { login } = useAuth(); // Accede a la función login del contexto
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setModalMessage("Por favor, complete todos los campos.");
      setModalVisible(true);
      return;
    }

    const result = await loginUser(email, password);

    if (result?.success) {
      // Inicia sesión usando el contexto
      login(); 

      // Puedes mostrar un mensaje de éxito si lo deseas
      setModalMessage("Ingreso exitoso.");
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        // No necesitas navegar manualmente aquí, 
        // el contexto actualizará la navegación automáticamente
      }, 1000);
    } else {
      setModalMessage(result?.error || 'Ocurrió un error desconocido');
      setModalVisible(true);
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/backgrounds/backgroundHome.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.innerContainer}>
        <TextInput
          style={[styles.input, styles.shadow]} 
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.shadow]} 
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleLogin}>
          <Text style={[styles.buttonText, { fontFamily: 'Dino' }]}>Ingresar</Text> 
        </TouchableOpacity>
      </View>

      <CustomModal 
        visible={modalVisible} 
        message={modalMessage} 
        onClose={() => setModalVisible(false)} 
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    padding: 16,
    borderRadius: 20,
    width: '80%', 
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    fontFamily: 'Light', 
  },
  button: {
    backgroundColor: '#C44E4E',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    elevation: 12, 
    shadowColor: '#FFFFFF', 
    shadowOffset: { width: 0, height: 8 }, 
    shadowOpacity: 1, 
    shadowRadius: 4, 
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Dino', 
  },
  shadow: { 
    elevation: 12,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Dino',
  },
  modalButton: {
    width: '60%',
  }
});

export default LoginScreen;