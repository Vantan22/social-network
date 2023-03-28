import React from 'react';
import { Link } from 'react-router-dom';
import icon_delete from '../img/GroupdleteUserRecents.svg'
import './UserRecentItem.css'
const UserRecentItem = (props) => {
    console.log(props);
    return (
        <Link to='#' className='user-recent'>
        {/* <div className='padding'> */}

            <div className="user">
                <img src={props.userAvatar} alt={props.userName} />
                <span>{props.userName}</span>
            </div>
            <div>
            {/* <img className='user-recent-close' src={icon_delete} alt="icondelete" /> */}
            </div>
        {/* </div> */}
        </Link>
    );
};

export default UserRecentItem;
