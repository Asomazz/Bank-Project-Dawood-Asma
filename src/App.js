import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import { getToken } from "./api/storage";
import UserContext from "./context/UserContext";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import UsersPage from "./pages/UsersPage";
import Transactions from "./pages/Transactions";
import About from "./pages/About";
import Navbar from "./components/Navbar";

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
          <Route path="/about" Component={About} />

          {user && (
            <>
              <Route path="/accountPage" Component={AccountPage} />
              <Route path="/profilePage" Component={ProfilePage} />
              <Route path="/usersPage" Component={UsersPage} />
              <Route path="/transactions" Component={Transactions} />
            </>
          )}
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
