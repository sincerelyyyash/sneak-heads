
import { BrowserRouter, Route, Routes }from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";
import Loader from "./Components/loader";




const Signin = lazy(()=>import("./Pages/Signin"));
const Homepage = lazy(()=> import("./Pages/Homepage"));
const Signup = lazy(()=> import("./Pages/Signup"));
const Overview = lazy(()=>import("./Pages/Overview"));
const Dashboard = lazy(()=>import( "./Pages/Dashboard"));
const Products  = lazy(()=>import("./Pages/Products"));
const Customer  = lazy(()=>import("./Pages/Customer"));
const Transaction  = lazy(()=>import("./Pages/Transaction"));
const BarChart = lazy(()=>import("./Pages/BarChart"))
const LineChart = lazy(()=>import("./Pages/LineChart"))
const PieChart = lazy(()=>import("./Pages/PieChart"))


const App = () => (
  <RecoilRoot>
  <BrowserRouter>
  <Suspense fallback={<Loader/>}>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>

    <Route path="/admin/dashboard" element={<Dashboard/>}/>
    <Route path="/admin/products" element={<Products/>}/>
    <Route path="/admin/customer" element={<Customer/>}/>
    <Route path="/admin/transaction" element={<Transaction/>}/>

    <Route path="/admin/bar" element={<BarChart/>}/>
    <Route path="/admin/pie" element={<LineChart/>}/>
    <Route path="/admin/line" element={<PieChart/>}/>
  </Routes>
  </Suspense>
  
  </BrowserRouter>
  </RecoilRoot>
)

export default App;