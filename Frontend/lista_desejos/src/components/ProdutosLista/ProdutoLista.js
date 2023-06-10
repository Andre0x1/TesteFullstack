import React, { Component } from "react";
import { Link } from "react-router-dom";

class ProdutoLista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      lists: [],
      activeList: null,
    };
  }

  async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    try {
      const ListproductsResponse = await fetch(
        "http://localhost:5101/api/listaProduto/" + id
      );

      if (!ListproductsResponse.ok) {
        throw new Error(
          "Error occurred while fetching data: " + ListproductsResponse.status
        );
      }

      const data = await ListproductsResponse.json();

      const productsList = [];
      for (const product of data) {
        const productResponse = await fetch(
          `http://localhost:5101/api/produto/` + product.idProduto
        );

        if (!productResponse.ok) {
          throw new Error(
            "Error occurred while fetching product: " + productResponse.status
          );
        }

        const productData = await productResponse.json();
        productsList.push(productData);
      }

      console.log(productsList);

      this.setState({ products: productsList });
    } catch (error) {
      console.log("Error occurred while fetching data", error);
    }
  }

  render() {
    const { products } = this.state;

    return (
      <div className="container">
        <h2>Itens Lista</h2>
        <div className="row">
          <div className="col-md-9">
            <Link to="#" onClick={() => this.props.history.goBack()}>
              Voltar
            </Link>
            <div className="row">
              {products.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card p-3">
                    <div className="card-body">
                      <h4 className="card-title">{product.nome}</h4>
                      <p className="card-text">
                        Description: {product.descricao}
                      </p>
                      <p className="card-text">Link: {product.link}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProdutoLista;
