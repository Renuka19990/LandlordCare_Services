import { Route, Routes } from "react-router-dom";
import Property from "../Pages/Property";
import Tenant from "../Pages/Tenant";
import Expense from "../Pages/Expense";
import Report from "../Pages/Report";
import Login from "../Pages/Login";
import VacantPropertiesList from "../Pages/VacantPropertiesList";
import SignUp from "../Pages/SignUp";

import Admin from "../Pages/Admin";
import SingleVacantProperty from "../Pages/SingleVacantProperty";
import SingleProperty from "../Pages/SingleProperty";

import Payment from "../Pages/SingleProperty";
import Home from "../Pages/Home";
import PrivateRoute from "./PrivateRoute";



export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Property />} />
      <Route path="/properties/:id" element={<PrivateRoute><SingleProperty/></PrivateRoute>} />

      <Route path="/tenants" element={<Tenant />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/vacant-properties" element={<VacantPropertiesList />} />
      <Route path="/reports" element={<Report />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/payment" element={<Payment/>} />
      <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      <Route path="/vacant-properties/:id" element={<SingleVacantProperty/>} />
    </Routes>
  );
}
