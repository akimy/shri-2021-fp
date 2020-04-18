import {__, allPass, any, compose, countBy, dissoc, equals, gte, identity, prop, values, propEq, complement} from 'ramda';
import {SHAPES, COLORS} from '../constants';

const {STAR, TRIANGLE, SQUARE, CIRCLE} = SHAPES;
const {BLUE, RED, WHITE, ORANGE, GREEN} = COLORS;

// Операции сравнения
const greaterOrEqualsThenTwo = gte(__, 2)
const greaterOrEqualsThenThree = gte(__, 3)
const anyGreaterOrEqualsThenThree = any(greaterOrEqualsThenThree);
const anyValueGreaterOrEqualsThenThree = compose(anyGreaterOrEqualsThenThree, values);

// Геттеры фигур
const getStar = prop(STAR);
const getTriangle = prop(TRIANGLE);
const getSquare = prop(SQUARE);
const getCircle = prop(CIRCLE);

// Cравнения цветов
const isRed = equals(RED);
const isWhite = equals(WHITE);
const isGreen = equals(GREEN);
const isOrange = equals(ORANGE);
const isBlue = equals(BLUE);
const dissocWhite = dissoc(WHITE);
const getGreen = prop(GREEN);
const twoGreens = propEq(GREEN, 2);
const oneReds = propEq(RED, 1);

// Все цвета
const numberOfColors = compose(countBy(identity), values);
const numberOfColorsWhitoutWhite = compose(dissocWhite, numberOfColors);

/* Базовые композиции геттеров и сравнения цветов */
const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);

const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);

const isWhiteTriangle = compose(isWhite, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);
const isNotWhiteTriangle = complement(isWhiteTriangle);

const isGreenSquare = compose(isGreen, getSquare);
const isOrangeSquare = compose(isOrange, getSquare);
const isWhiteSquare = compose(isWhite, getSquare);
const isNotWhiteSquare = complement(isWhiteSquare);

// Функции с специфичной для заданий логикой
const redEqualsBlue = ({blue, red}) => blue === red;
const squareEqualsTriangle = ({square, triangle}) => square === triangle;

const twoGreenColors = compose(twoGreens, numberOfColors);
const oneRedColor = compose(oneReds, numberOfColors);

const allHasColor = color => compose(propEq(color, 4), numberOfColors);

const numberOfGreenColors = compose(getGreen, numberOfColors);

// 1. Красная звезда, зеленый квадрат – все остальные белые.
export const validateFieldN1 = allPass([isRedStar, isGreenSquare, isWhiteTriangle, isWhiteCircle]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(greaterOrEqualsThenTwo, numberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqualsBlue, numberOfColors);

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = allPass([isRedStar, isBlueCircle, isOrangeSquare]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(anyValueGreaterOrEqualsThenThree, numberOfColorsWhitoutWhite);

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = allPass([isGreenTriangle, twoGreenColors, oneRedColor]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allHasColor(ORANGE);

// 8. Не красная и не белая звезда.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allHasColor(GREEN);

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = allPass([isNotWhiteSquare, isNotWhiteTriangle, squareEqualsTriangle]);
