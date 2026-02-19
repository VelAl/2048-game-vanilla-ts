import { BannerUiHandler, ScoreUiHandler, BoardUiHandler } from './game-ui';
import createGame from './proxy-game-logic';

const initGame = () => {
  const bannerUiHandler = new BannerUiHandler();
  const scoreUiHandler = new ScoreUiHandler();
  const boardUiHandler = new BoardUiHandler();

  const game = createGame();

  const _updateUi = () => {
    scoreUiHandler.setUiScores(game.gameState);
    bannerUiHandler.updateBanner(game.gameState.status);
    boardUiHandler.setTilesUi(game.tiles);
  };

  _updateUi();

  const _moveHandler = (e: KeyboardEvent) => {
    const isMoveMade = game.handleKeyDown(e);

    if (!isMoveMade) return;

    _updateUi();
  };

  const _restartGame = () => {
    game.startNewGame();

    boardUiHandler.clearBoard();

    _updateUi();
  };

  document.addEventListener('keydown', _moveHandler);

  const startBtn = document.getElementById('restart-button')!;
  startBtn.addEventListener('click', _restartGame);
};

initGame();
