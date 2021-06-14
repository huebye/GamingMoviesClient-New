import React from 'react';
import Button from 'react-bootstrap/Button'
import './director-view.scss'

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
    
    render() {
        const { director, onBackClick } = this.props;

        return (
            <div className="director-view" style={{ fontSize: '28px'}}>
                  <div>
                    <span className="label"></span>
                    <span className="value1" style={{ fontSize: '36px'}}>{director.Name}</span>
                  </div>
                  <div>
                    <span className="label"></span>
                    <span className="value2">{director.Bio}</span>
                  </div>
                    <Button onClick={onBackClick} style={{ width: '90px' ,marginRight: '10px' ,fontSize:'20px' ,backgroundColor: 'black', border: 'none', color: 'white', textDecoration: 'none'  }} variant="link">Back</Button>
                </div>
        );
    }
}