
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import icon__clock from '../../img/vuesax/linear/clock.png'
import icon__more from '../../img/more.png'
import icon__heart from '../../img/heart.svg'
import icon__heartActive from '../../img/heartabcd.svg'
import icon__comments from '../../img/messagecomments.svg'
import './postItem.css'
import ModalViewPost from "./ViewPost/ModalViewPost";

export const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="postItem-desc">
      {isReadMore ? text.slice(0, 140) : text}
      {/* {console.log(typeof text)} */}
      {text.length < 100 ? <a></a> : <span onClick={toggleReadMore} className="cuisor readmore">
        {isReadMore ? "  ...read more" : " show less"}

      </span>}

    </p>
  );
};

const PostItem = (props) => {
  const { data } = props
  
  const [heartActive, setHeartActive] = useState(data.likeCheck)
  const heartHandler = () => {
    setHeartActive(!heartActive)
  }

  const [isViewPost, setViewPost] = useState(false);
  const toggleViewPost = () => {
    setViewPost(!isViewPost);
  };
  return (
    <>
      {isViewPost ? <ModalViewPost linkImgViewPost={data.imageUrl} userName={data.userName} userAvatar={data.userAvatar} descriptionPost={data.descriptionPost} likeCheck={data.likeCheck} likesCount={data.likesCount} commentsCount={data.commentsCount} toggleViewPost={toggleViewPost} /> : ("")}
      <div className='postItem'>
        <header className='postItem-header'>
          <div>
            <Link><img src={data.userAvatar} className='postItem-header__imageUser' alt="" /></Link>
            <Link><div className='postItem-User-tittle'>
              <span className="userName-postItem">@{data.userName}</span>
              <span className='userName-postItem-times'><img src={icon__clock} alt="" />{data.atTimes}</span>
            </div></Link>
          </div>
          <img src={icon__more} alt="" className="iconMore" />
        </header>
        <main className="postItem-content">
          <ReadMore>{data.descriptionPost}</ReadMore>
          {/* modal posts */}
          <img onClick={toggleViewPost} src={data.imageUrl} alt="" className="postItem-content-img" />
        </main>
        <footer className="postItem-footer">
          <div className="likes">
            {/* {data.likeCheck ? <img className="icon" src={icon__heartActive} /> : <img className="icon" src={icon__heart} />} */}

            <img className="icon" onClick={heartHandler} src={heartActive ? icon__heartActive : icon__heart} />
            <span>{data.likesCount}</span>
          </div>
          <div onClick={toggleViewPost} className="comments">
            <img className="icon" src={icon__comments} alt="" />
            <span>{data.commentsCount}</span>
          </div>
        </footer>
      </div>

    </>
  );
};

export default PostItem;
