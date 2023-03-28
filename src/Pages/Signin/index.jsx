import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    GithubAuthProvider,
    GoogleAuthProvider,
    OAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth, db } from "../../Api/firebase";
import InputComponents from "../../Components/input.jsx";
import "./style.css";
import { message } from "antd";
import icon_Google from "../../img/signInUp_icon/LogoGoogle.svg";
import icon_Yahoo from "../../img/signInUp_icon/LogoYahoo.svg";

const Signin = () => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [Users, setUsers] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [value, setValue] = useState('')
    const [isValid, setIsValid] = useState('')
    const key = "updatable";

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };
    const navigate = useNavigate();
    // use firebase
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
    // console.log('Users:',Users);
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
                username: "",
                password: "",
            });
        }
       console.log(user);
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
    //yup
    const schema = yup
        .object({
            password: yup
                .string()
                .required("Please enter a password")
                .matches(/^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/, "Password without accents")
                .min(6, "Enter more than 6 characters"),
            username: yup
                .string()
                .required("Please enter a username")
                .matches(/^[a-zA-Z0-9._]+$/, "Username without accents")
                .min(6, "Enter more than 6 characters"),
        })
        .required();

    // react-hook-form
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({ mode: "all", resolver: yupResolver(schema) });
    const changeBoder = (e) => {
        setValue(e.target.value)
    };
    const changeBoder2 = (e) => {
        setIsValid(e.target.value)
    };
    const onSubmit = (values) => {
        const user = Users.find((item) => item.username === values.username);
        messageApi.open({
            key,
            type: "loading",
            content: "Loading...",
        });

        setTimeout(() => {
            if (!user) {
                messageApi.open({
                    key,
                    type: "warning",
                    content:
                        "Oops! Account not found please register or create a new account!",
                    duration: 1,
                });
            } else {
                if (user.password !== values.password) {
                    messageApi.open({
                        key,
                        type: "warning",
                        content: "Oops! Password please try again!",
                        duration: 1,
                    });
                } else {
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
                }
            }
        }, 1000);
    };

    return (
        <>
            {contextHolder}
            <div className="container-sign">
                <div className="nav-sign">
                    <h1 className="title">Sign in</h1>
                    <div className="nav-color">
                        <div className="cricle cricle-red"></div>
                        <div className="cricle cricle-yellow"></div>
                        <div className="cricle cricle-green"></div>
                    </div>
                </div>

                <h1 className="name-network">Social Network</h1>
                <form action="" onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="input-sign">
                        <InputComponents
                            children="User Name"
                            placeholder="Enter your username"
                            customStyle={errors.username ? "passError" : value !== '' ? 'pass success ' : 'pass'}
                            register={{
                                ...register("username"),
                            }}
                            handleChange={changeBoder}
                        />
                        <p className="errorText">{errors.username?.message}</p>
                        <InputComponents
                            children="Password"
                            placeholder="Enter your password"
                            customStyle={errors.password ? "passError" : isValid !== '' ? 'pass success ' : 'pass'}
                            classP="password"
                            handleChange={changeBoder2}
                            type={passwordShown ? "text" : "password"}
                            register={{
                                ...register("password"),
                            }}
                        />
                        <FontAwesomeIcon
                            onClick={togglePassword}
                            className="icon"
                            icon={passwordShown ? faEyeSlash : faEye}
                        />
                        <p className="errorText">{errors.password?.message}</p>
                    </div>
                    <div className="remember">
                        <Link to="/forgotpassword" className="remember-signIn">Forgot PassWord ?</Link>
                    </div>
                    <div className="btnLogin">
                        <button>Login</button>
                    </div>
                </form>
                <span className="line-continue"></span>

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
                    Don't have an Account? <Link to="/signup">Register</Link>
                </p>
            </div>
        </>
    );
};

export default Signin;
