import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';


const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};


function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }
  

  if (!movies) return <div className="main-view"/>;
  
    return <>
        <Row className="main-view justify-content-md-center">
        <Col md={12} style={{ margin: '1em' }}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredMovies.map(m => (
      <Col md={2.5} key={m._id}>
        <MovieCard movie={m}/>
      </Col>))}
      </Row>
      </>
      };



export default connect(mapStateToProps)(MoviesList);

