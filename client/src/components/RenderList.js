import React from 'react';
import './RenderList.css';


import { Link } from "react-router-dom";
import PostManImail from '../car_mail.png';
class RenderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  renderSearchResults = () => {
    let { results } = this.props.estadoSeach;
    console.log('categorias >>', ((results.results || {}).categories || []) )
    if (Object.keys(results).length && results.length > 0) {
      return (
        <div className="results-container">
          {(results.categories || []).map((categorie) =>
            <ul className="menu">
              <li key={JSON.stringify(categorie)}>
              </li>
            </ul>
          )}
          {results.map((result) => {
            return (
              <div className="image-wrapper">
                <Link to={`/items/${result.item.id}`}><img className="image" src={result.item.picture} alt={result.user} /></Link>
                {result.item.free_shipping &&
                  <img className="car-mail-img" src={PostManImail} alt={result.user} />
                }
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
          <p className="loading">
            Buscando por favor aguarde...
          </p>
        }
      </div>
    )
  }
}

export default RenderList;
