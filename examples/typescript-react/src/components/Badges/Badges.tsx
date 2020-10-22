import React, {ReactNode} from 'react';

interface BadgesProps {
    children: ReactNode;
}

function Badges({children}: BadgesProps): JSX.Element {
    return <>{children}</>;
}

export default Badges;
