import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import DepartmentList from "./DepartmentList";

function App() {
  const [userDetails, setUserDetails] = useState(
    localStorage.getItem("userDetails") || null
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<FirstPage setUserDetails={setUserDetails} />}
          />
           <Route
            path="/department"
            element={<DepartmentList />}
          />
          <Route
            path="/second-page"
            element={userDetails ? <SecondPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
