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

  useEffect(() => {
    // console.log('SetDetailPage useEffect called.');
    // console.log('location.state : ', location.state);
    // console.log('props', props);
    // console.log('props.history', props.history);
  });

  return (
    <div className="SetDetail-root">
      <div className="Home-BackgroundColor"></div>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout setLocale={setLocale} book={location.state.book} history={props} />
      </IntlProvider>
    </div>
  );
};

export default SetDetailPage;
