import React from 'react';
import './RenderList.css';
import axios from 'axios';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: {},
      message: '',
    }
    this.cancel = '';
    this.timeout = 0;

    const productId = this.props.match.params.productId;
    const searchUrl = `http://localhost:5000/items/${productId}`;

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
  }

  render() {
    return (
      <div>
        <h1>{this.props.match.params.productId}</h1>
      </div>
    )
  }
}

export default ProductDetail;
