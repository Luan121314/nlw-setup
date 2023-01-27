import { AuthProvider } from "./contexts/Auth";
import { Routes } from "./Routes";
import "./lib/dayjs";
import "./styles/global.css";

export function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}


export default App;
