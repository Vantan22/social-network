import React, { useState, useEffect, useMemo } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Col, Row } from 'antd';
import '../homepage/Homepage.css'
import icon_newsfeed from '../../img/menu_icon/group.svg'
import icon_messenger from '../../img/menu_icon/icon_message.svg'
import icon_noti from '../../img/menu_icon/icon__Component.svg'
import icon_search from '../../img/menu_icon/search-favorite.svg'
import icon_logout from '../../img/menu_icon/logouticon.svg'
import avatarUser from '../../img/person-img/meovangogh.jpeg'
// import Signin from '../../Pages/Signin';
import logo from '../../img/smail logologo.svg'
import NavigationItem from './NavigationItem';
import Search from '../../UI/Search'
import Notification from '../../UI/Notification'
import ModalCreatePost from '../../Components/modal/ModalCreatePost'
import { auth, db } from "../../Api/firebase";
import { collection, getDocs } from 'firebase/firestore'
import { getAuth, signOut } from "firebase/auth";
import { message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
// import firebase from 'firebase'
// import { Auth } from 'firebase/auth';
const authc = getAuth();

// console.log("Auth:", auth);
// const avatar = auth.currentUser.photoURL 
const HomePage = () => {
  const navigate = useNavigate();
  const [modalActive, setModalActive] = useState(false)
  const [menuActive, setMenuactive] = useState(true)
  const [menuType, setMenuType] = useState('DEAULT')
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState('');

  const key = 'updatable';

  const getData = async () => {
    const user = collection(db, 'users');
    const snapshot = await getDocs(user);

    setUser(
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
  setTimeout(() => {
    setAvatarUrl(userGet)
  }, 50)
  const currentID = localStorage.getItem("ID");
  const userGet = user.find(item => item.id == currentID)
  console.log(userGet);
  useEffect(() => {
    getData();
  }, []);

  const signOutt = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {

      signOut(authc).then(() => {
        localStorage.removeItem('ID')

        messageApi.open({
          key,
          type: 'success',
          content: 'Sign Out',
          duration: 1,
          onClose: (() => { navigate("login") })
        });
      }).catch((error) => {
        messageApi.open({
          key,
          type: 'error',
          content: 'Logout failed, please try again!',
          duration: 1,

        });
        // An error happened.
      });

    }, 1000);
  };

  const NOTI_MENU = "NOTI"
  const SEARCH_MENU = "SEARCH"

  const collapseLeftMenu = (selectedMenu) => {
    if (menuType === selectedMenu) {
      setMenuactive(true);
    }
    else {
      setMenuType(selectedMenu);
      setMenuactive(false)
      console.log('1');
    }

  }

  return (
    // loading ? (<Spin indicator={antIcon} />) : 
    <>
      {modalActive ? <ModalCreatePost  /> : ''}
      {contextHolder}
      <div className={`layout-bg ${menuType === SEARCH_MENU ? 'active' : ''}`}><Search defaultMenu={menuActive} /></div>
      <div className={`layout-bg ${menuType === NOTI_MENU ? 'active' : ''}`}><Notification defaultMenu={menuActive} /></div>
      <Row gutter={16}>
        <Col className="gutter-row" span={6}>
          <div className={`tab-nav ${menuActive ? '' : 'active'}`} >
            {menuActive ? <Link className="logo" to='#'>
              Social Network
            </Link> : <Link><img src={logo} title="logo" className='logomini' /></Link>}

            <div className={`nav-space ${menuActive ? '' : 'active'}`}>
              <div className="tab-nav-menu">
                {menuActive ? <h2>Menus</h2> : <div> </div>}
                <nav className={`nav-menu-list ${menuActive ? '' : 'active'}`}>
                  <Link className='link-nav icon-menu' to='./User' >
                    <NavigationItem icon={avatarUrl === undefined ? '' : avatarUrl.avatarUrl} mode={menuActive} name='Profile' />
                  </Link>
                  <Link className='link-nav icon-menu' to='/' > <NavigationItem icon={icon_newsfeed} mode={menuActive} name='Newsfeed' /></Link>
                  <Link className='link-nav icon-menu' to='#' onClick={(e) => collapseLeftMenu(SEARCH_MENU)}>  <NavigationItem link='#' icon={icon_search} mode={menuActive} name='Search' /></Link>
                  <Link className='link-nav icon-menu' to='Messenger' ><NavigationItem icon={icon_messenger} mode={menuActive} name='Message' /></Link>
                  <Link className='link-nav icon-menu' to='#' onClick={(e) => collapseLeftMenu(NOTI_MENU)}><NavigationItem icon={icon_noti} mode={menuActive} name='Notifications' /></Link>
                </nav>
              </div>
              <div className="tab-nav-more">
                <Link className="link-nav" onClick={signOutt} >
                  <img src={icon_logout} className="icon icon-menu" />
                  <span className="text-menu">Log out</span>
                </Link>

              </div>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={18}>
          <Outlet />
        </Col>

      </Row>
    </>


  );
};

export default HomePage;
