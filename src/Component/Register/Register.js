import React, { useEffect, useState } from "react";
import styleCss from "../StyleCss.css";
import registerCss from "./RegisterCss.css";
import TextField from '@mui/material/TextField';
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import Typography from '@mui/material/Typography';
const Register = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };

  const validateForm = (values) => {
    console.log(values);
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.fname) {
      error.fname = "First Name is required";
    }
    if (!values.lname) {
      error.lname = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.cpassword) {
      error.cpassword = "Confirm Password is required";
    } else if (values.cpassword !== values.password) {
      error.cpassword = "Confirm password and password should be same";
    }
    return error;
  };
  const signupHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   setIsSubmit(true);
    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:8080/register/", user).then((res) => {
        alert(res.data.message);
        navigate("/login", { replace: true });
      });
    }
  }, [formErrors]);
  return (
   
  <Container component="main" maxWidth="xl" disableGutters>
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <SensorOccupiedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create Account
      </Typography>
      <Box noValidate sx={{
        width: 350  
       
      }}
      
      >
         
  <TextField
              id="fname"
              type="text"
              autoComplete="off"
              name="fname"
              value={user.fname}
              onChange={changeHandler}
              placeholder="First Name"
              fullWidth
            />


<p className={styleCss.error}>{formErrors.fname}</p>
<TextField
              id="lname"
              type="text"
              autoComplete="off"
              name="lname"
              value={user.lname}
              onChange={changeHandler}
              placeholder="Last Name"
              fullWidth
            />

    
          <p className={styleCss.error}>{formErrors.lname}</p>

 <TextField
              id="email"
              type="email"
              autoComplete="off"
              name="email"
              value={user.email}
              onChange={changeHandler}
              placeholder="Email Address"
              required
              fullWidth
            />


          
          <p className={styleCss.error}>{formErrors.email}</p>
          <TextField
              id="password"
              type="password"
              autoComplete="off"
              name="password"
              value={user.password}
              onChange={changeHandler}
              placeholder="Password"
              required
              fullWidth
            />
          <p className={styleCss.error}>{formErrors.password}</p>


          <TextField
              id="cpassword"
              type="password"
              autoComplete="off"
              name="cpassword"
              value={user.cpassword}
              onChange={changeHandler}
              placeholder="Confirm Password"
              required
              fullWidth
            />

        
          <p className={styleCss.error}>{formErrors.cpassword}</p>

          <Button
              className={styleCss.button_common}
              variant="contained"
              color="primary"
              size="large"
            
              onClick={signupHandler}
            >
              Register
            </Button>
            <Grid container>              
              <Grid item>
              
                <NavLink to="/">Already registered? Login Now</NavLink>
               
              </Grid>
            </Grid>
          </Box>
        </Box>       
      </Container>
    
  );
};
export default Register;