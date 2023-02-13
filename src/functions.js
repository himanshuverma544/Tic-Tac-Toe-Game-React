export function highlightWinner(index, winnerSlots)
{
  const [a, b, c] = winnerSlots;
  return (index === a || index === b || index === c) ? "success" : "warning";
}