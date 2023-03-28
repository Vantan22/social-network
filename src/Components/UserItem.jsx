import React from 'react';
import './useritem.css'
import { Link } from 'react-router-dom';
const UserItem = (props) => {
    // console.log(props);
    return (
        <>
            <div className='UserItem-wrapper'>
                <div>
                    <div><img src={props.avatar} title="props.userTitle" className="userItem-avatar" /> </div>
                    <div className='UserItem-Name'>
                        <span>{props.userName}</span>
                        {props.userTitle ? <p>Suggestion for you</p> : ""}
                    </div>
                </div>
                {props.userTitle ? <Link className='userItem-link'>Follow</Link> : ""}
            </div>
        </>
    );
};

export default UserItem;
