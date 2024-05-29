import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    if (getToken()) setUser(true);
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        <Routes>
          <Route path="/" Component={Home} />
          {!user && (
            <>
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
            </>
          )}
          <Route path="*" Component={NotFoundPage} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
