import { Route, Routes } from "react-router-dom";
import Property from "../Pages/Property";
import Tenant from "../Pages/Tenant";
import Expense from "../Pages/Expense";
import Report from "../Pages/Report";
import Login from "../Pages/Login";
import VacantPropertiesList from "../Pages/VacantPropertiesList";
import SignUp from "../Pages/SignUp";
import Payments from "../Pages/Payments";
import Admin from "../Pages/Admin";
import SingleVacantProperty from "../Pages/SingleVacantProperty";



export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Property />} />
      <Route path="/tenants" element={<Tenant />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/vacant-properties" element={<VacantPropertiesList />} />
      <Route path="/reports" element={<Report />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/payment" element={< Payments/>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/vacant-properties/:id" element={<SingleVacantProperty/>} />
    </Routes>
  );
}
