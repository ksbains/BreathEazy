import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './Components/SignIn/SignIn';
import LandingPage from './Components/LandingPage/LandingPage';
import Navbar from './Components/LandingPage/Navbar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Route exact path="/" component={SignIn} />
    <Route exact path="/landingpage" component={LandingPage} />
    </div>
    </BrowserRouter>
  );
}

export default App;
