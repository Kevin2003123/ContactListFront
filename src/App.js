import "./App.css";
import ContactDetail from "./components/ContactDetail/ContactDetail";
import ContactForm from "./components/ContactForm/ContactForm";

import Home from "./components/Home/Home.jsx";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/contactForm/:id" component={ContactForm}/> 
        <Route path="/contactDetail/:id" component={ContactDetail}/>
      </Router>
    </>
  );
}

export default App;


