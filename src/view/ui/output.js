export function printLottoTickets(tickets) {
  console.log(`${tickets.length}개를 구매했습니다.`);
  tickets.forEach((ticket) => console.log(`[${ticket.join(", ")}]`));
}

export function printLottoResults(rankCount) {
  console.log("\n당첨 통계");
  console.log("--------------------");

  const prizeMapping = [
    { rank: 5, match: 3, prize: "5,000원" },
    { rank: 4, match: 4, prize: "50,000원" },
    { rank: 3, match: 5, prize: "1,500,000원" },
    { rank: 2, match: 5, prize: "보너스 볼 일치 30,000,000원" },
    { rank: 1, match: 6, prize: "2,000,000,000원" },
  ];

  prizeMapping.forEach(({ rank, match, prize }) => {
    console.log(`${match}개 일치 (${prize}) - ${rankCount[rank] || 0}개`);
  });
}
