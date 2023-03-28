import React from 'react';
import NotiItem from '../Components/NotiItem';
import postsData from '../data/PostItemdata';
import './Notification.css'
const Notification = ({ defaultMenu }) => {
    if (defaultMenu) return null;
    else
        return (
            <div className='Notification'>
                <h2>Notification</h2>
                <hr />
                <div className="Notification-content">
                    {postsData.map(e =>
                        <NotiItem key={e.userName} avatar={e.imageUrl}
                            userName={e.userName}
                            notidesc={e.descriptionPost} />)}
                </div>
            </div>
        );
};

export default Notification;
