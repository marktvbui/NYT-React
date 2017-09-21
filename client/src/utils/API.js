import axios from "axios";

export default {
  // Gets all Articles from DB
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Queries Articles
  searchArticle: function(query, begin, end) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        'api-key': "5b5e17614280462fa123ab76f3d2bc84",
        'q': query,
        'begin_date': begin,
        'end_date': end
      }
    });
  },
  // Deletes the Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Article to the database
  saveArticle: function(articleData) {
    console.log("ARTICLE SAVED", articleData);
    return axios.post("/api/articles", articleData);
  }
};