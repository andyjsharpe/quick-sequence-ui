// ListScroller.js
import React from 'react';
import './ListScroller.css';
import FrameHolder from "./FrameHolder";

const ListScroller = ({ items }) => {
    return (
        <div className="list-scroller">
            <div className="scroll-container">
                {items.map((item, index) => (
                    <FrameHolder/>
                    //{item}
                ))}
            </div>
        </div>
    );
};

export default ListScroller;