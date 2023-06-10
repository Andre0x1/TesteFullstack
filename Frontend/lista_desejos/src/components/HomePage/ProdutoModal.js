import React from "react";

const Modal = ({ product, onClose }) => {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalhes do Produto</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h5>{product.nome}</h5>
            <p>{product.descricao}</p>
            <a href={product.link} target="_blank" rel="noopener noreferrer">
              {product.link}
            </a>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
