import React from 'react';
import './Search.css';
import axios from 'axios';
import RenderList from './RenderList';
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: {},
      loading: false,
      message: '',
    }
    this.cancel = '';
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.timeout =  0;
  }
  handleOnInputChange = (event) => {
    const query = event.target.value;
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      //search function
      if (!query) {
        this.setState({ query, results: {}, message: '' });
      } else {
        this.setState({ query, loading: true, message: '' }, () => {
          this.fetchSearchResults(query);
        });
      }
    }, 3000);
  };
  fetchSearchResults = (query) => {
    // By default the limit of results is 20
    const searchUrl = `http://localhost:5000/sites/MLA/search?q=${query}`;
    if (this.cancel) {
      // Cancel the previous request before making a new request
      this.cancel.cancel();
    }
    // Create a new CancelToken
    this.cancel = axios.CancelToken.source();
    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data
          ? this.res.error
          : '';
        this.setState({
          results: res.data,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: error.response.data,
          });
        }
      });
  };
  render() {
    return (
      <div className="container">
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            id="search-input"
            placeholder="Nunca deixe de buscar"
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" />
        </label>
        <RenderList estadoSeach={this.state}/>
      </div>
    )
  }
}

export default Search;
