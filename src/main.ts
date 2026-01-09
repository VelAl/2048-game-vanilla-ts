import { Game2048State } from './game-logic';
import { isArrowBtnKey, ScoreUiHandler } from './game-ui';
import { BoardUiHandler } from './game-ui/board-ui-handler/board-ui-handler';
import { LS_GameStateManager } from './local-storage-manager';

const initGame = () => {
  const scoreUiHandler = new ScoreUiHandler();
  const boardUiHandler = new BoardUiHandler();

  const lsGameStateManager = new LS_GameStateManager();
  const game = new Game2048State(lsGameStateManager.savedState);

  scoreUiHandler.setUiScores(game.gameState);
  boardUiHandler.setTilesOnBoard(game.tiles);

  document.addEventListener('keydown', (event) => {
    if (!isArrowBtnKey(event.key)) return;

    const result = game.make_move(event.key);

    if (!result) return;

    lsGameStateManager.saveState(game.gameState);
    scoreUiHandler.setUiScores(game.gameState);

    const { tilesToRemove } = result;

    boardUiHandler.removeTilesFromBoard(tilesToRemove);
    boardUiHandler.setTilesOnBoard(game.tiles);
  });
};

initGame();
