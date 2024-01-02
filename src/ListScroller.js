// ListScroller.js
import React from 'react';
import './ListScroller.css';
import FrameHolder from "./FrameHolder";

function ListScroller({items, callback}) {
    const frameList = items.map(item =>
        <FrameHolder frame={item} callback={callback} key={item.id}/>
    );

    return (
        <div className="list-scroller">
            <div className="scroll-container">
                {frameList}
            </div>
        </div>
    );
};

export default ListScroller;