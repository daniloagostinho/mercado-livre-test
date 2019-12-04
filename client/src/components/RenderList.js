import React from 'react';
import './RenderList.css';
class RenderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  renderSearchResults = () => {
    const { results } = this.props.estadoSeach;
    if (Object.keys(results).length && results.length) {
      return (
        <div className="results-container">
          {results.map((result) => {
            return (
              <div className="image-wrapper">
                <h3>{result.item.price.currency} {result.item.price.decimals}</h3>
                <h4>{result.item.title}</h4>

                <img className="image" src={result.item.picture} alt={result.user} />              </div>

            );
          })}
        </div>
      );
    }
  };
  render() {
    console.log(this.props);
    const { results } = this.props.estadoSeach;
    console.log(results);
    return (
      <div>
        {this.renderSearchResults()}
        <p>{this.props.estadoSeach.message}</p>

      </div>
    )
  }
}

export default RenderList;
