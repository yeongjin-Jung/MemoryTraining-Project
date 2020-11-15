import React, { useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { useLocation } from 'react-router-dom';
import Layout from '../../components/SideBar/Layout';
import messages from '../../components/SideBar/messages';
import './SetDetailPage.css';
import '../../components/SideBar/sidebar.scss';


const SetDetailPage = (props) => {
  const [locale, setLocale] = useState('en');
  const location = useLocation();
  const [book, setBook] = useState({});

  useEffect(() => {
    // //수정 console.log('SetDetailPage useEffect called.');
    // //수정 console.log('location.state : ', location.state);
    // //수정 console.log('props', props);
    // //수정 console.log('props.history', props.history);
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
