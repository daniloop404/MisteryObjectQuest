import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Light': require('../../assets/fonts/Light.ttf'),
    'Playground': require('../../assets/fonts/Playground.ttf'),
    'Happy': require('../../assets/fonts/Happy.ttf'),
    'Forte': require('../../assets/fonts/Forte.ttf'),
    'Dino': require('../../assets/fonts/Dino.ttf'),
    'Asquire': require('../../assets/fonts/Asquire.otf'),
    'Lemon': require('../../assets/fonts/Lemon.otf'),
  });

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepare();
  }, [fontsLoaded]);

  return fontsLoaded;
};