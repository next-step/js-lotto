import { ERROR, LOTTO_COUNT, VALID_PRICE } from '../utils/constants';
import setAliase from '../utils/setAlise';

describe('기본 동작 테스트', () => {
  beforeEach(() => {
    cy.visit('/')
    setAliase();
  })
  context(`${VALID_PRICE}원의 로또를 구입`, () => {
    beforeEach(() => {
      cy.typeToTarget('@pfInput', VALID_PRICE).type('{enter}')
    })
    it('구입한 로또목록이 보여야한다.', () => {
      cy.get('@lottos').should('have.not.class', 'hidden')
    });
    it('당첨번호 입력폼이 보여야한다.', () => {
      cy.get('@wf').should('have.not.class', 'hidden')
    });
    it('모달창은 숨겨져 있어야 한다.', () => {
      cy.get('@mo').should('have.not.class', 'open')
    });
    it(`구입 금액(${VALID_PRICE}원) 만큼의 로또(${LOTTO_COUNT}개)가 목록에 있어야한다.`, () => {
      cy.get('@lottoList').find('li').should('have.length', LOTTO_COUNT);
    })
    it('구입한 로또들은 올바른 번호를 가지고 있어야한다.', () => {
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        expect($lotto.text().split(',').every((num) => num > 0 && num < 46)).to.be.true
      })
    });
  })

  context('구입 후 번호 보기 버튼을 누름', () => {
    beforeEach(() => {
      cy.typeToTarget('@pfInput', VALID_PRICE).type('{enter}')
      cy.clickTarget('@tog')
    })
    it('세로정렬이 되어야한다.', () => {
      cy.get('@lottoList').should('have.class', 'flex-col');
    });
    it('눌려진 상태에서 다시 누르면 다시 가로 정렬됨', () => {
      cy.clickTarget('@tog')
      cy.get('@lottoList').should('have.not.class', 'flex-col');
    })
    it('숫자가 보여야 한다.', () => {
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        expect($lotto).to.have.css('display', 'inline-block');
      })
    })
    it('다시 누르면 숫자는 보이면 안된다.', () => {
      cy.clickTarget('@tog')
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        expect($lotto).to.have.css('display', 'none');
      })
    });
  })

  context('당첨 번호 입력 테스트', () => {
    beforeEach(() => {
      cy.typeToTarget('@pfInput', VALID_PRICE).type('{enter}')
      cy.clickTarget('@tog')
    })
    it('당첨번호 수를 다 채우지 않으면 결과(모달)를 확인할 수 없다.', () => {
      cy.clickTarget('@wfBtn')
      cy.get('@mo').should('have.not.class', 'open');
    });
    it('정상적인 값을 입력하면 결과(모달)를 확인할 수 있다', () => {
      let i = 1;
      cy.get('@wfInputs').each(($input) => {
        $input.val(i++);
      })
      cy.clickTarget('@wfBtn')
      cy.get('@mo').should('have.class', 'open');
    })
  })

  context('결과 확인(모달)', () => {
    const price = 1000;
    beforeEach(() => {
      cy.typeToTarget('@pfInput', price).type('{enter}')
      cy.clickTarget('@tog')
    })
    it('인위적으로 1등 만들고 모달 결과 당첨 갯수가 잘 나오는지 확인한다', () => {
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        const nums = $lotto.text().split(',').map((num) => +num)
        cy.get('@wfInputs').each(($input, index) => {
          $input.val(nums[index]);
        })
      })
      cy.clickTarget('@wfBtn')
      cy.get('tbody').find('tr').last().children().last().should('have.text', '1');
    });

    it('인위적으로 2등 만들고 모달 결과 당첨 갯수가 잘 나오는지 확인한다', () => {
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        const nums = $lotto.text().split(',').map((num) => +num)
        cy.get('@wfInputs').each(($input, index) => {
          $input.val(nums[index]);
          if (index === 0) {
            while (true) {
              const newVal = Math.floor(Math.random() * 100) % 44 + 1
              if (nums.indexOf(newVal) !== -1) continue;
              $input.val(newVal);
              break;
            }
          }
        })
      })
      cy.clickTarget('@wfBtn')
      cy.get('tbody').find('tr').eq(3).children().last().should('have.text', '1');
    });
  })
  
  context('모달창이 켜진 상태', () => {
    beforeEach(() => {
      cy.typeToTarget('@pfInput', VALID_PRICE).type('{enter}')
      cy.clickTarget('@tog')
      cy.get('@lottoList').find('.lotto-detail').each(($lotto) => {
        let num = 1;
        cy.get('@wfInputs').each(($input, index) => {
          $input.val(num++);
        })
      })
      cy.clickTarget('@wfBtn')
    })
    it('x버튼을 누르면 모달창이 없어져야한다.', () => {
      cy.clickTarget('@moClose');
      cy.get('@mo').should('have.not.class', 'open');
    });
    it('다시 시작하기 버튼을 누르면 화면이 초기화면으로 돌아가야한다.', () => {
      cy.clickTarget('@moRetry');
      cy.get('@pf').should('have.not.class', 'hidden')
      cy.get('@pfInput').should('have.value', '')
      cy.get('@lottos').should('have.class', 'hidden')
      cy.get('@wf').should('have.class', 'hidden')
      cy.get('@mo').should('have.not.class', 'open')
    });
  })
})
