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
      comments: generateComments(getRandomInteger(MIN, MAX_COMMENTS_NUMBER - 1)),
    });
  }
  return photos;
};
var photos = generatePhotos();

var pictureTemplate = document
  .querySelector('#picture')
  .content
  .querySelector('.picture');

var createPicture = function (pictureData) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureData.url;
  pictureElement.querySelector('.picture__likes').innerText = pictureData.likes;
  pictureElement.querySelector('.picture__comments').innerText = pictureData.comments.length;

  return pictureElement;
};

var renderPictures = function () {
  var picturesElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPicture(photos[i]));
  }

  picturesElement.appendChild(fragment);
};

renderPictures();

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');

var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
bigPictureImage.src = photos[0].url;

var likesCount = bigPicture.querySelector('.likes-count');
likesCount.textContent = photos[0].likes;

var commentsCount = bigPicture.querySelector('.comments-count');
commentsCount.textContent = photos[0].comments.length;

var commentTemplate = document
    .querySelector('#comment')
    .content
    .querySelector('.social__comment');

var createComment = function (commentData) {
  var commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = commentData.avatar;
  commentElement.querySelector('.social__picture').alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

var renderComments = function () {
  var commentsElement = document.querySelector('.social__comments');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos[0].comments.length; i++) {
    fragment.appendChild(createComment(photos[0].comments[i]));
  }

  commentsElement.appendChild(fragment);
};

renderComments();

var socialCaption = document.querySelector('.social__caption');
socialCaption.textContent = photos[0].description;

var socialCommentsCount = document.querySelector('.social__comment-count');
socialCommentsCount.classList.add('hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

var body = document.querySelector('body');
body.classList.add('modal-open');
