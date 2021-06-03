import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from "react-google-login"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useHistory} from "react-router-dom"
import Icon from "./icon"
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory()
  const [formData , setFormData] = useState(initialState)

  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } }); //başarılı ise

       history.push('/');
    } catch (error) {
      console.log(error);
    }
  }
  const googleError = (error) => {
    console.log(error)
    console.log(" Google Sign In was unsuccesful . Try Again Later")
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }

  };

  const handleChange = (e) => {
  setFormData ({ ...formData , [e.target.name] : e.target.value}) // inputlardaki namelarle hangi statenin değişeceğini sağlarız 
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup); //prevState şuanda kullandığımız statedir
    setShowPassword(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
              </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <GoogleLogin
            clientId="453177127359-8jdtdtcu966ucqantassjcrhcmtmli00.apps.googleusercontent.com"
            render={(renderProps) => ( //butonun nasıl görüneceği
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>)}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin" />
        </form>
        <Grid container justify="flex-end">
          <Grid item>
            <Button onClick={switchMode}>
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SignUp;