
export enum DotStatus {
  Empty,
  Hidden,
  Open,
  Wrong
}

export type Dot = {
  status: DotStatus,
  x: number,
  y: number,
  value?: number,
}

export type Field = Dot[][];

export enum GameState {
  ShowNumbers,
  Guessing,
  GameOverWon,
  GameOverLoose
}

export type FieldParams = {
  size: number,
  dots: number
}
