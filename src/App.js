import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Reset from "./authentication/Reset";

import AdminPage from "./users/admin/AdminPage";
import SalesPerson from "./users/salesPerson/SalesPerson";
import Accountant from "./users/accountant/Accountant";
import AddEmployee from "./users/admin/AddEmployee/AddEmployee";
import FireEmployee from "./users/admin/FireEmployee/FireEmployee";
import SetShow from "./users/admin/shows/SetShow";
import DeleteShow from "./users/admin/shows/DeleteShow";
import Home from "./users/admin/Home";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin" element={<AdminPage />}>
            <Route index element={<Home />} />
            <Route path="AddEmployee" element={<AddEmployee />} />
            <Route path="FireEmployee" element={<FireEmployee />} />
            <Route path="SetShow" element={<SetShow />} />
            <Route path="DeleteShow" element={<DeleteShow />} />
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
