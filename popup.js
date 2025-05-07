let generatedNumbers = [];

function chaoticRandom(min, max) {
  let raw = performance.now();
  let ms = Math.floor((raw % 1000));
  ms = (ms * 73 + 41) ^ (ms << 1);
  ms = Math.abs(ms);
  const range = max - min + 1;
  return min + (ms % range);
}

function generate() {
  const min = parseInt(document.getElementById("minValue").value, 10);
  const max = parseInt(document.getElementById("maxValue").value, 10);

  if (isNaN(min) || isNaN(max) || min >= max) {
    document.getElementById("numberBox").textContent = "Invalid bounds";
    return;
  }

  const result = chaoticRandom(min, max);
  generatedNumbers.push(result);
  document.getElementById("numberBox").textContent = result;
}

function showDistribution() {
    chrome.storage.local.get({ numbers: [] }, (data) => {
      const generatedNumbers = data.numbers;
      if (generatedNumbers.length === 0) {
        document.getElementById("inlineChart").textContent = "No data yet!";
        return;
      }
  
      const counts = {};
      for (const num of generatedNumbers) {
        counts[num] = (counts[num] || 0) + 1;
      }
  
      const sortedEntries = Object.entries(counts).sort((a, b) => a[0] - b[0]);
  
      const lines = sortedEntries.map(([num, count]) => {
        const bar = '█'.repeat(count);
        return `${num.toString().padStart(4, ' ')} | ${bar} (${count})`;
      });
  
      document.getElementById("inlineChart").textContent = lines.join('\n');
    });
  }
  

document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("showChartBtn").addEventListener("click", showDistribution);
