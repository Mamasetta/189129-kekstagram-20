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

var PICTURE_COUNT = 25;

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

var generateComments = function (count) {
  var comments = [];

  for (var i = 0; i <= count; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
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
      likes: getRandomInteger(0, 500),
      comments: generateComments(getRandomInteger(0, 10)),
    });
  }
  return photos;
};
var photos = generatePhotos();

var renderPicture = function (pictureData) {
  var template = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureData.url;
  pictureElement.querySelector('.picture__likes').innerText = pictureData.likes;
  pictureElement.querySelector('.picture__comments').innerText = pictureData.comments.length;

  return pictureElement;
};

var picturesElement = document.querySelector('.pictures');

for (var i = 0; i < photos.length; i++) {
  picturesElement.appendChild(renderPicture(photos[i])
  );
}
