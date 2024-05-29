import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { getToken } from "./api/storage";
import { useState } from "react";
import Transactions from "./pages/Transactions";

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
          <Route path="/login" Component={Login} />
          <Route path="/transactions" Component={Transactions} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
