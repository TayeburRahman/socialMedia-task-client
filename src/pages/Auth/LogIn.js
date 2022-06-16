import { default as React } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Firebase/useAuth";
import "./Auth.css";



const LogIn = () => {
  return (
    <div className="Auth">
      <div className="a-left">
        <img src='https://i.ibb.co/vkg8Hyq/unnamed.png' alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <Input />
    </div>
  );
};

function Input() {
  const { loginUser, user, authError } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();
 
  const handelLogin = (e) => {
    loginUser(e.email, e.password, location, navigate);
 
  };


 

  return (
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit(handelLogin)} >
        <h3>Log In</h3>

        <div> 
          <input type="email" className="infoInput" placeholder="Email" {...register("email",{ required: true})} />
        </div>

        <div>
         
         <input type="password" className="infoInput" placeholder="Password" {...register("password",{ required: true})} />
        </div> 
        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account <Link to="/sign-up" > Sign up</Link>
          </span>
          <input className="button infoButton" value="Login" type="submit" />  
        </div>
      </form>
    </div>
  );
}

export default LogIn;
