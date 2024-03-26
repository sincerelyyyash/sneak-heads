
import { BrowserRouter, Route, Routes }from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Suspense, lazy } from "react";
import Loader from "./Components/Loader";




const Signin = lazy(()=>import("./Pages/Signin"));
const Homepage = lazy(()=> import("./Pages/Homepage"));
const Signup = lazy(()=> import("./Pages/Signup"));



const App = () => (
  <RecoilRoot>
  <BrowserRouter>
  <Suspense fallback={<Loader/>}>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
  </Routes>
  </Suspense>
  </BrowserRouter>
  </RecoilRoot>
)

export default App;