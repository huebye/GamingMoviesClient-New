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
        <Col xs={12}  style={{ margin: '2em' }}>
          <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        
        {filteredMovies.map(m => (
      <Col className="m-1" xs={12} sm={'auto'} md={'auto'}  xl={'auto'}  key={m._id}>
        <MovieCard movie={m}/>
      </Col>))}

      </>
      };



export default connect(mapStateToProps)(MoviesList);

