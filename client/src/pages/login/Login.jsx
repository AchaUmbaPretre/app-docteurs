import React from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/featured/alertSlide";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:8800/api/user/login", values);
      dispatch(hideLoading())
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className="form-container ">
      <Form
        layout="vertical"
        onFinish={onfinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Connexion</h3>

        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/register" className="m-2">
          inscrivez-vous ici
        </Link>
        <button className="btn-primary" type="submit">
          Login
        </button>
      </Form>
    </div>
  );
};

export default Login;
