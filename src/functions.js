function memoFunc(func)
{
  var cache = {};

  return function (...args) {

    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }
    else {
      const result = func(...args);
      cache[key] = result;
      return result;
    }
  };
}

function highlightWinner(index, winnerSlots)
{
  const [a, b, c] = winnerSlots;
  return (index === a || index === b || index === c) ? "success" : "warning";
}

export const memoHighlightWinner = memoFunc(highlightWinner);