import React from 'react';
import { Link } from 'react-router-dom';
import './CreatePost.css'
import ModalCreatePost from '../../Components/modal/ModalCreatePost'
import { useState } from 'react';
const CreatePost = (props) => {
    const [modalState, setModalState] = useState(false)
    const handlePostModal = () => {
        setModalState(true)
    }
    return (
        <>
            {modalState ? <ModalCreatePost /> : ''}

            <div className='create-post'>
                <Link>
                    <img src={props.avatar} alt="" />
                </Link>
                <span onClick={handlePostModal}>bạn đang nghĩ gì ? {props.userName}</span>
            </div>
        </>

    );
};

export default CreatePost;
