import React, { Component } from "react";
import Search from "../Search";
import Saved from "../Saved";

class Main extends Component {

  render() {
    return (
      <Container>
        <Search />
        <Saved />
      </Container>
    );
  }
}

export default Main;