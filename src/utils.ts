import {DotStatus, Field, FieldParams} from "./types";

export const TIME_TO_REMEMBER = 5;
export const TIME_TO_GUESS = 30;
export const MIN_SIZE = 6;
export const MAX_SIZE = 6;
export const MIN_DOTS = 5;
export const MAX_DOTS = 5;

export function getFieldParamsByWinsLooses(wins: number, loose: number): FieldParams {
  return {
    size: MIN_SIZE,
    dots: MIN_DOTS
  }
}

export function createField(fieldParams: FieldParams): Field {
  const field: Field = [];
  for (let i = 0; i < fieldParams.size; i++) {
    field[i] = [];
    for (let j = 0; j < fieldParams.size; j++) {
      field[i][j] = {
        status: DotStatus.Empty,
        x: j,
        y: i,
      };
    }
  }
  for(let dotsPlaced = 0; dotsPlaced < fieldParams.dots; dotsPlaced++) {
    let dotHavePlaced = false;
    do {
      const x = ~~(Math.random() * fieldParams.size);
      const y = ~~(Math.random() * fieldParams.size);
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
