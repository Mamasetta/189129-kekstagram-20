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

  photos.forEach(function (photo) {
    fragment.appendChild(createPicture(photo));
  });

  picturesElement.appendChild(fragment);
};

renderPictures();

var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

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

  photos[0].comments.forEach(function (photoComment) {
    fragment.appendChild(createComment(photoComment));
  });

  commentsElement.appendChild(fragment);
};

renderComments();

var socialCaption = document.querySelector('.social__caption');
socialCaption.textContent = photos[0].description;

var socialCommentsCount = document.querySelector('.social__comment-count');
socialCommentsCount.classList.add('hidden');

var commentsLoader = document.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');

var uploadFile = document.querySelector('#upload-file');
var body = document.querySelector('body');
var imageUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');

var KeyCode = {
  ENTER: 13,
  ESCAPE: 27
};

var onPopupEscPress = function (evt) {
  if (evt.key === KeyCode.ESCAPE) {
    evt.preventDefault();
    closeUploadFile();
  }
};

var imageUploadScale = imageUploadOverlay.querySelector('.img-upload__scale');
var scaleControlSmaller = imageUploadScale.querySelector('.scale__control--smaller');
var scaleControlBigger = imageUploadScale.querySelector('.scale__control--bigger');
var scaleControlValue = imageUploadScale.querySelector('.scale__control--value');

var imageUploadPreview = imageUploadOverlay.querySelector('.img-upload__preview img');
var imageUploadEffectsContainer = imageUploadOverlay.querySelector('.img-upload__effects');
var imageUploadEffectLevel = imageUploadOverlay.querySelector('.img-upload__effect-level');
var effectLevelPin = imageUploadOverlay.querySelector('.effect-level__pin');
var effectLevelLine = imageUploadOverlay.querySelector('.effect-level__line');

var Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  INITIAL: 100
};
var currentScaleValue = Scale.INITIAL;

var Filter = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  ORIGIN: 'none'
};

var EffectsMaxValue = {
  PHOBOS: 3,
  MARVIN: 100,
  HEAT: 3
};

var currentEffect = Filter.ORIGIN;

var resizePhoto = function () {
  scaleControlValue.value = currentScaleValue + '%';
  imageUploadPreview.style.transform = 'scale(' + currentScaleValue * 0.01 + ')';
};

var onScaleSmallerPress = function () {
  if (currentScaleValue <= Scale.INITIAL && currentScaleValue > Scale.MIN) {
    currentScaleValue -= Scale.STEP;
    resizePhoto();
  }
};

var onScaleBiggerPress = function () {
  if (currentScaleValue >= Scale.MIN && currentScaleValue < Scale.INITIAL) {
    currentScaleValue += Scale.STEP;
    resizePhoto();
  }
};

var selectEffect = function (value) {
  switch (currentEffect) {
    case Filter.CHROME :
      return 'grayscale(' + value + ')';
    case Filter.SEPIA:
      return 'sepia(' + value + ')';
    case Filter.MARVIN:
      return 'invert(' + value * EffectsMaxValue.MARVIN + '%)';
    case Filter.PHOBOS:
      return 'blur(' + EffectsMaxValue.PHOBOS * value + 'px)';
    case Filter.HEAT:
      return 'brightness(' + EffectsMaxValue.HEAT * value + ')';
    default:
      return 'none';
  }
};

var onEffectChange = function (evt) {
  currentEffect = evt.target.value;
  imageUploadPreview.className = '';
  imageUploadPreview.style.filter = Filter.ORIGIN;
  imageUploadPreview.classList.add('effects__preview--' + evt.target.value);
  if (evt.target.value !== 'none') {
    imageUploadEffectLevel.classList.remove('hidden');
  } else {
    imageUploadEffectLevel.classList.add('hidden');
  }
  imageUploadPreview.style.filter = selectEffect(1);
};

var getSaturationValue = function (evt) {
  return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
};

var onSaturationChange = function (evt) {
  var value = getSaturationValue(evt);
  imageUploadPreview.style.filter = selectEffect(value);
};

var hashtag = imageUploadOverlay.querySelector('.text__hashtags');
var HASHTAGS_MAX = 5;
var hashtagReg = /^#[a-zа-яA-ZА-Я0-9]*$/;

var validateHashtag = function (value) {
  var hashtags = value.toLowerCase().trim().split(/\s+/);

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#') {
      return '# всему голова! Начни хэш-тег с неё!';
    }

    if (hashtags[i].lastIndexOf('#') !== 0) {
      return 'Не торопись! Разделяй пробелом хэш-теги!';
    }

    if (!hashtagReg.test(hashtags[i])) {
      return 'Ой-ой-ой! Можно использовать только буквы и цифры!';
    }

    var findDuplicateHashtags = hashtags.filter(function (item) {
      return item === hashtags[i];
    });

    if (findDuplicateHashtags.length > 1) {
      return 'Не повторяйся! Не надо так...';
    }
  }

  if (hashtags.length > HASHTAGS_MAX) {
    return 'Не пиши поэму! Можно только 5 хэш-тегов!';
  }

  return '';
};

var onHashtagValidationInput = function (evt) {
  hashtag.setCustomValidity(validateHashtag(evt.target.value));
};

var onElementFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onElementBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var openUploadFile = function () {
  imageUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
  hashtag.addEventListener('focus', onElementFocus);
  hashtag.addEventListener('blur', onElementBlur);
  resizePhoto();
  scaleControlSmaller.addEventListener('click', onScaleSmallerPress);
  scaleControlBigger.addEventListener('click', onScaleBiggerPress);
  imageUploadEffectLevel.classList.add('hidden');
  imageUploadEffectsContainer.addEventListener('change', onEffectChange);
  effectLevelPin.addEventListener('mouseup', onSaturationChange);
  hashtag.addEventListener('input', onHashtagValidationInput);
};

var closeUploadFile = function () {
  imageUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscPress);
  hashtag.removeEventListener('focus', onElementFocus);
  hashtag.removeEventListener('blur', onElementBlur);
  scaleControlSmaller.removeEventListener('click', onScaleSmallerPress);
  scaleControlBigger.removeEventListener('click', onScaleBiggerPress);
  imageUploadEffectLevel.classList.remove('hidden');
  imageUploadEffectsContainer.removeEventListener('change', onEffectChange);
  effectLevelPin.removeEventListener('mouseup', onSaturationChange);
  hashtag.removeEventListener('input', onHashtagValidationInput);
  uploadFile.value = '';
};

uploadFile.addEventListener('click', function (evt) {
  evt.preventDefault();
  openUploadFile();
});

uploadFile.addEventListener('keydown', function (evt) {
  if (evt.key === KeyCode.ENTER) {
    evt.preventDefault();
    openUploadFile();
  }
});

uploadCancel.addEventListener('click', function () {
  closeUploadFile();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === KeyCode.ENTER) {
    closeUploadFile();
  }
});
