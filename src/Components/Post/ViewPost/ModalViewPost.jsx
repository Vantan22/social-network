import React, { useState, useEffect, useRef } from 'react';
import '../../Post/ViewPost/ModalViewPost.css'
import UserComment from '../../../Components/Post/ViewPost/UserComment'
import icon__heart from '../../../img/heart.svg'
import icon__heartActive from '../../../img/heartabcd.svg'
import icon__comments from '../../../img/messagecomments.svg'
import icon__closeModal from '../../../img/closeViewPort2.svg'
const ModalViewPost = (props) => {
    const { linkImgViewPost, userName, userAvatar, descriptionPost, likeCheck, likesCount, commentsCount, toggleViewPost, userComment } = props;
    const [heartActive, setHeartActive] = useState({ likeCheck })
    const [inputActive, setinputActive] = useState(false)
    const inputHandler = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setinputActive(!inputActive)
    }
    const heartHandler = () => {
        setHeartActive(!heartActive)
    }
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, []);

    function useOutsideAlerter(ref, handleOutSideClick) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    handleOutSideClick(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
    const inputRef = useRef(null);
    useOutsideAlerter(inputRef, setinputActive);
    return (
        <div onClick={() => toggleViewPost(false)} className="wrap-modal-viewPost">
            <div onClick={(e) => { e.stopPropagation() }} className="modal-viewPost">
                <img src={linkImgViewPost} alt="" className="img-viewPost" />
                <div className="content-viewPost">
                    <div className="wrap-contentViewPost">
                        <UserComment
                            userName={'@' + userName}
                            avatar={userAvatar}
                            userCapsion={descriptionPost}
                        />
                        <div className="litsUser-Comment">
                            <UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222'}
                            />
                            <UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Hôm nay Vạc mang đến những thiết kế đậm chất châu Á nhưng cũng không kém phần hiện đại, mới mẻ giữa những phong cách đường phố đương thời. Những chiếc áo tập trung vào các gam màu trung tính cùng các họa tiết tinh tế lạ mắt để outfits của bạn có thêm điểm nhấn độc đáo. Kế hoạch hôm nay là ghé Vạc sắm một chiếc sơ mi họa họa tiết châu Á chẳng hạn 😘'}
                            />
                            <UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Cùng với xu hướng street style đang lên ngôi, quần túi hộp bất ngờ cũng ngoi lên top. là một trong những thiết kế quen thuộc mang đến sự trẻ trung, thoải mái và năng động, những chiếc túi hộp vuông tạo nên sự gai góc, cùng Vạc bắt trend quần túi hộp nhanh như một cơn lốc nhé 🤗'}
                            />
                            <UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Vẻ ngoài cực cháy dễ thấy cùng Varsity Jacket. Liên hệ với Vạc để nhận thêm thông tin của sản phẩm này nhé 😉'}
                            />
                            <UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Hãy ăn thật ngon, ngủ thật kỹ, tập trung kiếm tiền, vui vẻ tiêu tiền, đừng tức giận chỉ vì một người chẳng ra đâu vào đâu, đừng mất ngủ chỉ vì một việc lãng nhách. Nếu đã sống thì hãy sống cho thật tốt, mỗi giây mỗi phút phải sống cho chính mình.'}
                            />
                            <UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Cùng với xu hướng street style đang lên ngôi, quần túi hộp bất ngờ cũng ngoi lên top. là một trong những thiết kế quen thuộc mang đến sự trẻ trung, thoải mái và năng động, những chiếc túi hộp vuông tạo nên sự gai góc, cùng Vạc bắt trend quần túi hộp nhanh như một cơn lốc nhé 🤗'}
                            /><UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Cùng với xu hướng street style đang lên ngôi, quần túi hộp bất ngờ cũng ngoi lên top. là một trong những thiết kế quen thuộc mang đến sự trẻ trung, thoải mái và năng động, những chiếc túi hộp vuông tạo nên sự gai góc, cùng Vạc bắt trend quần túi hộp nhanh như một cơn lốc nhé 🤗'}
                            /><UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Cùng với xu hướng street style đang lên ngôi, quần túi hộp bất ngờ cũng ngoi lên top. là một trong những thiết kế quen thuộc mang đến sự trẻ trung, thoải mái và năng động, những chiếc túi hộp vuông tạo nên sự gai góc, cùng Vạc bắt trend quần túi hộp nhanh như một cơn lốc nhé 🤗'}
                            /><UserComment
                                userName={'@' + userName}
                                avatar={userAvatar}
                                userComment={'Cùng với xu hướng street style đang lên ngôi, quần túi hộp bất ngờ cũng ngoi lên top. là một trong những thiết kế quen thuộc mang đến sự trẻ trung, thoải mái và năng động, những chiếc túi hộp vuông tạo nên sự gai góc, cùng Vạc bắt trend quần túi hộp nhanh như một cơn lốc nhé 🤗'}
                            />
                        </div>
                    </div>

                    <div className="bottom-viewPost">
                        <span className="line-viewPost2"></span>
                        <div className="infor-viewPost">
                            <div className="viewPost-like">
                                <img className="icon" onClick={heartHandler} src={heartActive ? icon__heartActive : icon__heart} />
                                <span>{likesCount}</span>
                            </div>
                            <div className="viewPost-comment">
                                <img className="icon" src={icon__comments} alt="" />
                                <span>{commentsCount}</span>
                            </div>
                        </div>
                        <div className="add-commentPost">
                            <UserComment
                                avatar={userAvatar}
                            />
                            <div className="comment-viewPost">
                                <div className="comment-input">
                                    <textarea type="text" className="inputComment" onFocus={inputHandler} placeholder='Add a comment' ref={inputRef} rows={3}
                                        cols={5} />
                                    <span className="btn-commentPost">Post</span>
                                </div>
                                <div className={inputActive ? 'line-commentAtive' : 'line-comment'}></div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ModalViewPost;
