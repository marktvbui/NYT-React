import React, { Component } from "react";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { List, ListItem } from "../../components/List";
import { Input, FormButton } from "../../components/Form";
import SaveButton from "../SaveButton";

import Saved from "../Saved";

class Search extends Component {
  state = {
    articles: [],
    topic: "",
    startyear: "",
    endyear: "",
    searchClicked: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  saveArticle = article => {
      API.saveArticle(
        {
        title: article.article.headline.main,
        date: article.article.pub_date,
        url: article.article.web_url
      }
      )
        .then(res => <Saved />)
        .catch(err => console.log(article));
  };



  handleFormSubmit = event => {
    event.preventDefault();
    API.searchArticle(this.state.topic, this.state.startyear, this.state.endyear)
      .then(res => this.setState({ articles: res.data.response.docs, topic: "", startyear: "", endyear: "", searchClicked: true }))

      .catch(err => console.log(err));
    };


  render() {
    return (
      <Container>
        <Container fluid>
          <h1>Search</h1>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.startyear}
                onChange={this.handleInputChange}
                name="startyear"
                placeholder="20161109"
              />
              <Input
                value={this.state.endyear}
                onChange={this.handleInputChange}
                name="endyear"
                placeholder="20170915"
              />

              <FormBtn
                disabled={!(this.state.topic && this.state.startyear && this.state.endyear)}
                onClick={this.handleFormSubmit}
              >
                Find Articles
              </FormBtn>
            </form>
            </Container>

            <Container fluid>

             {this.state.articles.length ? (
              <div>
                <h2>Search Results</h2>
                <List>
                  {this.state.articles.map(article => (

                    <ListItem key={article._id}>
                    <Link target="_blank" to={article.web_url}>
                      <strong>
                        {article.headline.main}
                      </strong>
                    </Link>
                    <br />
                      {article.pub_date}
                      <SaveBtn onClick={() => this.saveArticle({article})} />

                    </ListItem>
                  ))}
                </List>
              </div>
            ) : (
              <h3>{this.state.searchClicked ? (
                "No Results Found"
              ) : (
                ""
              )} </h3>
            )}

        </Container>

      </Container>
    );
  }
}

export default Search;