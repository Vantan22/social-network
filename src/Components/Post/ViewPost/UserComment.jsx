import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import '../../../Components/Post/ViewPost/UserComment.css'
// import { ReadMore } from '../PostItem';
const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };
    return (
        <span className="postItem-desc">
            {isReadMore ? text.slice(0, 140) : text}
            {text.length < 100 ? <a></a> : <span onClick={toggleReadMore} className="cuisor readmore">
                {isReadMore ? "  ...read more" : " show less"}
            </span>}
        </span>
    );
};

const UserComment = (props) => {
    return (
        <>
            <div className='userComment-wrapper'>
                <div className="wrap-user">
                    <img src={props.avatar} className="userComment-avatar">
                    </img>
                </div>
                <div className='block-cmt'>
                    <span className='userComment-name'>
                        <Link><span>{props.userName}</span></Link>
                    </span>
                    {props.userComment ? <span className='userComment-text'>{props.userComment}</span> : ""}
                    {props.userCapsion ? <span className='userCapsion-text'><ReadMore>{props.userCapsion}</ReadMore> </span> : ""}
                    
                </div>

            </div>
        </>
    );
};

export default UserComment;
