import {createField, DOTS_TO_FILL, HEIGHT, WIDTH} from "../utils";
import {DotStatus} from "../types";

test("Creating empty field", () => {
  const field = createField();
  expect(field.length).toEqual(HEIGHT);
  expect(field[0].length).toEqual(WIDTH);
});

test("Creating empty field with some filled dots", () => {
  const field = createField();
  let filledCount = 0;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
      if (field[i][j]?.value !== undefined) {
        filledCount++;
      }
    }
  }
  expect(filledCount).toEqual(DOTS_TO_FILL);
});

test("Filled dots has proper attributes", () => {
  const field = createField();
  let filledDot;
  let x;
  let y;
  for (let i = 0; i < HEIGHT; i++) {
    for (let j = 0; j < WIDTH; j++) {
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
