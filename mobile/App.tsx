import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import { StatusBar } from 'react-native';
import { Home } from './src/screens/Home';
import { Loading } from './src/components/Loading';
import "./src/lib/dayjs"

export default function App() {

 const [fontsLoaded]=  useFonts({
  Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold
})
    
if(!fontsLoaded){
  return <Loading/>
}


  return (
    <>
      <Home/>
      <StatusBar barStyle="light-content" backgroundColor='transparent' translucent/>
    </>
  );
}

