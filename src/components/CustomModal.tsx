import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Pressable } from 'react-native';

interface CustomModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
  onTimeout?: () => void;
  timeoutDuration?: number; // Tiempo en milisegundos
}

const CustomModal: React.FC<CustomModalProps> = ({ 
  visible, 
  message, 
  onClose, 
  onTimeout, 
  timeoutDuration = 5000 // Valor por defecto 5 segundos
}) => {

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible && onTimeout) {
      timer = setTimeout(() => {
        onTimeout();
      }, timeoutDuration);
    }
    return () => clearTimeout(timer);
  }, [visible, onTimeout, timeoutDuration]);

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

const styles = StyleSheet.create({
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
    width: '60%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontFamily: 'Dino',
  },
  modalButton: {
    width: '60%',
  },
});

export default CustomModal;