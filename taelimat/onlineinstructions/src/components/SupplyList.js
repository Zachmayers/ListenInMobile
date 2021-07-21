import React from 'react';

export default function SupplyList(props) {
    return (
        <div className="SupplyList">
            <h1>Supply List:<br /></h1>
            <h2>Materials Included:</h2>
            <p>{props.materials.map((mats) =>
                <li>{mats}</li>)}
            </p>
            <h2>Not Included</h2>
            <p>{props.notIncluded.map((mats) =>
                <li>{mats}</li>)}
            </p>
        </div>
    )
}