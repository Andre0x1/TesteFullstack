import React, { Component } from "react";
import { Panel, Form, FormGroup, FormControl, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const divStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: -100,
};

const panelStyle = {
  backgroundColor: "rgba(255,255,255,0.5)",
  border: 0,
  paddingLeft: 20,
  paddingRight: 20,
  width: 300,
};

const buttonStyle = {
  marginBottom: 0,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      userData: {},
      showModal: false,
      name: "",
      senha: "",
    };
  }

  handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/usuario/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        this.setState({ redirect: true, userData: data.user });
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.log("Error occurred during login");
    }
  };

  handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleShowModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handlesenhaChange = (e) => {
    this.setState({ senha: e.target.value });
  };

  saveUser = async (name, senha) => {
    try {
      const response = await fetch("http://localhost:3000/usuario/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          password: senha,
        }),
      });

      if (response.status === 200) {
        console.log("User saved successfully");
      } else {
        console.log("Failed to save user");
      }
    } catch (error) {
      console.log("Error occurred during user save");
    }
    this.setState({ showModal: false });
  };

  render() {
    if (this.state.redirect) {
      const { userData } = this.state;
      return <Redirect to={`/home/?id=${userData.id}`} />;
    }

    const { showModal } = this.state;

    return (
      <div style={divStyle}>
        <Panel style={panelStyle}>
          <Form horizontal className="LoginForm" id="loginForm">
            <FormGroup controlId="formEmail">
              <FormControl
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="formPassword">
              <FormControl
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
              <span
                style={{ cursor: "pointer" }}
                onClick={this.handleShowModal}
              >
                Criar usuário?
              </span>
            </FormGroup>
            <FormGroup style={buttonStyle} controlId="formSubmit">
              <Button
                bsStyle="primary"
                type="submit"
                onClick={this.handleFormSubmit}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </Panel>
        {showModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Formulário</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleCloseModal}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="nameInput">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameInput"
                        placeholder="Digite o nome do item"
                        onChange={this.handleNameChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="senhaInput">Senha</label>
                      <textarea
                        className="form-control"
                        id="senhaInput"
                        rows="3"
                        placeholder="Digite a descrição do item"
                        onChange={this.handlesenhaChange}
                      ></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.handleCloseModal}
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      this.saveUser(this.state.name, this.state.senha)
                    }
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default LoginForm;
