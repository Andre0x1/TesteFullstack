import React, { Component } from "react";
import { Link } from "react-router-dom";
import Modal from "./ProdutoModal";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      lists: [],
      activeList: null,
      viewshowModal: false,
      listshowModal: false,
      showModal: false,
      itemName: "",
      itemDescription: "",
      itemLink: "",
      selectedProduct: null,
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    try {
      const productsResponse = await fetch(
        "http://localhost:5101/api/produto/"
      );
      const productsData = await productsResponse.json();
      this.setState({ products: productsData });

      const listsResponse = await fetch(
        "http://localhost:5101/api/lista/" + id
      );
      const listsData = await listsResponse.json();
      this.setState({ lists: listsData });
    } catch (error) {
      console.log("Error occurred while fetching data", error);
    }
  }

  handleListClick = (list) => {
    this.setState({ activeList: list });
  };

  handleAddToList = async (productId) => {
    const { activeList } = this.state;
    if (!activeList) return;

    try {
      const response = await fetch("http://localhost:3000/listaProdutos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idLista: activeList.id,
          idProduto: productId,
        }),
      });

      if (response.ok) {
        console.log("Produto adicionado à lista com sucesso.");
      } else {
        console.log("Erro ao adicionar o produto à lista.");
      }
    } catch (error) {
      console.log("Error occurred while adding product to list", error);
    }
  };

  handleViewItemClick = () => {
    this.setState({ viewshowModal: true });
  };

  handleCloseModal = () => {
    this.setState({ viewshowModal: false });
  };

  handleViewItemClickModal = (product) => {
    this.setState({ showModal: true, selectedProduct: product });
  };

  handleCloseModalProduct = () => {
    this.setState({ showModal: false, selectedProduct: null });
  };

  handleViewListModal = (idUser) => {
    this.setState({ listshowModal: true, idUser: idUser });
  };

  handleCloseModalList = () => {
    this.setState({ listshowModal: false, selectedProduct: null });
  };

  handleNameChange = (event) => {
    this.setState({ itemName: event.target.value });
  };

  handleListNameChange = (event) => {
    const Newparams = new URLSearchParams(window.location.search);
    const idUser = Newparams.get("id");
    this.setState({ ListName: event.target.value });
    this.setState({ ListUser: idUser });
  };

  handleLinkChange = (event) => {
    this.setState({ itemLink: event.target.value });
  };

  handleDescriptionChange = (event) => {
    this.setState({ itemDescription: event.target.value });
  };

  handleSaveItem = async () => {
    const { itemName, itemDescription, itemLink } = this.state;

    try {
      const response = await fetch("http://localhost:3000/produto/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: itemName,
          descricao: itemDescription,
          link: itemLink,
        }),
      });

      if (response.ok) {
        console.log("Item salvo com sucesso.");

        this.fetchProducts();
        this.handleCloseModal();
      } else {
        console.log("Erro ao salvar o item.");
      }
    } catch (error) {
      console.log("Error occurred while saving item", error);
    }
  };

  handleSaveList = async () => {
    const { ListName, ListUser } = this.state;

    try {
      const response = await fetch("http://localhost:3000/lista/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuario: ListUser,
          nome: ListName,
        }),
      });

      if (response.ok) {
        console.log("Item salvo com sucesso.");

        this.fetchLists();
        this.handleCloseModalList();
      } else {
        console.log("Erro ao salvar o item.");
      }
    } catch (error) {
      console.log("Error occurred while saving item", error);
    }
  };

  fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5101/api/produto/");
      const productsData = await response.json();
      this.setState({ products: productsData });
    } catch (error) {
      console.log("Error occurred while fetching products", error);
    }
  };

  fetchLists = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    try {
      const listsResponse = await fetch(
        "http://localhost:5101/api/lista/" + id
      );
      const listsData = await listsResponse.json();
      this.setState({ lists: listsData });
    } catch (error) {
      console.log("Error occurred while fetching products", error);
    }
  };

  render() {
    const {
      products,
      lists,
      activeList,
      showModal,
      selectedProduct,
      viewshowModal,
      listshowModal,
    } = this.state;

    return (
      <div className="container">
        <h2>Home Page</h2>

        <div className="row justify-content-center">
          <div className="col-md-2">
            <ul className="list-group">
              <h3>Suas Listas</h3>
              <button
                className="btn btn-secondary"
                onClick={() => this.handleViewListModal()}
              >
                Criar Lista
              </button>
              {lists.map((list) => (
                <li
                  key={list.id}
                  onClick={() => this.handleListClick(list)}
                  className={`list-group-item ${
                    activeList === list ? "active" : ""
                  }`}
                >
                  {list.nome}
                  {activeList === list && (
                    <div>
                      <Link
                        to={`/produtoLista?id=${list.id}`}
                        className="btn btn-secondary"
                      >
                        Exibir itens lista
                      </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <ul className="list-group">
              <h3>Adicionar Item</h3>
              <button
                className="btn btn-primary"
                onClick={this.handleViewItemClick}
              >
                Adicionar Item
              </button>
            </ul>
          </div>
          <div className="col-md-7">
            <div className="row justify-content-center">
              {products.map((product) => (
                <div className="col-md-7" key={product.id}>
                  <div className="card p-3">
                    <div className="card-body">
                      <h4 className="card-title">{product.nome}</h4>

                      <div className="btn-group m-3">
                        <button
                          className="btn btn-primary"
                          onClick={() => this.handleAddToList(product.id)}
                          disabled={!activeList}
                        >
                          Adicionar à lista
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => this.handleViewItemClickModal(product)}
                        >
                          Ver detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {viewshowModal && (
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
                      <label htmlFor="descriptionInput">Descrição</label>
                      <textarea
                        className="form-control"
                        id="descriptionInput"
                        rows="3"
                        placeholder="Digite a descrição do item"
                        onChange={this.handleDescriptionChange}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="linkInput">Link</label>
                      <textarea
                        className="form-control"
                        id="linkInput"
                        rows="3"
                        placeholder="Digite a link do item"
                        onChange={this.handleLinkChange}
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
                    onClick={this.handleSaveItem}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showModal && (
          <Modal
            product={selectedProduct}
            onClose={this.handleCloseModalProduct}
          />
        )}

        {listshowModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Formulário</h5>
                  <button
                    type="button"
                    className="close"
                    onClick={this.handleCloseModalList}
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="listNameInput">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        id="listNameInput"
                        placeholder="Digite o nome da lista"
                        onChange={this.handleListNameChange}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={this.handleCloseModalList}
                  >
                    Fechar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSaveList}
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

export default Home;
