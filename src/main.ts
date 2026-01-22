import { MOVEMENT_DURATION } from './constants';
import { Game2048State } from './game-logic';
import {
  isArrowBtnKey,
  BannerUiHandler,
  ScoreUiHandler,
  BoardUiHandler,
  throttle,
} from './game-ui';
import { LS_GameStateManager } from './local-storage-manager';

const initGame = () => {
  const bannerUiHandler = new BannerUiHandler();
  const scoreUiHandler = new ScoreUiHandler();
  const boardUiHandler = new BoardUiHandler();

  const lsGameStateManager = new LS_GameStateManager();
  const game = new Game2048State(lsGameStateManager.savedState);

  scoreUiHandler.setUiScores(game.gameState);
  boardUiHandler.setTilesOnBoard(game.tiles);
  bannerUiHandler.updateBanner(game.gameState.status);

  const moveHandler = ({ key }: KeyboardEvent) => {
    if (!isArrowBtnKey(key)) return;

    const result = game.make_move(key);

    if (!result) return;

    lsGameStateManager.saveState(game.gameState);
    scoreUiHandler.setUiScores(game.gameState);
    bannerUiHandler.updateBanner(game.gameState.status);

    const { tilesToRemove } = result;

    boardUiHandler.removeTilesFromBoard(tilesToRemove);
    boardUiHandler.setTilesOnBoard(game.tiles);
  };

  const throttledMoveHandler = throttle(moveHandler, MOVEMENT_DURATION);

  document.addEventListener('keydown', throttledMoveHandler);

  const restartGame = () => {
    game.startNewGame();
    lsGameStateManager.saveState(game.gameState);
    bannerUiHandler.updateBanner(game.gameState.status);
    boardUiHandler.clearBoard();
    boardUiHandler.setTilesOnBoard(game.tiles);
    scoreUiHandler.setUiScores(game.gameState);
  };

  const startBtn = document.getElementById('restart-button')!;
  startBtn.addEventListener('click', restartGame);
};

initGame();
