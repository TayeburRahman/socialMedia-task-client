import {
  UilScenery
} from "@iconscout/react-unicons";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Firebase/useAuth";
import Logo from "../../img/logo.png";
import "./Auth.css";




const SignUp = () => {
    
  
  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>ZKC Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      <Input/>
    </div>
  );
};
function Input() {
  const navigate = useNavigate() 
  const {registerUser}=useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [imageSelected, setImageSelected] = useState();
  const [photo, setImage] = useState('');  
  const imageRef = useRef(); 
  console.log(photo)
  
  // Image uploader
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]; 
      setImageSelected(img); 
    }
  };

  //   Register Button
    const onSubmit = (e) => { 
      if (e.password !== e.password2) {
        alert("Your password did not match!"); 
        return;
      } 

      // Image uploader 2nd
      const formData = new FormData()
      formData.append("file", imageSelected)
      formData.append("upload_preset", "mcem6nrq")
   
      const postImage = async () => {
        try {
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/socialm/image/upload",
            formData 
          )
          setImage(response.data.url)
        } catch (error) {
          console.error(error)
        }
      } 
      postImage()

      // Register Firebase
       if(photo){
        registerUser(e.password, e.name, e.username, e.email, photo, navigate);  
       }
    };
    
    return (
        <div className="a-right"> 
             <form className="infoForm authForm" onSubmit={handleSubmit(onSubmit)}>
               <h3>Sign up</h3>
               <div> 
                  <input placeholder="Full Name *" className="infoInput" {...register("name",{ required: true})} />
                </div>
       
               <div>  
               <input placeholder="User Name *" className="infoInput" {...register("username", { required: true})} />
               </div>

               <div>  
               <input placeholder="Your Email *" className="infoInput" {...register("email", { required: true})} />
               </div>
       
               <div>
                  <input type="password" placeholder="Password *" className="infoInput" {...register("password",{ required: true})} />
                  <input type="password" placeholder="Re-password" className="infoInput" {...register("password2",{ required: true})} />
               </div> 
              
                <div>
                    <div
                     className="option"
                     style={{ color: "#938eff", width:"auto", border:".6px solid" }}
                     onClick={() => imageRef.current.click()}
                   >
                    <UilScenery />
                    {imageSelected? "Upload Success" : 'Upload Profile *'}
                   </div>
                </div>
               <div>
                   <span style={{fontSize: '12px'}}>Already have an account. <Link to="/sign-in">Login!</Link></span>
               </div>
               <input className="button infoButton" value="Sign Up"  type="submit" /> 
               <div style={{ display: "none" }}>
                 <input
                   type="file"
                   name="myImage"
                   ref={imageRef}
                   onChange={onImageChange}
                 />
               </div>
             </form>
          </div>
    );
  }
 

export default SignUp;
