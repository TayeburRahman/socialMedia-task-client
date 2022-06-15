import {
  Route, Routes
} from "react-router-dom";
import "./App.css";
import AuthProvider from "./Firebase/Context/AuthProvider";
import LogIn from "./pages/Auth/LogIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
function App() {
  return (
    <div className="App">
         <AuthProvider>
            <Routes>  
            <Route path="/" element={ <PrivateRoute> <Home /> </PrivateRoute>  } />
            <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute>  } />
            <Route path="/sign-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} /> 
                    
             </Routes>
         </AuthProvider>
    </div>
  );
}

export default App;
