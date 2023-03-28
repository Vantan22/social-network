
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signinup from "./Layouts/Signin/Signinup";
import HomePage from "./Layouts/homepage/HomePage";
import Newsfeed from './Pages/Newsfeed/Newsfeed'
import Message from './Pages/Message'
import Noti from './Pages/Noti';
import Signin from './Pages/Signin/index';
import Signup from './Pages/signup/Signup';
import PrivateRouter from "./Components/CheckLogin/checklogin";
import InputEmail from "./Pages/ForgotPassword/InputEmail";
import InputPassword from "./Pages/ForgotPassword/InputPassword";
import PersonalInformation from "./Pages/personal-information";


function App() {

  return (
    <Routes>
      <Route path="/login" element={<Signinup />}>
        <Route index element={<Signin />} />
      </Route>
      <Route path="/signup" element={<Signinup />}>
        <Route index element={<Signup />} />
      </Route>
      <Route path="/forgotpassword" element={<Signinup />}>
        <Route index element={<InputEmail />} />
      </Route>
      <Route path="/newpassword/:DocumentId" element={<Signinup />}>
        <Route index element={<InputPassword />} />
      </Route>
      <Route path="/" element={<PrivateRouter ><HomePage /></PrivateRouter>}>
        <Route index element={<Newsfeed />} />
        <Route path=":noti" element={<Noti />} />
        <Route path=":search"  />
        <Route path=":message" element={<Message />} />
        <Route path="/personalinformation" element={<PersonalInformation />} />
      </Route>
    </Routes>
  );
}

export default App;
