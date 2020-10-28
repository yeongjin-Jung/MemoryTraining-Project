import React from 'react';
import './StudyPage.css';
import $ from 'jquery';

import Flippy, { FrontSide, BackSide } from 'react-flippy';
const StudyPage = () => {
  const clickHandler = (e) => {
    $('.card').toggleClass('flipped');
  };
  var $card = $('.card');
  var lastCard = $('.card-list .card').length - 1;

  const Next = (e) => {
    var prependList = function () {
      if ($('.card').hasClass('activeNow')) {
        var $slicedCard = $('.card').slice(lastCard).removeClass('transformThis activeNow');
        $('ul').prepend($slicedCard);
      }
    };
    $('li').last().removeClass('transformPrev').addClass('transformThis').prev().addClass('activeNow');
    setTimeout(function () {
      prependList();
    }, 150);
  };

  const Prev = (e) => {
    var appendToList = function () {
      if ($('.card').hasClass('activeNow')) {
        var $slicedCard = $('.card').slice(0, 1).addClass('transformPrev');
        $('.card-list').append($slicedCard);
      }
    };

    $('li').removeClass('transformPrev').last().addClass('activeNow').prevAll().removeClass('activeNow');
    setTimeout(function () {
      appendToList();
    }, 150);
  };

  return (
    <div class="container">
      <div class="card-stack">
        <a class="buttons prev" href="#" onClick={Prev}>
          {'<'}
        </a>
        <ul class="card-list">
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
          <li class="card"></li>
        </ul>
        <a class="buttons next" href="#" onClick={Next}>
          {'>'}
        </a>
      </div>
    </div>
  );
};

export default StudyPage;
