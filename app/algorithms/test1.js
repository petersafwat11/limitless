const getMaxSumInRow = (arr, k) => {
  let maxSum = 0;
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  let windowSum = maxSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
};
 
console.log(
  getMaxSumInRow(
    [1, 2, 3, 4, 5, 6, 5, 15, 12, 4, 78, 15, 115, 0, 50, 80, 90],
    4
  )
);
