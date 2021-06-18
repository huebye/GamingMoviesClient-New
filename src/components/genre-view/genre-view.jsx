import React from 'react';
import Button from 'react-bootstrap/Button'
import './genre-view.scss'

export class GenreView extends React.Component {
    
    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className="genre-view">
                  <div>
                    <span className="label"></span>
                    <span className="value3" style={{ fontSize: '36px'}}>{genre.Name}</span>
                  </div>
                  <div>
                    <span className="label"></span>
                    <span className="value4">{genre.Description}</span>
                  </div>
                    <Button className="btn_back" onClick={onBackClick} variant="link">Back</Button>
                </div>
        );
    }
}