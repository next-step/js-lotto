import './css/index.css';
import { LottoClerk } from './domain/controller/LottoClerk';

function main() {
  new LottoClerk({ app: document.getElementById('app') });
}
main();
