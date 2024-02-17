
import { BrowserRouter, Route, Routes }from "react-router-dom";
import Signin from "./Pages/Signin";
import Homepage from "./Pages/Homepage";
import Signup from "./Pages/Signup";
import { RecoilRoot } from "recoil";
import Overview from "./Pages/Overview";
import Dashboard from "./Pages/Dashboard";

const App = () => (
  <RecoilRoot>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/overview" element={<Overview/>}/>
  </Routes>
  </BrowserRouter>
  </RecoilRoot>
)

export default App;