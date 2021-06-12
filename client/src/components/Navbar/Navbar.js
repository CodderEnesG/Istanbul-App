import React ,  {useState , useEffect} from 'react'
import { AppBar, Avatar, Typography , Toolbar , Button } from "@material-ui/core"
import useStyles from "./styles"
import { Link , useHistory , useLocation } from "react-router-dom"
import memories from "../../images/istanbul.png"
import {useDispatch} from "react-redux"
import decode from "jwt-decode"
function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [user , setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
          //tokenin zamanı geçerse logout yapsın
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location]);

    const logout = () => {
        dispatch({ type : "LOGOUT"})

        history.push("/")

        setUser(null);
    };
    return (

        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center"> <img component={Link} to="/" className={classes.heading} className={classes.image} src={memories} alt="icon" height="60" /></Typography>
               
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? ( //login ise
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)} </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>LOGOUT</Button>


                    </div>
                ) : (     // login değilse
                     <Button component={Link} color="primary"  to="/auth" variant="contained" style={{backgroundColor:"red"}}>Sign In</Button>
                )}
            </Toolbar>
        </AppBar>

    )
}

export default Navbar
