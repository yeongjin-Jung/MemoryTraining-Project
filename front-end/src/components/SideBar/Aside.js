import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import sidebarBg from '../../assets/bg1.jpg';
import { Link } from 'react-router-dom';
import iconMemorize from '../../assets/images/memorize.png';
import iconTest from '../../assets/images/test.png';
import iconSetting from '../../assets/images/setting.png';
import axios from 'axios';
import SERVER from '../../api/server';

const Aside = ({ book, image, collapsed, rtl, toggled, handleToggleSidebar, history }) => {
  const intl = useIntl();

  const [cardList, setCardList] = useState([]);
  const getCardList = async () => {
    await axios.get(SERVER.BASE_URL + SERVER.ROUTES.getbook + book.id).then((res) => {
      console.log('res: ', res);
      setCardList(res.data);
    });
  };

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <ProSidebar image={image ? sidebarBg : false} rtl={rtl} collapsed={collapsed} toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: '1.8em',
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'white',
          }}
        >
          내 세트
        </div>
        {/* <div style={{ height: '2rem' }}></div> */}
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          {/* <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">{intl.formatMessage({ id: 'new' })}</span>}
          > */}

          <MenuItem
            onClick={() => {
              history.history.push({ pathname: '/study', state: { cardList: cardList, book: book } });
            }}
            icon={<img src={iconMemorize} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            암기하기
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.history.push({ pathname: '/quiz', state: { book: book } });
            }}
            icon={<img src={iconTest} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            테스트
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.history.push({ pathname: '/set-modify', state: { cardList: cardList, book: book } });
            }}
            icon={<img src={iconSetting} style={{ width: '40px', backgroundColor: 'white', borderRadius: '50%' }} />}
          >
            세트 수정
          </MenuItem>
        </Menu>
        {/* <Menu iconShape="circle">
          <SubMenu
            // suffix={<span className="badge yellow">3</span>}
            title={intl.formatMessage({ id: 'withSuffix' })}
            icon={<FaRegLaughWink />}
          >
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu>
          <SubMenu prefix={<span className="badge gray">3</span>} title={intl.formatMessage({ id: 'withPrefix' })} icon={<FaHeart />}>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 1</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 2</MenuItem>
            <MenuItem>{intl.formatMessage({ id: 'submenu' })} 3</MenuItem>
          </SubMenu>
        </Menu> */}
      </SidebarContent>

      {/* <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank" className="sidebar-btn" rel="noopener noreferrer">
            <FaGithub />
            <span> {intl.formatMessage({ id: 'viewSource' })}</span>
          </a>
        </div>
      </SidebarFooter> */}
    </ProSidebar>
  );
};

export default Aside;
