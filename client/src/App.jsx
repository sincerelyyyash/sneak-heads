
import { BrowserRouter, Route, Routes }from "react-router-dom";
import Signin from "./Pages/Signin";
import Homepage from "./Pages/Homepage";
import Signup from "./Pages/Signup";

const App = () => (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/signin" element={<Signin/>}/>
    <Route path="/signup" element={<Signup/>}/>
  </Routes>
  </BrowserRouter>
)

export default App;