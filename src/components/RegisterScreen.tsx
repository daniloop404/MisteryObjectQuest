import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ImageBackground, Modal, Pressable } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import { registerUser } from '../services/authService';

const CustomModal: React.FC<{ visible: boolean; message: string; onClose: () => void; onTimeout: () => void }> = ({ visible, message, onClose, onTimeout }) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        onTimeout();
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [visible, onTimeout]);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={[styles.modalText, { fontFamily: 'Light' }]}>{message}</Text>
          <Pressable style={[styles.button, styles.modalButton]} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleRegister = async () => {
    if (!email || !username || !password || !confirmPassword) {
      setModalMessage("Por favor, complete todos los campos.");
      setModalVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden.");
      setModalVisible(true);
      return;
    }

    const result = await registerUser(email, password, username);

    if (result?.success) {
      setModalMessage("Usuario registrado exitosamente.");
      setModalVisible(true);
    } else {
      setModalMessage(result?.error || 'An unknown error occurred');
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    if (modalMessage === "Usuario registrado exitosamente.") {
      navigation.navigate('Login');
    }
  };

  const handleTimeout = () => {
    if (modalMessage === "Usuario registrado exitosamente.") {
      setModalVisible(false);
      navigation.navigate('Login');
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
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={[styles.input, styles.shadow]}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={[styles.input, styles.shadow]}
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, styles.shadow]} onPress={handleRegister}>
          <Text style={[styles.buttonText, { fontFamily: 'Dino' }]}>Registrar</Text> 
        </TouchableOpacity>
      </View>

      <CustomModal 
        visible={modalVisible} 
        message={modalMessage} 
        onClose={closeModal} 
        onTimeout={handleTimeout}
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
    fontFamily: 'Dino', // Asegúrate de que el texto del modal tenga la misma fuente
  },
  modalButton: {
    width: '60%',
  }
});

export default RegisterScreen;