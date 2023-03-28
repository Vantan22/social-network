import React, { useEffect, useState } from 'react';
import './newfeed.css'
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import UserItem from '../../Components/UserItem';
import PostItem from '../../Components/Post/PostItem';
import CreatePost from '../../Components/Post/CreatePost'
import textImg from '../../img/person-img/meovangogh.jpeg'
import { collection, getDocs } from 'firebase/firestore'
import { db, auth } from '../../Api/firebase'



const Newsfeed = () => {
    const [post, setPost] = useState([]);
    const [userSuggest, setUserSuggest] = useState([]);
    const [currentUser,setCurrentUser] = useState('')
    const currentID = localStorage.getItem("ID");
    const getData = async () => {
        const postsCol = collection(db, 'postItem');
        const userSuggest = collection(db, 'users');
        const snapshot = await getDocs(postsCol);
        const snapUser = await getDocs(userSuggest);


        setUserSuggest(
            snapUser.docs.map(doc =>
            (
                {
                    id: doc.id,
                    userName: doc.data().username,
                    fullName: doc.data().fullname,
                    avatarUrl: doc.data().avatarUrl,
                }))

        )
        setPost(
            snapshot.docs.map(doc =>
            (
                {
                    id: doc.id,
                    post: doc.data()
                }))
        )
       
        // setCurrentUser(userGet)
    }
    useEffect(() => {
        getData();
    }, []);

    const userGet = userSuggest.find(item => item.id === currentID)
    setTimeout(() => {
        setCurrentUser(userGet)
   }, 50);
    return (
        <>

            <div id='newsfeed'>
                {/* <Carousel/> */}
                <Row>
                    <Col span={18} className="gutter-row posts ">
                        {/* Create new post */}
                        <Row className='al-center'>
                            <Col className="gutter-row" span={12} offset={4}>
                                <CreatePost avatar={currentUser === undefined ? '' : currentUser.avatarUrl} />
                            </Col>
                        </Row>
                        {/* Post list */}
                        <Row >
                            <Col className="gutter-row" span={12} offset={4}>
                                {post.map(({ id, post }) => <PostItem key={id} data={post} />)}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6} className="gutter-row suggestions">
                        <div className='flex mt-40'>
                            <h2 className='Sugget'>Suggestions </h2>
                            <Link>See all</Link>
                        </div>
                        <hr />
                        {userSuggest.filter((item, index) => index < 8).map((item) => <UserItem key={item.id} avatar={item.avatarUrl} userName={item.userName || item.fullName} userTitle ></UserItem>)}
                        <div className='flex mt-30'>
                            <h2 className='Friends'>Friends</h2>
                            <Link>See all</Link>
                        </div>
                        <hr />
                        <div className='overflow-hidden'>
                            {userSuggest.filter((item, index) => index < 14).map((item) => <UserItem key={item.id} avatar={item.avatarUrl} userName={item.userName || item.fullName}  ></UserItem>)}
                        </div>

                    </Col>
                </Row>
            </div>
        </>



    );
};

export default Newsfeed;
