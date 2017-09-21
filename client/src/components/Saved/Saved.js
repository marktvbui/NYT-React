import React, { Component } from "react";
import DeleteButton from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";

class Saved extends Component {
  state = {
    articles: []
  };

  //when saved component loads, get the articles already saved to db
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container>
        <Container fluid>
          <h1>Saved Articles</h1>
           {this.state.articles.length ? (
            <List>
              {this.state.articles.map(article => (
                <ListItem key={article._id}>
                  <Link target="_blank" to={article.url}>
                  <strong>
                    {article.title}
                  </strong>
                  </Link>
                  <br />
                    {article.date}

                  <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Articles Saved! Search for articles</h3>
          )}
        </Container>
      </Container>

    );
  }
}

export default Saved;