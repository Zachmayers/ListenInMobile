import React from 'react';
import '../index.css';
import mask from './imgmask.png';

export default function(props) {
    return(
        <div className="MaskImage">
            <img src={mask} alt='' width="300" height="400"/>
        </div>
    )
}