import LottoGame from './controller/LottoGame.js';

const app = () => {
  const lottoGame = new LottoGame();
  lottoGame.start();
};

export default app;
