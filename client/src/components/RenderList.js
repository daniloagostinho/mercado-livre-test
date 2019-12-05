import React from 'react';
import './RenderList.css';

import Loader from '../loader2.png';

import { Link } from "react-router-dom";

class RenderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  renderSearchResults = () => {
    let { results } = this.props.estadoSeach;
    if (Object.keys(results).length && results.length > 0) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <div className="image-wrapper">
              <Link to={`/items/${result.item.id}`}>aqui</Link>
                <h3>{result.item.price.currency} {result.item.price.decimals}</h3>
                <h4>{result.item.title}</h4>
                <img className="image" src={result.item.picture} alt={result.user} />
                </div>
            );
          })}
        </div>
      );
    }
  };
  render() {
    return (
      <div>
        {this.renderSearchResults()}
        <p className="message-search">{this.props.estadoSeach.message}</p>
        <h2> {this.props.estadoSeach.loading}</h2>
        <img src={Loader} className={`search-loading ${this.props.estadoSeach.loading ? 'show' : 'hide'}`} alt="loader" />
      </div>
    )
  }
}

export default RenderList;
