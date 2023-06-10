import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProdutoLista from "./components/ProdutosLista/ProdutoLista";
import "./App.css";

const Home = () => <HomePage />;

const Login = () => <LoginPage />;

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/produtoLista" component={ProdutoLista} />
        </div>
      </Router>
    );
  }
}

export default App;
