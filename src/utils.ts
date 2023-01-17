import {DotStatus, Field} from "./types";

export const TIME_TO_REMEMBER = 5;
export const TIME_TO_GUESS = 30;
export const WIDTH = 6;
export const HEIGHT = 6;
export const DOTS_TO_FILL = 5;

export function createField(): Field {
  const field: Field = [];
  for (let i = 0; i < HEIGHT; i++) {
    field[i] = [];
    for (let j = 0; j < WIDTH; j++) {
      field[i][j] = {
        status: DotStatus.Empty,
        x: j,
        y: i,
      };
    }
  }
  for(let dotsPlaced = 0; dotsPlaced < DOTS_TO_FILL; dotsPlaced++) {
    let dotHavePlaced = false;
    do {
      const x = ~~(Math.random() * WIDTH);
      const y = ~~(Math.random() * HEIGHT);
      if (field[y][x]?.value === undefined) {
        field[y][x] = {
          ...field[y][x],
          value: dotsPlaced + 1,
          status: DotStatus.Hidden
        };
        dotHavePlaced = true;
      }
    } while (!dotHavePlaced);
  }
  return field;
}
