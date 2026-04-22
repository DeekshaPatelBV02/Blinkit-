import { Routes, Route } from "react-router-dom";
import AdminLogin from "./AdminLogin";
import AddProduct from "./AddProduct";
import AdminDashboard from "./AdminDashboard";
import ViewProducts from "./ViewProducts";
import ManageProducts from "./ManageProducts";
import EditProduct from "./EditProduct";
import EditUsers from "./EditUsers";
import ManageUsers from "./ManageUsers";
import ManageServices from "./ManageServices";
import CreateProduct from "./CreateProduct";
import AdminManageOrders from "./AdminManageOrders";
import ViewAnalytics from "./ViewAnalytics";

import DateChart from "./DateChart";
/*import MonthChart from "./MonthChart";
import YearChart from "./YearChart";
import PaymentCountChart from "./PaymentCountChart";
import SignupChart from "./SignupChart";
import OrdersChart from "./OrdersChart";*/

function AdminRoutes({ products, setProducts }) {
  return (
    <Routes>
      <Route path="admin-login" element={<AdminLogin />} />

      <Route
        path="add-product"
        element={
          <AddProduct
            products={products}
            setProducts={setProducts}
          />
        }
      />

      <Route
        path="view-product"
        element={<ViewProducts products={products} />}
      />

      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="manage-products" element={<ManageProducts />} />
      <Route path="edit-product/:id" element={<EditProduct />} />
      <Route path="edit-users/:id" element={<EditUsers />} />
      <Route path="manage-users" element={<ManageUsers />} />
      <Route path="manage-services" element={<ManageServices />} />
      <Route path="create-product" element={<CreateProduct />} />
      <Route path="orders" element={<AdminManageOrders />} />

    
      <Route path="view-analytics" element={<ViewAnalytics />}>
        <Route index element={<DateChart />} />
        <Route path="date" element={<DateChart />} />
      /*  <Route path="month" element={<MonthChart />} />
        <Route path="year" element={<YearChart />} />
        <Route path="payment-count" element={<PaymentCountChart />} />
        <Route path="signup" element={<SignupChart />} />
        <Route path="orders-chart" element={<OrdersChart />} />*/
      </Route>
    </Routes>
  );
}

export default AdminRoutes;