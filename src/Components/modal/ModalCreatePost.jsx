import icon_prev from '../../img/prev_icon.png'
import icon_next from '../../img/icon__next.png'
import React, { useState, useRef, useEffect } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import './ModalCreatePost.css'
import { auth, db } from "../../Api/firebase";
import { collection, getDocs } from 'firebase/firestore'
import { Row, Col, Carousel } from 'antd'
import user from '../../data/data';

import { message, Upload } from 'antd';
import { Input } from 'antd';
const { Dragger } = Upload;
const { TextArea } = Input;
// const [file, setFile] = useState([])
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // accept: 'text/csv,application/vnd.ms-excel',
    // defaultFileList : setFile(e),
    showUploadList : {showRemoveIcon :true},
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const ModalCreatePost = () => {
    // const [dragActive, setDragActive] = useState(false);
    const [currentUser, setCurrentUser] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [image, setImage] = useState([])
    const getData = async () => {
        const currentUser = collection(db, 'users');
        const snapshot = await getDocs(currentUser);
        //   const [avatarUrl, setAvatarUrl] = useState('');
        //   const [userName, setAvatarUrl] = useState('');

        // console.log(snapUser.docs);
        setCurrentUser(
            snapshot.docs.map(doc =>
            (
                {
                    id: doc.id,
                    avatarUrl: doc.data().avatarUrl,
                    userName: doc.data().username,
                    fullName: doc.data().fullname,
                }))

        )

    }

    useEffect(() => {
        getData();
    }, []);
    setTimeout(() => {
        const currentID = localStorage.getItem("ID");
        const userGet = currentUser.find(item => item.id == currentID)
        setUserInfo(userGet)

    }, 50)

    // function DragDropFile() {
    //     // drag state
    //     // ref
    //     const inputRef = useRef(null);

    //     // handle drag events
    //     const handleDrag = function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         if (e.type === "dragenter" || e.type === "dragover") {
    //             setDragActive(true);
    //         } else if (e.type === "dragleave") {
    //             setDragActive(false);
    //         }
    //     };

    //     // triggers when file is dropped
    //     const handleDrop = function (e) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         setDragActive(false);
    //         if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    //             console.log(e.dataTransfer.files);

    //             setImage(e.target.files)
    //         }
    //     };


    //     const handleChange = function (e) {
    //         e.preventDefault();
    //         if (e.target.files && e.target.files[0]) {

    //             setImage(e.target.files)
    //         }
    //     };

    //     const onButtonClick = () => {
    //         inputRef.current.click();
    //     };

    //     return (
    //         <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
    //             <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
    //             <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
    //                 <div>
    //                     <InboxOutlined className='icon-file-upload' />
    //                     <p>Drag and drop your file here or</p>
    //                     <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
    //                 </div>
    //             </label>
    //             {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
    //         </form>
    //     );
    // };

    const SampleNextArrow = (props) => {
        const { onClick } = props

        return (
            // <RightCircleFilled />
            <img src={icon_next} alt="" className='icon icon_next_slider' onClick={onClick} />
        )
    }
    const SamplePrevArrow = (props) => {
        const { onClick } = props
        return (
            <img src={icon_prev} alt="" className='icon icon_prev_slider' onClick={onClick} />

        )
    }
    const settings = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }
    const CarouselArrows = () => {
        return (
            <>
                <Row justify="center" align={'center'} height={'100%'}>
                    <Col span={24} className='abcasdasd'>
                        <Carousel arrows {...settings}>


                            {user.map((e) => {
                                return (
                                    <img key={e.id} src={e.avatarURL} style={{ height: '100%', width: '100%', objectFit: 'contain' }}></img>
                                )
                            })}


                        </Carousel>
                    </Col>
                </Row>
            </>
        )
    }
    const submitHandler = (e) => {
        e.preventDefault()
    }

    const handleInputValue = (e) => {
        // console.log(e.target.value);
    }
    return (
        <form onSubmit={submitHandler} className='modal-create-post'>
            <div className="modal-create-post-wrapper">
                <header>
                    <h1 className="header-title">Create new post</h1>
                    <span type='submit'>Post</span>
                </header>
                <main className="modal-create-post-content">
                    <div className="modal-create-post-content-image">

                        {Array.from(image) !== [] ? <CarouselArrows /> : <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>}




                    </div>
                    <div className="modal-create-post-content-addinfo">
                        <div className="user_create">
                            <img src={userInfo === undefined ? '' : userInfo.avatarUrl} alt="" />
                            <span className="user_create-name">{userInfo === undefined ? '' : userInfo.userName === '' ? userInfo.fullName : userInfo.userName}</span>
                        </div>
                        <div className="user_input">
                            <TextArea className='user_input__input' placeholder="Write a caption ..." autoSize={{
                                minRows: 2,
                                maxRows: 6,
                            }} maxLength='2500' bordered={false} showCount onChange={handleInputValue} />
                        </div>
                    </div>
                </main>
            </div>
        </form>

    );
};

export default ModalCreatePost;
