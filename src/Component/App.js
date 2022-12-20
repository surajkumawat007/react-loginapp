import Dashboard from "./Dashboard/Dashboard";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              userstate && userstate.id ? (
                <Dashboard
                  setUserState={setUserState}
                  username={userstate.fname}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;