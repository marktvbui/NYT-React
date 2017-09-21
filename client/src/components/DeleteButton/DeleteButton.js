import React from "react";

const DeleteButton = props => (
  <button className="delete-btn" {...props}>
  <i className="fa fa-trash-o" aria-hidden="true"></i>

  </button>
);

export default DeleteButton;