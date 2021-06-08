import { ClassName, LottoConfig } from "../common/constants";
import { class2Query } from "../common/dom";
import Component from "../core/Component";
import { Lotto, WinningLotto } from "../common/interfaces";
import { calcReward, calcROI } from "../common/utils";

const defaultState: ResultPopupState = {
  lottos: [],
  winningLotto: { numbers: [], bonus: 0 },
};

export default class ResultPopup extends Component<
  ResultPopupProps,
  ResultPopupState
> {
  constructor($target: HTMLElement, props: ResultPopupProps) {
    super($target, props, defaultState);
  }

  reset() {
    this.hide();
    this.setState(defaultState);
  }

  componentInit() {
    this.bindEvents();
  }

  show() {
    this.$target.classList.add(ClassName.open);
  }

  hide() {
    this.$target.classList.remove(ClassName.open);
  }

  bindEvents() {
    const onClick = (e: Event) => {
      const $eventTarget = e.target as HTMLElement;
      if ($eventTarget.matches(class2Query(ClassName.restartBtn))) {
        this.props?.restart();
      } else if (
        $eventTarget.matches(class2Query(ClassName.closeX)) ||
        !$eventTarget.closest(class2Query(ClassName.modalInner))
      ) {
        this.hide();
      }
    };

    this.$target.addEventListener("click", onClick);
  }

  setState(nextState: ResultPopupState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  getInnerHTML() {
    const winningCntByReward = {} as any;
    let totalReward = 0;
    this.state?.lottos?.forEach((lotto) => {
      const reward = calcReward(lotto, this.state!.winningLotto!);
      totalReward += reward;
      if (!(reward in winningCntByReward)) {
        winningCntByReward[reward] = 0;
      }
      winningCntByReward[reward]++;
    });

    const roi = calcROI(
      this.state!.lottos!.length * LottoConfig.PRICE,
      totalReward
    );

    return `
        <div class="modal-inner p-10">
          <div class="modal-close">
            <svg viewbox="0 0 40 40">
              <path class="${ClassName.closeX}" 
                d="M 10,10 L 30,30 M 30,10 L 10,30" 
              />
            </svg>
          </div>
          <h2 class="text-center">🏆 당첨 통계 🏆</h2>
          <div class="d-flex justify-center">
            <table class="result-table border-collapse border border-black">
              <thead>
                <tr class="text-center">
                  <th class="p-3">일치 개수</th>
                  <th class="p-3">당첨금</th>
                  <th class="p-3">당첨 개수</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center">
                  <td class="p-3">3개</td>
                  <td class="p-3">5,000</td>
                  <td class="p-3">${winningCntByReward[5000] ?? 0}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">4개</td>
                  <td class="p-3">50,000</td>
                  <td class="p-3">${winningCntByReward[50000] ?? 0}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개</td>
                  <td class="p-3">1,500,000</td>
                  <td class="p-3">${winningCntByReward[1500000] ?? 0}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">5개 + 보너스볼</td>
                  <td class="p-3">30,000,000</td>
                  <td class="p-3">${winningCntByReward[30000000] ?? 0}개</td>
                </tr>
                <tr class="text-center">
                  <td class="p-3">6개</td>
                  <td class="p-3">2,000,000,000</td>
                  <td class="p-3">${winningCntByReward[2000000000] ?? 0}개</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-center font-bold ${ClassName.roi}">
            당신의 총 수익률은 ${roi ?? 0}%입니다.
          </p>
          <div class="d-flex justify-center mt-5">
            <button 
              type="button" 
              class="btn btn-cyan ${ClassName.restartBtn}">
              다시 시작하기
            </button>
          </div>
        </div>
    `;
  }
}

interface ResultPopupProps {
  restart(): void;
}

interface ResultPopupState {
  lottos?: Lotto[];
  winningLotto?: WinningLotto;
}
