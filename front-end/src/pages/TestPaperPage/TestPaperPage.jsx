import React, { useEffect } from 'react';
import { useState } from 'react';
import './TestPaperPage.css';
import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import { Button } from 'react-bootstrap';
import Nanum from './fonts/Nanum.ttf';
import { useHistory } from 'react-router-dom';

Font.register({
  family: 'Nanum',
  src: Nanum,
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 45,
    paddingHorizontal: 35,
    fontFamily: 'Nanum',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Nanum',
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Nanum',
  },
  subtitle: {
    fontSize: 16,
    margin: 12,
    fontFamily: 'Nanum',
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Nanum',
  },
  image: {
    height: 150,
    marginBottom: 30,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 15,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 25,
    left: 35,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  QuizNum: {
    fontSize: 22,
    fontFamily: 'Nanum',
    color: 'red',
    letterSpacing: 7,
  },
  QuizContent: {
    fontSize: 14,
    fontFamily: 'Nanum',
    color: '#4f4c4c',
  },
});

const TestPaperPage = (props) => {
  const cards = props.location.state.cardList;
  const book = props.location.state.book;
  const [defaultCase, SetDefaultCase] = useState(true);

  const [isBackButtonClicked, setBackbuttonPress] = useState(false);

  useEffect(() => {
    // window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', onBackButtonEvent);

    // window.removeEventListener('popstate', onBackButtonEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onBackButtonEvent = (e) => {
    // e.preventDefault();
    console.log('백버튼');
    window.location.reload();
  };

  if (cards != null) {
    return (
      <div className="testpaper-root">
        <div className="test-category">
          <button className="case1" onClick={() => SetDefaultCase(true)}>
            <p>단어와 뜻 모두보기</p>
          </button>
          <button className="case2" onClick={() => SetDefaultCase(false)}>
            <p>단어만 보기</p>
          </button>
        </div>
        <PDFViewer>
          {defaultCase ? (
            <Document>
              <Page size="A4" style={styles.body} orientation="portrait" wrap>
                <Text style={styles.title}>{book.title + '\n\n'}</Text>

                {cards.map((data, index) => (
                  <Text key={index}>
                    <Text style={styles.QuizNum}>
                      {' '}
                      {'문제 '}
                      {index + 1 + '' + '\n\n'}
                    </Text>

                    <Text style={styles.QuizContent}>
                      {'단어 : ' + data.word + '\n\n'} {'뜻     :  ' + data.meaning} {'\n\n\n\n\n'}
                    </Text>
                  </Text>
                ))}

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
              </Page>
            </Document>
          ) : (
            <Document>
              <Page style={styles.body} orientation="portrait" wrap={true}>
                <Text style={styles.title}>{book.title + '\n\n'}</Text>

                {cards.map((data, index) => (
                  <Text key={index}>
                    <Text style={styles.QuizNum}>
                      {' '}
                      {'문제'}
                      {index + 1 + '' + '\n\n'}
                    </Text>
                    <Text style={styles.QuizContent}>
                      {'단어 : ' + data.word + '\n\n'} {'뜻     :'} {'\n\n\n\n\n'}
                    </Text>
                  </Text>
                ))}

                <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
              </Page>
            </Document>
          )}
        </PDFViewer>
      </div>
    );
  } else {
    <div>카드가 없습니다</div>;
  }
};

export default TestPaperPage;
