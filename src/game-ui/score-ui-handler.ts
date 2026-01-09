export class ScoreUiHandler {
  #scoreElement: HTMLElement;
  #bestScoreElement: HTMLElement;

  constructor() {
    const scoreboardElement = document.getElementById('scoreboard')!;

    this.#scoreElement = scoreboardElement.querySelector('#score-value')!;

    this.#bestScoreElement =
      scoreboardElement.querySelector('#best-score-value')!;
  }

  setUiScrores({ score, bestScore }: { score: number; bestScore: number }) {
    this.#scoreElement.textContent = score.toString();
    this.#bestScoreElement.textContent = bestScore.toString();
  }
}
