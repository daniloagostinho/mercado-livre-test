import React from 'react';
import './RenderList.css';
class RenderList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  render( ) {
    console.log(this.props);
    return (
      <h1>Render list component</h1>
    )
  }
}

export default RenderList;
