// import React, { useState } from 'react'
// import { apiURl } from '../api'
// import { createCookie } from '../utils'

// const Login = ({ history }) => {
//   const [state, setState] = useState({
//     email: '',
//     password: '',
//     isSubmitting: false,
//     message: '',
//   })

//   const { email, password, isSubmitting, message } = state

//   const handleChange = async e => {
//     const { name, value } = e.target
//     await setState({ ...state, [name]: value })
//   }

//   const handleSubmit = async () => {
//     setState({ ...state, isSubmitting: true })

//     const { email, password } = state
//     try {
//       const res = await fetch(`${apiURl}/login`, {
//         method: 'POST',
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }).then(res => res.json())

//       const { token, success, msg, user } = res

//       if (!success) {
//         return setState({
//           ...state,
//           message: msg,
//           isSubmitting: false,
//         })
//       }
//       // expire in 30 minutes(same time as the cookie is invalidated on the backend)
//       createCookie('token', token, 0.5)
//       console.log("hello warrior")
//       history.push({ pathname: '/session', state: user })
//     } catch (e) {
//       setState({ ...state, message: e.toString(), isSubmitting: false })
//     }
//   }

//   return (
//     <div className="wrapper">
//       <h1>Login</h1>
//       <input
//         className="input"
//         type="text"
//         placeholder="email"
//         value={email}
//         name="email"
//         onChange={e => {
//           handleChange(e)
//         }}
//       />

//       <input
//         className="input"
//         type="password"
//         placeholder="password"
//         value={password}
//         name="password"
//         onChange={e => {
//           handleChange(e)
//         }}
//       />

//       <button disabled={isSubmitting} onClick={() => handleSubmit()}>
//         {isSubmitting ? '.....' : 'login'}
//       </button>
//       <div className="message">{message}</div>
//     </div>
//   )
// }

// export default Login










import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import {withRouter} from 'react-router-dom'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
        Your Website
    </Typography>
  );
}
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
 function Login(props) {
  const classes = useStyles();
 const [login, setLogin] = React.useState({});
  const [error, setError] = React.useState("");
  const handleChange = e =>
    setLogin({ ...login, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !login.email ||
      login.email === "" ||
      !login.password ||
      login.password === ""
    )
      return setError("Champs vide");
    try {
      const res = await axios.post("/login", login);
      if (res.data.token) {
        localStorage.setItem("jwt", res.data.token);
        props.history.push("/home");
      } else setError("Login failed");
    } catch (err) {
      setError("Login failed");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
        {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
             onChange={handleChange}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={handleChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
              className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
export default withRouter(Login)