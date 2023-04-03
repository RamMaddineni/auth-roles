import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Reset from "./authentication/Reset";

import AdminPage from "./users/admin/AdminPage";
import SalesPerson from "./users/salesPerson/SalesPerson";
import Accountant from "./users/accountant/Accountant";
import AddEmployee from "./users/admin/AddEmployee/AddEmployee";
import FireEmployee from "./users/admin/FireEmployee/FireEmployee";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin" element={<AdminPage />}>
            {/* <Route index element={<AddEmployee />} /> */}
            <Route path="AddEmployee" element={<AddEmployee />} />
            <Route path="FireEmployee" element={<FireEmployee />} />
          </Route>
          <Route path="salesPerson" element={<SalesPerson />} />
          <Route path="accountant" element={<Accountant />} />
          <Route path="reset" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
