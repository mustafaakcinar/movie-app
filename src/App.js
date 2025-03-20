import "./App.css";
import AppRouter from "./router/AppRouter";
import AuthProvider from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MovieProvider from "./context/MovieProvider"

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MovieProvider>
          <AppRouter />
        </MovieProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
