import React from 'react';
import Button from 'react-bootstrap/Button'
import './genre-view.scss'

export class GenreView extends React.Component {
    
    render() {
        const { genre, onBackClick } = this.props;

        return (
            <div className="director-view" style={{ fontSize: '28px'}}>
                  <div>
                    <span className="label"></span>
                    <span className="value3" style={{ fontSize: '36px'}}>{genre.Name}</span>
                  </div>
                  <div>
                    <span className="label"></span>
                    <span className="value4">{genre.Description}</span>
                  </div>
                    <Button onClick={onBackClick} style={{ width: '90px' ,marginRight: '10px' ,fontSize:'20px' ,backgroundColor: 'black', border: 'none', color: 'white', textDecoration: 'none'  }} variant="link">Back</Button>
                </div>
        );
    }
}