import React from 'react';
import './Search.css';
import axios from 'axios';
class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: {},
      loading: false,
      message: ''
    }
    this.cancel = '';
  }
  handleOnInputChange = (event) => {
    const query = event.target.value;
    if ( ! query ) {
      this.setState({ query, results: {}, message: '' } );
    } else {
      this.setState({ query, loading: true, message: '' }, () => {
        this.fetchSearchResults(query);
      });
    }
  };
  fetchSearchResults = (query ) => {
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
        const resultNotFoundMsg = !res.data.hits.length
          ? 'There are no more search results. Please try a new search.'
          : '';
        this.setState({
          results: res.data.hits,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: 'Failed to fetch results.Please check network',
          });
        }
      });
  };
  render( ) {
    return (
      <div className="container">
				<label className="search-label" htmlFor="search-input">
					<input
						type="text"
						id="search-input"
            placeholder="Nunca deixe de buscar"
            onChange={this.handleOnInputChange}
					/>
					<i className="fa fa-search search-icon"/>
				</label>

			</div>
    )
  }
}

export default Search;
