import React from 'react';

const NotiItem = (props) => {
    return (
        <div className='noti-item'>
            <img src={props.avatar} alt={props.userName} />
            <span><span className='noti-username'>{props.userName} </span>{props.notidesc} </span>
        </div>
    );
};

export default NotiItem;
