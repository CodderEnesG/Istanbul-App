import React  from "react"
import { Container} from "@material-ui/core"
import "../src/App.css"
import Navbar from "./components/Navbar/Navbar"
import {BrowserRouter , Switch , Router, Route} from "react-router-dom"
import Home from "./components/Home/Home"
import Auth from "./components/Auth/Auth"

function App() {
  
  return (
    <BrowserRouter>
     <Container maxWidth="lg">
    <Navbar/>
    
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/auth" exact component={Auth}/>
    </Switch>
      
    </Container>
    </BrowserRouter>
   

  );
}

export default App;
