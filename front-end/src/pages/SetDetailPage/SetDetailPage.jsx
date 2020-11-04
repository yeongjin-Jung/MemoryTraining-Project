import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import './SetDetailPage.css';
import Layout from '../../components/SideBar/Layout';
import messages from '../../components/SideBar/messages';
import '../../components/SideBar/sidebar.scss';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

const SetDetailPage = (props) => {
  const [locale, setLocale] = useState('en');
  const location = useLocation();
  const [book, setBook] = useState({});

  // set_id로 axios 요청합니다.
  useEffect(() => {
    console.log('SetDetailPage useEffect called.');
    console.log('location : ', location);
    console.log('location.user : ', location.user);
    // setBook(location.state.user);

    console.log('after setBook called. : ', book);
  });

  return (
    <div className="SetDetail-root">
      <div className="Home-BackgroundColor"></div>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout setLocale={setLocale} />
      </IntlProvider>
    </div>
  );
};

export default SetDetailPage;
