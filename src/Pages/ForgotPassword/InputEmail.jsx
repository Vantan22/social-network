import { yupResolver } from "@hookform/resolvers/yup";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth, db } from "../../Api/firebase";
import InputComponents from "../../Components/input";
import "./ForgotPass.css";

import emailjs from "@emailjs/browser";
import { message } from "antd";
import icon_Yahoo from "../../img/signInUp_icon/LogoYahoo.svg";
import icon_Google from "../../img/signInUp_icon/LogoGoogle.svg";

const InputEmail = () => {
  const [Users, setUsers] = useState([]);
  const [DocumentId, setDocumentId] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState('')
  const key = "updatable";
  const navigate = useNavigate();

  // get data firestore
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
  // Signin Google
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
        content: "đăng nhập thành công",
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
      content: "đăng nhập thành công",
      duration: 1,
      onClose: () => {
        navigate("/");
      },
    });
    localStorage.setItem("ID", user.id);
  };
  //yup
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Wrong email format")
        .required("Please enter your email"),

    })
    .required();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });

  const changeBoder2 = (e) => {
    setIsValid(e.target.value)
  };
  const onSubmit = async (values) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    // Start connect get data by email
    const usersCol = collection(db, "users");
    const q = query(usersCol, where("email", "==", values.email));
    const querySnapshot = await getDocs(q);
    // End connect get data by email
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        var templateParams = {
          nguoi_nhan: values.email,
          username: values.username,
          message: `http://localhost:3000/newpassword/${doc.id} `,
        };
        emailjs
          .send(
            "service_th4pa3s",
            "template_0kgdqsl",
            templateParams,
            "uxpapldyNwWZxzrZm"
          )
          .then(
            (result) => {
              setTimeout(() => {
                messageApi.open({
                  key,
                  type: "success",
                  content: "Send Mail Success",
                  duration: 1,
                  onClose: () => {
                    navigate("/login");
                  },
                });
              }, 1000);
            },
            (error) => {
              console.log(error.text);
            }
          );
      });
    } else {
      window.alert(" The email you just entered does not exist");
    }
  };
  return (

    <>
      {contextHolder}
      <div className="container-sign">
        <div className="nav-sign">
          <h1 className="title">forgot password </h1>
          <div className="nav-color">
            <div className="cricle cricle-red"></div>
            <div className="cricle cricle-yellow"></div>
            <div className="cricle cricle-green"></div>
          </div>
        </div>
        <h1 className="name-network">Social Network</h1>
        <p className="forgotPassword">Please enter your registered email</p>
        <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="input-forgot">
            <InputComponents
              children="Email"
              placeholder="Enter your email"
              customStyle={errors.email ? "passError" : isValid !== '' ? 'pass success ' : 'pass'}
              handleChange={changeBoder2}
              type="email"
              register={{
                ...register("email"),
              }}
            />
            <p className="errorText">{errors.email?.message}</p>
          </div>
          <div className="btnForgot btnForgotEmail">
            <button>SEND</button>
          </div>
          <span className="line-continue"></span>
        </form>
        <div className="continueWithForgot">
          <p>or continue with</p>
        </div>
        <div className="sign-with">
          <div onClick={onSigninGoogle} className="sign-google">
            <div className="logo-google">
              <img src={icon_Google} alt="" className="icon_Google" />
            </div>
            <p>Login with Google</p>
          </div>
          <div onClick={onSigninYahoo} className="sign-github">
            <div className="logo-github">
              <img src={icon_Yahoo} alt="" className="icon_Yahoo" />
            </div>
            <p>Login with Yahoo</p>
          </div>
        </div>
        <p className="LickNewPass">
          Already have an Account ?{" "}
          <Link className="linkLogin" to="/login">
            Login
          </Link>
        </p>
      </div></>
  );
};

export default InputEmail;
