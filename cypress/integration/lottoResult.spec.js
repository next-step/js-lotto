import { getWinningResult, getYield } from '../../src/js/services/lotto.js';

describe('당첨 결과 기능', () => {
  const result = {
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  };

  beforeEach(() => {
    cy.reload();
  });

  context('당첨 통계에는 알맞게 등수가 표시되어야 합니다.', () => {
    it('3개가 같다 = 5등', () => {
      const winningLottoNumbers = [1, 2, 3, 4, 5, 6, 7];
      const purchaseLottoNumbersArray = [[1, 2, 3, 10, 11, 12, 13]];
      const expectResult = {
        ...result,
        fifth: 1,
      };

      expect(getWinningResult(winningLottoNumbers, purchaseLottoNumbersArray)).to.deep.equal(
        expectResult,
      );
    });

    it('4개가 같다 = 4등', () => {
      const winningLottoNumbers = [1, 2, 3, 4, 5, 6, 7];
      const purchaseLottoNumbersArray = [[1, 2, 3, 4, 11, 12, 13]];
      const expectResult = {
        ...result,
        fourth: 1,
      };

      expect(getWinningResult(winningLottoNumbers, purchaseLottoNumbersArray)).to.deep.equal(
        expectResult,
      );
    });

    it('5개가 같다 = 3등', () => {
      const winningLottoNumbers = [1, 2, 3, 4, 5, 6, 7];
      const purchaseLottoNumbersArray = [[1, 2, 3, 4, 5, 12, 13]];
      const expectResult = {
        ...result,
        third: 1,
      };

      expect(getWinningResult(winningLottoNumbers, purchaseLottoNumbersArray)).to.deep.equal(
        expectResult,
      );
    });

    it('5개가 같고, 보너스 번호가 같다 = 2등', () => {
      const winningLottoNumbers = [1, 2, 3, 4, 5, 6, 7];
      const purchaseLottoNumbersArray = [[1, 2, 3, 4, 5, 12, 7]];
      const expectResult = {
        ...result,
        second: 1,
      };

      expect(getWinningResult(winningLottoNumbers, purchaseLottoNumbersArray)).to.deep.equal(
        expectResult,
      );
    });

    it('6개가 같다 = 1등', () => {
      const winningLottoNumbers = [1, 2, 3, 4, 5, 6, 7];
      const purchaseLottoNumbersArray = [[1, 2, 3, 4, 5, 6, 13]];
      const expectResult = {
        ...result,
        first: 1,
      };

      expect(getWinningResult(winningLottoNumbers, purchaseLottoNumbersArray)).to.deep.equal(
        expectResult,
      );
    });
  });

  context('당첨 통계에는 알맞은 수익률이 표기되어야 합니다.', () => {
    it('5000원 구매, 5등 1개 = 0%', () => {
      const purchasePrice = 5000;
      const winningResult = {
        ...result,
        fifth: 1,
      };
      const expectResult = 0;
      expect(getYield(purchasePrice, winningResult)).to.deep.equal(expectResult);
    });

    it('5000원 구매, 4등 1개 = 900%', () => {
      const purchasePrice = 5000;
      const winningResult = {
        ...result,
        fourth: 1,
      };
      const expectResult = 900;
      expect(getYield(purchasePrice, winningResult)).to.deep.equal(expectResult);
    });

    it('5000원 구매, 1등 1개 = 39999900%', () => {
      const purchasePrice = 5000;
      const winningResult = {
        ...result,
        first: 1,
      };
      const expectResult = 39999900;
      expect(getYield(purchasePrice, winningResult)).to.deep.equal(expectResult);
    });
  });
});
