import React from 'react';

import '../index.css'

export default function TitleBlock(props) {

    const title = props.title;

    return (
        <div className="TitleBlock">
            <p>Design Guide</p>
            <h1>{props.title}</h1>
            <p>{props.bottom_text}</p>
        </div>
    )
}