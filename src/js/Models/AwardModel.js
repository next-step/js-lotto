import { Model } from "./Model.js";

export class AwardModel extends Model {
  showAward() {
    this.state = {
      isShowAward: true,
    };
  }

  closeAward() {
    this.state = {
      isShowAward: false,
    };
  }
}
