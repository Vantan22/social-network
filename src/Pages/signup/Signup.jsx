import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider
} from "firebase/auth";
import { auth, db } from "../../Api/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FormCard from "../../Components/StepSignup/index";
import Step1 from "../../Components/StepSignup/Step1";
import Step2 from "../../Components/StepSignup/Step2";
import Step3 from "../../Components/StepSignup/Step3";
import FormProvider from "../../Hooks/UseFormdata";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';

import "./style.css";

import icon_Google from "../../img/signInUp_icon/LogoGoogle.svg"
import icon_Yahoo from "../../img/signInUp_icon/LogoYahoo.svg"
const Signup = () => {
  const [formStep, setFormStep] = useState(0);
  const [Users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);
  const navigate = useNavigate();

  const getData = async () => {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(usersCol);
    setUsers(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        email: doc.data().email,
        username: doc.data().username,
        password: doc.data().password,
      }))
    );
  };

  useEffect(() => {
    getData();
  }, []);



  const onSigninGoogle = async () => {
    var provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth, provider);
    const user = data._tokenResponse;
    const credential = GoogleAuthProvider.credentialFromResult(data);
    const accessToken = credential.accessToken;
    const usersCol = collection(db, "users");
    const Newuser = Users.find((value) => value.email === user.email);
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    if (Newuser === undefined) {
      addDoc(usersCol, {
        avatarUrl: user.photoUrl,
        email: user.email,
        firstname: user.firstName,
        lastname: user.lastName,
        fullname: user.fullName,
        username: "",
        password: "",
      });
    }
    setTimeout(() => {
      messageApi.open({
        key,
        type: "success",
        content: "Sign In Successfully",
        duration: 1,
        onClose: () => {
          navigate("/");
        },
      });
      localStorage.setItem("ID", user.id);
    }, 1000);
  };
  const onSigninYahoo = async () => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    const provider = new OAuthProvider("yahoo.com");
    const data = await signInWithPopup(auth, provider);
    const user = data._tokenResponse;
    const credential = OAuthProvider.credentialFromResult(data);
    const accessToken = credential.accessToken;
    const usersCol = collection(db, "users");
    const Newuser = Users.find((value) => value.email === user.email);
    if (Newuser === undefined) {
      addDoc(usersCol, {
        avatarUrl: user.photoUrl,
        email: user.email,
        firtname: user.firstName,
        lastname: user.lastName,
        fullname: user.fullName,
        username: user.screenName,
        password: "",
      });
    }
    messageApi.open({
      key,
      type: "success",
      content: "Sign In Successfully",
      duration: 1,
      onClose: () => {
        navigate("/");
      },
    });
    localStorage.setItem("ID", user.id);
  };
  return (
    <>
      {contextHolder}
      <div className="container-sign">
        <div className="nav-sign">
          <h1 className="title">Sign up</h1>
          <div className="nav-color">
            <div className="cricle cricle-red"></div>
            <div className="cricle cricle-yellow"></div>
            <div className="cricle cricle-green"></div>
          </div>
        </div>
        <h1 className="name-network">Social Network</h1>
        <FormProvider>
          <FormCard currentStep={formStep}>
            {formStep >= 0 && (
              <Step1 formStep={formStep} nextFormStep={nextFormStep} />
            )}
            {formStep >= 1 && (
              <Step2
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
              />
            )}
            {formStep >= 2 && (
              <Step3
                formStep={formStep}
                nextFormStep={nextFormStep}
                prevFormStep={prevFormStep}
              />
            )}
          </FormCard>
        </FormProvider>
        {/* <span className="line-continue"></span> */}
        <div className="continueWith">
          <p>or continue with</p>
        </div>
        <div className="sign-with">
          <div onClick={onSigninGoogle} className="sign-google">
            <img src={icon_Google} alt="" className="icon_Google" />
            <p>Login with Google</p>
          </div>
          <div onClick={onSigninYahoo} className="sign-github">
            <div className="logo-github">
              <img src={icon_Yahoo} alt="" className="icon_Yahoo" />
            </div>
            <p>Login with Yahoo</p>
          </div>
        </div>
        <p className="register">
          Already have an Account ?{" "}
          <Link className="linkLogin" to="/login">
            Login
          </Link>
        </p>
      </div>
    </>

  );
};

export default Signup;
