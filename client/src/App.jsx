
import { BrowserRouter, Route, Routes }from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";
import Loader from "./Components/Loader";


const Homepage = lazy(()=> import("./Pages/Homepage"));
const Signin = lazy(()=>import("./Pages/Signin"));
const Signup = lazy(()=> import("./Pages/Signup"));
const ProductsPage = lazy(()=> import("./Pages/ProductsPage"));
const ProductDetailsPage = lazy(()=> import("./Pages/ProductDetailsPage"));
const Cart = lazy(()=> import("./Pages/Cart"));
const CheckoutPage = lazy(()=> import("./Pages/CheckoutPage"));
const OrdersPage = lazy(()=> import("./Pages/OrdersPage"));
const ProfilePage = lazy(()=> import("./Pages/UserProfilePage"));



const App = () => (
  <RecoilRoot>
  <BrowserRouter>
  <Suspense fallback={<Loader/>}>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/products" element={<ProductsPage/>}/>
    <Route path="products/:productId" element={<ProductDetailsPage/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<CheckoutPage/>}/>
    <Route path="/orders" element={<OrdersPage/>}/>
    <Route path="/profile" element={<ProfilePage/>}/>
  </Routes>
  </Suspense>
  </BrowserRouter>
  </RecoilRoot>
)

export default App;