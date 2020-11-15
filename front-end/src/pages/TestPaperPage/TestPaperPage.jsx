/* eslint-disable */

import React from 'react';
import './TestPaperPage.css';
import { Document, Page, Text, View, Font, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import Nanum from './fonts/Nanum.ttf';

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
    fontSize: 18,
    fontFamily: 'Nanum',
    color: 'red',
    letterSpacing: 2,
  },
  QuizContent: {
    fontSize: 14,
    fontFamily: 'Nanum',
    color: '#4f4c4c',
    letterSpacing: 2,
  },
});

const TestPaperPage = (props) => {
  const cards = props.location.state.cardList;
  const book = props.location.state.book;

  if (cards != null) {
    return (
      <div className="testpaper-root">
        <div className="test-category">
          <button
            className="case1"
            onClick={() => {
              props.history.push({ pathname: '/test-paper', state: { cardList: cards, book: book, case: 'case1' } });
            }}
          >
            <p>단어와 뜻 모두보기</p>
          </button>
          <button
            className="case2"
            onClick={() => {
              props.history.push({ pathname: '/test-only-word', state: { cardList: cards, book: book } });
            }}
          >
            <p>단어만 보기</p>
          </button>
          <button
            className="case3"
            onClick={() => {
              props.history.push({ pathname: '/test-only-meaning', state: { cardList: cards, book: book } });
            }}
          >
            <p>뜻만 보기</p>
          </button>
        </div>
        <PDFViewer>
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
                    {'단어 : ' + data.word + '\n\n'} {'뜻   : ' + data.meaning} {'\n\n\n\n\n'}
                  </Text>
                </Text>
              ))}

              <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
          </Document>
        </PDFViewer>
      </div>
    );
  } else {
    <div>카드가 없습니다</div>;
  }
};

export default TestPaperPage;
