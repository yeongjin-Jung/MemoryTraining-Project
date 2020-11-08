import React, { useEffect } from 'react';
import { useState } from 'react';
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
    fontSize: 22,
    fontFamily: 'Nanum',
    color: 'red',
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

  // const [randomcard, setRandomcard] = useState([]);

  // function shuffleArray(array) {
  //   let i = array.length - 1;
  //   for (; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     const temp = array[i];
  //     array[i] = array[j];
  //     array[j] = temp;
  //   }
  //   return array;
  // }

  // useEffect(() => {
  //   console.log('book', book);
  //   setRandomcard(shuffleArray(cards));
  // }, []);

  // function Card({ data, index }) {
  //   return (
  //     <div className="testpaper-qestion">
  //       <Text className="qestion-problem">
  //         {index}번 . {data.word}
  //       </Text>
  //       <Text className="qestion-answer">{data.meaning}</Text>
  //     </div>
  //   );
  // }
  const [defaultCase, SetDefaultCase] = useState(true);

  return (
    <div className="testpaper-root">
      <div className="test-category">
        <button className="case1" onClick={() => SetDefaultCase(true)}>
          <span>단어와 뜻 모두보기</span>
        </button>
        <button className="case2" onClick={() => SetDefaultCase(false)}>
          <span>단어만 보기</span>
        </button>
      </div>
      {defaultCase ? (
        <PDFViewer>
          <Document>
            <Page size="A4" style={styles.body} orientation="portrait" wrap>
              <Text style={styles.title}>{book.title + '\n\n'}</Text>

              {cards.map((data, index) => (
                <>
                  <Text style={styles.QuizNum}>
                    {' '}
                    {'문제'}
                    {index + 1 + '' + '\n\n'}
                  </Text>

                  <Text style={styles.QuizContent} key={index}>
                    {'단어 : ' + data.word + '\n\n'} {'뜻     :  ' + data.meaning} {'\n\n\n\n\n'}
                  </Text>
                </>
              ))}

              <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
          </Document>
        </PDFViewer>
      ) : (
        <PDFViewer>
          <Document>
            <Page style={styles.body} orientation="portrait" wrap={true}>
              <Text style={styles.title}>{book.title + '\n\n'}</Text>

              {cards.map((data, index) => (
                <>
                  <Text style={styles.QuizNum}>
                    {' '}
                    {'문제'}
                    {index + 1 + '' + '\n\n'}
                  </Text>
                  <Text style={styles.QuizContent}>
                    {'단어 : ' + data.word + '\n\n'} {'뜻     :'} {'\n\n\n\n\n'}
                  </Text>
                </>
              ))}

              <Text style={styles.footer} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
            </Page>
          </Document>
        </PDFViewer>
      )}
    </div>
    // <div className="testpaper-root">
    //   <button
    //     className="backbtn"
    //     onClick={() => {
    //       props.history.push({ pathname: '/set-detail', state: { book: book } });
    //     }}
    //   >
    //     <p className="backbtn-text">뒤로가기</p>
    //   </button>
    //   <div className="Home-BackgroundColor"></div>
    //   <Pdf targetRef={ref} filename="나만의 시험지.pdf">
    //     {({ toPdf }) => (
    //       <button className="pdf-create-btn" onClick={toPdf}>
    //         <p>PDF로 다운로드</p>
    //       </button>
    //     )}
    //   </Pdf>
    //   <div className="testpaper-context">
    //     <div className="testpaper-context-main">
    //       <PDFViewer>
    //         <Document>
    //           <Page style={styles.page}>
    //             <Text>
    //               {/* <div ref={ref}>
    //                 <div className="testpaper-title">
    //                   <Text>{book.title}</Text>
    //                 </div>
    //                 <div className="testpaper-qestion-container">
    //                   {randomcard.map((data, index) => (
    //                     <div className="testpaper-qestion-box" key={index}>
    //                       <Card data={data} index={index} />
    //                     </div>
    //                   ))}
    //                 </div>
    //               </div> */}
    //               <Text fixed>{book.title}</Text>
    //             </Text>
    //           </Page>
    //         </Document>
    //       </PDFViewer>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TestPaperPage;
