import React from 'react';

function TableRowOrderIcon({ sort, type }: { sort: string, type: string }) {
    const isAsc = () => sort.indexOf("ASC") >= 0;
    const isType = () => sort.indexOf(type) >= 0;

    return (<>
        {
            isType()
                ? isAsc()
                    ? <i className="ri-arrow-down-line ri-xs ml-2"></i>
                    : <i className="ri-arrow-up-line ri-xs ml-2"></i>
                : null
        }
    </>);
}

export default TableRowOrderIcon;
