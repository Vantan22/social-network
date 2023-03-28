import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputComponents from "../input";
import { useForm } from "react-hook-form";
import { useFormData } from "../../Hooks/UseFormdata";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { db, auth } from "../../Api/firebase";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { message } from "antd";

const Step3 = ({ formStep, prevFormStep }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setconfirlPasswordShown] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState('')
  const key = "updatable";
  const onPrev = () => {
    prevFormStep();
  };
  const togglePassword = (isPas) => {
    isPas === true
      ? setPasswordShown(!passwordShown)
      : setconfirlPasswordShown(!confirmPasswordShown);
  };
  const navigate = useNavigate();
  // use react hooks form
  const { data } = useFormData();
  const schema = yup
    .object({
      password: yup
        .string()
        .required("Please enter a password")
        .matches(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/, "Password without accents")
        .min(6, "Enter more than 6 characters")
        .trim(),
      ConfirmPassword: yup
        .string()
        .required("Please enter a confirm password")
        .matches(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/, "Password without accents")
        .min(6, "Enter more than 6 characters")
        .trim(),
    })
    .required();
  const changeBoder = (e) => {
    setValue(e.target.value)
  };
  const changeBoder2 = (e) => {
    setIsValid(e.target.value)
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({ mode: "all", resolver: yupResolver(schema) });
  const onSubmit = (values) => {
    messageApi.open({
      key,
      type: "loading",
      content: "Loading...",
    });
    setTimeout(() => {
      if (values.password === values.ConfirmPassword) {
        createUserWithEmailAndPassword(auth, data.email, values.password)
          .then((userCredential) => {
            sendEmailVerification(userCredential.user);
            // alert("Vui lòng check email");
            const usersCol = collection(db, "users");
            addDoc(usersCol, {
              avatarUrl:
                "https://firebasestorage.googleapis.com/v0/b/social-network-68ab1.appspot.com/o/kisspng-computer-icons-login-person-user-avatar-log-5b14db41a61fb6.0478299015280935056805.jpg?alt=media&token=42762e58-3805-41dc-8fea-99ce2067c6a6",
              email: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
              fullname: `${data.lastname} ${data.firstname}`,
              username: data.username,
              password: values.password,
            });
            messageApi.open({
              key,
              type: "success",
              content:
                "Yeah! You have successfully registered. Please check your email",
              duration: 1,
              onClose: () => {
                navigate("/login");
              },
            });
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use")
              messageApi.open({
                key,
                type: "warning",
                content:
                  "Oops! You have error registered. Email already in use",
                duration: 1,
                onClose: () => {
                  onPrev();
                },
              });
          });
      } else {
        messageApi.open({
          key,
          type: "warning",
          content:
            "Oops! Looks like the two passwords are not the same, try again!",
          duration: 1,
        });
      }
    }, 1000);
  };

  return (
    <>
    {contextHolder}
       <form
      className={formStep === 2 ? "showForm" : "hideForm"}
      onSubmit={handleSubmit(onSubmit)}
      action=""
      method="post"
    >
      <div className="input-sign">
        <InputComponents
          children="Password"
            placeholder="Enter your password"
            customStyle={errors.password ? "passError" : isValid !== '' ? 'pass success ' : 'pass'}
            handleChange={changeBoder2}
            type={passwordShown ? "text" : "password"}
          register={{
            ...register("password"),
          }}
        />
        <FontAwesomeIcon
          onClick={() => togglePassword(true)}
          className="icon"
          icon={passwordShown ? faEyeSlash : faEye}
        />
        <p className="errorText">{errors.password?.message}</p>

        <InputComponents
          children="Confirm Password"
            placeholder="Enter your confirm password"
            customStyle={errors.ConfirmPassword ? "passError" : value !== '' ? 'pass success ' : 'pass'}
            handleChange={changeBoder}
            type={confirmPasswordShown ? "text" : "password"}
          register={{
            ...register("ConfirmPassword"),
          }}
        />
        <FontAwesomeIcon
          onClick={() => togglePassword(false)}
          className="icon"
          icon={confirmPasswordShown ? faEyeSlash : faEye}
        />
        <p className="errorText">{errors.ConfirmPassword?.message}</p>
      </div>
      <div className="btnSignup">
        <button onClick={onPrev} type="button">
          PREV
        </button>
        <button>REGISTER</button>
      </div>
      <span className="line-continue"></span>
    </form>
    </>
  );
};

export default Step3;
