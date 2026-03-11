import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SweetDetails from "./pages/SweetDetails";
import AddSweet from "./pages/AddSweet";
import EditSweet from "./pages/EditSweet";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Nav from "./Components/Nav";
import Footer from "./Components/Footer";
import PrivateRoute from "./Components/PrivateRoute";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sweet/:id" element={<SweetDetails />} />
          <Route path="/add" element={<AddSweet />} />
          <Route path="/edit/:id" element={<EditSweet />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
