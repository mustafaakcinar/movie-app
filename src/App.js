import "./App.css";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <ToastContainer/>
    </div>
  );
}

export default App;
