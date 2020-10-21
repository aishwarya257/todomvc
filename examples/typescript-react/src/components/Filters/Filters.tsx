import React from 'react';
import todoStatus from '../../constants/status';
import classNames from 'classnames';
import FilterItem from 'components/FilterItem/FilterItem';

interface FilterProps {
    selected: string;
}
function Filters({selected}: FilterProps): JSX.Element {
    return (
        <ul className="filters">
            {Object.values(todoStatus).map((val) => (
                <FilterItem
                    key={val}
                    className={classNames({selected: selected === val})}
                    status={val === todoStatus.ALL ? '' : val.toLowerCase()}
                >
                    {val[0].toUpperCase() + val.slice(1)}
                </FilterItem>
            ))}
        </ul>
    );
}

export default Filters;
