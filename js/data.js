'use strict';

(function () {
  var MESSAGE_SENTENCES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var COMMENTATORS_NAMES = [
    'Юра',
    'Артём',
    'Лиза',
    'Алина',
    'Варя',
    'Макс'
  ];


  var MIN_AVATAR = 1;
  var MAX_AVATAR = 6;
  var MAX_LIKES_NUMBER = 500;
  var MAX_COMMENTS_NUMBER = 10;
  var PICTURE_COUNT = 25;

  var generateComments = function (count) {
    var comments = [];

    for (var i = 0; i <= count; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.utils.getRandomInteger(MIN_AVATAR, MAX_AVATAR) + '.svg',
        message: window.utils.getRandomElement(MESSAGE_SENTENCES),
        name: window.utils.getRandomElement(COMMENTATORS_NAMES)
      });
    }

    return comments;
  };

  var generatePhotos = function () {
    var photos = [];
    for (var i = 1; i <= PICTURE_COUNT; i++) {
      photos.push({
        url: 'photos/' + i + '.jpg',
        description: 'описание',
        likes: window.utils.getRandomInteger(window.utils.MIN, MAX_LIKES_NUMBER),
        comments: generateComments(window.utils.getRandomInteger(window.utils.MIN, MAX_COMMENTS_NUMBER - 1)),
      });
    }
    return photos;
  };

  window.data = {
    generatePhotos: generatePhotos
  };
})();
