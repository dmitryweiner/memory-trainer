import {render, screen} from '@testing-library/react';
import {AppContext} from "../App";
import GameStats from "./GameStats";

const customRender = (ui, {providerProps, ...renderOptions}) => {
  return render(
    <AppContext.Provider {...providerProps}>{ui}</AppContext.Provider>,
    renderOptions,
  )
}

test('GameStats showing wins and looses', () => {
  const providerProps = {
    value: {
      wins: 10,
      looses: 20
    }
  };
  customRender(<GameStats />, {providerProps})
  expect(screen.getByTestId("wins")).toHaveTextContent(providerProps.value.wins);
  expect(screen.getByTestId("looses")).toHaveTextContent(providerProps.value.looses);
})
