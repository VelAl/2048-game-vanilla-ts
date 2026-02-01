import { BannerUiHandler, ScoreUiHandler, BoardUiHandler } from './game-ui';
import { GameLogicProxy } from './proxy-game-logic';

const initGame = () => {
  const bannerUiHandler = new BannerUiHandler();
  const scoreUiHandler = new ScoreUiHandler();
  const boardUiHandler = new BoardUiHandler();

  const game = new GameLogicProxy();

  scoreUiHandler.setUiScores(game.gameState);
  boardUiHandler.setTilesUi(game.tiles);
  bannerUiHandler.updateBanner(game.gameState.status);

  const _moveHandler = (e: KeyboardEvent) => {
    const isMoveMade = game.handleKeyDown(e);

    if (!isMoveMade) return;

    scoreUiHandler.setUiScores(game.gameState);
    bannerUiHandler.updateBanner(game.gameState.status);
    boardUiHandler.setTilesUi(game.tiles);
  };

  const _restartGame = () => {
    game.startNewGame();

    bannerUiHandler.updateBanner(game.gameState.status);
    boardUiHandler.clearBoard();
    boardUiHandler.setTilesUi(game.tiles);
    scoreUiHandler.setUiScores(game.gameState);
  };

  document.addEventListener('keydown', _moveHandler);

  const startBtn = document.getElementById('restart-button')!;
  startBtn.addEventListener('click', _restartGame);
};

initGame();
