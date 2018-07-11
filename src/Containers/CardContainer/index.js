import React from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card';

const CardContainer = () => {
  const moviesToDisplay = props.movies.map(movie => {
    return <Link to={`/movies/${movie.title}`}>
              <Card {...movie} />
           </Link>
  });

  return (
    <div>
      { moviesToDisplay }
    </div>
  );
}

export const mapStateToProps = (state) => ({
  movies: state.movies
});


export default connect(mapStateToProps)(CardContainer);
