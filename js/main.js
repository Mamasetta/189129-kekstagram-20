'use strict';

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

var MIN = 0;
var MIN_AVATAR = 1;
var MAX_AVATAR = 6;
var MAX_LIKES_NUMBER = 500;
var MAX_COMMENTS_NUMBER = 10;
var PICTURE_COUNT = 25;

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (elements) {
  return elements[getRandomInteger(MIN, elements.length - 1)];
};

var generateComments = function (count) {
  var comments = [];

  for (var i = 0; i <= count; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomInteger(MIN_AVATAR, MAX_AVATAR) + '.svg',
      message: getRandomElement(MESSAGE_SENTENCES),
      name: getRandomElement(COMMENTATORS_NAMES)
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
      likes: getRandomInteger(MIN, MAX_LIKES_NUMBER),
      comments: generateComments(getRandomInteger(MIN, MAX_COMMENTS_NUMBER)),
    });
  }
  return photos;
};
var photos = generatePhotos();
var template = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPicture = function (pictureData) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureData.url;
  pictureElement.querySelector('.picture__likes').innerText = pictureData.likes;
  pictureElement.querySelector('.picture__comments').innerText = pictureData.comments.length;

  return pictureElement;
};

var picturesElement = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}

picturesElement.appendChild(fragment);
