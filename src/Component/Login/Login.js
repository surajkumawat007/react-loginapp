import React, { useState, useEffect } from "react";
import styleCss from "../StyleCss.css";
import loginCss from "./LoginCss.css";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { useNavigate, NavLink } from "react-router-dom";
const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };


  const  Copyright=(props) =>{
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="expoundsofttechsolution.com">
          Ests
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {

    // }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(user);
      axios.post("http://localhost:8080/login", user).then((res) => {
        alert(res.data.message);
        setUserState(res.data.user);
        navigate("/", { replace: true });
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
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box noValidate sx={{
        width: 350   
       
      }}
      
      >

        <TextField
              id="email"
              type="email"
              autoComplete="off"
              name="email"
              value={user.email}
              onChange={changeHandler}
              placeholder="Email Address"
              margin="normal"
              required
              fullWidth             
              label="Email Address"
              autoFocus
            />
             <p className="error">{formErrors.email}</p>
            <br /><br />
            <TextField
              id="password"
              type="password"
              autoComplete="off"
              name="password"
              value={user.password}
              onChange={changeHandler}
              placeholder="Password"
              required
              margin="normal"              
              fullWidth
              label="Password"
            />




        
        <p className={styleCss.error}>{formErrors.password}</p>
        <Button
              className="button_style"
              variant="contained"
              color="primary"
              size="large"
              disabled={user.email === '' && user.password === ''}
              onClick={loginHandler}
            >

              Login
            </Button> 
      <Grid container>              
              <Grid item>
              <NavLink to="/register">Not yet registered? Register Now</NavLink>
                
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
};
export default Login;