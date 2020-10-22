import React from 'react';
import todoStatus from '../../constants/status';

import FilterItem from 'components/FilterItem/FilterItem';

function Filters(): JSX.Element {
    return (
        <ul className="filters">
            {Object.values(todoStatus).map((val) => (
                <FilterItem key={val} status={val === todoStatus.ALL ? '' : val.toLowerCase()}>
                    {val[0].toUpperCase() + val.slice(1)}
                </FilterItem>
            ))}
        </ul>
    );
}

export default Filters;
