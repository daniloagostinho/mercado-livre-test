import React from 'react';
import './RenderList.css';


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
          {(results).map((categorie) =>
            <ul className="menu">
              <li key={categorie}>
              </li>
            </ul>
          )}
          {results.map((result) => {
            return (
              <div className="image-wrapper">
                <Link to={`/items/${result.item.id}`}><img className="image" src={result.item.picture} alt={result.user} /></Link>
                <p class="price-tag">{result.item.price.currency} {result.item.price.decimals}</p>
                <p>{result.item.title}</p>
                <p class="aligth-right">Capital Federal</p>
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
        {this.props.estadoSeach.loading &&
          <p>
            Buscando pelo produto...
          </p>
        }
      </div>
    )
  }
}

export default RenderList;
