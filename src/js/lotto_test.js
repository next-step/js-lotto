const makeLOTTO_fortest = (ary) => {
  let numbers = "";

  lottoTickets.push({ numbers: ary, grade: "None" });
  numbers = ary.join(", ");

  const ticket = `<div class="mx-1 text-4xl lotto-wrapper">
    <span class="lotto-icon">🎟️ </span>
    <span class="lotto-detail" style="display: none; font-size:22px">${numbers}</span>
    </div>`;

  return ticket;
};

// ticketDOMs += makeLOTTO_fortest([1,41,42,43,44,45]);
// ticketDOMs += makeLOTTO_fortest([1,2,41,42,43,44]);
// ticketDOMs += makeLOTTO_fortest([1,2,3,41,42,43]);
// ticketDOMs += makeLOTTO_fortest([1,2,3,4,42,43]);
// ticketDOMs += makeLOTTO_fortest([1,2,3,4,5,43]);
// ticketDOMs += makeLOTTO_fortest([1,2,3,4,5,7]);
// ticketDOMs += makeLOTTO_fortest([1,2,3,4,5,6]);
