import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <div style={{ display: 'block'}}>
      <Form.Control
    style={{ width: '250px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.26)', textAlign: 'center', fontSize: '22px', border: 'none', color: 'white', placeholder: 'black'}}
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search movies"
  />
  </div>
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);