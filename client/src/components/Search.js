import React from 'react';
import './Search.scss';
import axios from 'axios';
import RenderList from './RenderList';

import LogoMeli from '../Logo_ML.png';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: {},
      loading: false,
      isEmpty: false,
      message: '',
    }
    this.cancel = '';
    this.handleOnInputChange = this.handleOnInputChange.bind(this);
    this.timeout = 0;
  }
  handleOnInputChange = (event) => {
    const query = event.target.value;
    if (query.length > 0) {
      //search function
      if (!query) {
        this.setState({ query, results: {}, message: '' });
      } else {
        this.setState({ query, loading: true, message: '' }, () => {
        });
      }
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.fetchSearchResults(query);
      }, 1000);
    }
    if(query.length === 0) {
      this.setState({isEmpty: true})
    } else if(query.length > 0) {
      this.setState({isEmpty: false})
    }
  };
  fetchSearchResults = (query) => {
    const searchUrl = `http://localhost:5000/sites/MLA/search?q=${query}`;
    if (this.cancel) {
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
        <img className="logo-meli" src={LogoMeli} alt="Logo Mercado Livre"/>
          <input
            type="text"
            id="search-input"
            placeholder="Nunca deixe de buscar"
            onChange={this.handleOnInputChange}
          />
        </label>
        <button className="button-submit"></button>
        <i className="fa fa-search search-icon" />
        <RenderList estadoSeach={this.state} />
      </div>
    )
  }
}

export default Search;
