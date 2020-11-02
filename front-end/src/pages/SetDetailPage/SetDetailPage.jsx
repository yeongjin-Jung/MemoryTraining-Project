import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import './SetDetailPage.css';
import Layout from '../../components/SideBar/Layout';
import messages from '../../components/SideBar/messages';
import '../../components/SideBar/sidebar.scss';

const SetDetailPage = () => {
  const [locale, setLocale] = useState('en');
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
