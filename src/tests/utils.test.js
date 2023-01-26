import {createField, getFieldParamsByWinsLooses, MIN_DOTS, MIN_SIZE} from "../utils";
import {DotStatus} from "../types";

test("Creating empty field", () => {
  const fieldParams = {
    size: MIN_SIZE,
    dots: MIN_DOTS
  };
  const field = createField(fieldParams);
  expect(field.length).toEqual(MIN_SIZE);
  expect(field[0].length).toEqual(MIN_SIZE);
});

test("Creating empty field with some filled dots", () => {
  const fieldParams = {
    size: MIN_SIZE,
    dots: MIN_DOTS
  };
  const field = createField(fieldParams);
  let filledCount = 0;
  for (let i = 0; i < MIN_SIZE; i++) {
    for (let j = 0; j < MIN_SIZE; j++) {
      if (field[i][j]?.value !== undefined) {
        filledCount++;
      }
    }
  }
  expect(filledCount).toEqual(MIN_DOTS);
});

test("Filled dots has proper attributes", () => {
  const fieldParams = {
    size: MIN_SIZE,
    dots: MIN_DOTS
  };
  const field = createField(fieldParams);
  let filledDot;
  let x;
  let y;
  for (let i = 0; i < MIN_SIZE; i++) {
    for (let j = 0; j < MIN_SIZE; j++) {
      if (field[i][j]?.value !== undefined) {
        filledDot = field[i][j];
        x = j;
        y = i;
        break;
      }
    }
  }
  expect(filledDot.value).toBeGreaterThan(0);
  expect(filledDot.x).toEqual(x);
  expect(filledDot.y).toEqual(y);
  expect(filledDot.status).toEqual(DotStatus.Hidden);
});

test("testing difficulty rising", () => {
  let result = getFieldParamsByWinsLooses(0, 0);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS
  });

  result = getFieldParamsByWinsLooses(1, 0);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS + 1
  });

  result = getFieldParamsByWinsLooses(2, 0);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS + 2
  });

  result = getFieldParamsByWinsLooses(5, 0);
  expect(result).toEqual({
    size: MIN_SIZE + 1,
    dots: MIN_DOTS + 5
  });

  result = getFieldParamsByWinsLooses(10, 0);
  expect(result).toEqual({
    size: MIN_SIZE + 2,
    dots: MIN_DOTS + 10
  });
});

test("testing difficulty rising with looses", () => {
  let result = getFieldParamsByWinsLooses(0, 1);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS
  });

  result = getFieldParamsByWinsLooses(1, 1);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS
  });

  result = getFieldParamsByWinsLooses(2, 1);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS + 1
  });

  result = getFieldParamsByWinsLooses(5, 1);
  expect(result).toEqual({
    size: MIN_SIZE,
    dots: MIN_DOTS + 4
  });

  result = getFieldParamsByWinsLooses(10, 1);
  expect(result).toEqual({
    size: MIN_SIZE + 1,
    dots: MIN_DOTS + 9
  });
});
