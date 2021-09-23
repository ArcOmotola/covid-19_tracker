import React from 'react';
import './Table.css';

export default function Table({ countries }) {
    return (
        <div className="table">
            {countries.map(({ country, cases }) => (
                <tr>
                    <td>{ country }</td>
                    <td>{ cases }</td>
                </tr>
            ))}
        </div>
    )
}



