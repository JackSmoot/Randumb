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
  if (generatedNumbers.length === 0) {
    alert("No data yet! Generate some numbers first.");
    return;
  }

  const counts = {};
  for (const num of generatedNumbers) {
    counts[num] = (counts[num] || 0) + 1;
  }

  const labels = Object.keys(counts).sort((a, b) => a - b);
  const data = labels.map(label => counts[label]);

  const ctx = document.getElementById("chart").getContext("2d");

  if (window.chartInstance) {
    window.chartInstance.destroy();
  }

  setTimeout(() => {
    window.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Frequency',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        animation: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 }
          }
        }
      }
    });
  }, 50);
}

document.getElementById("generateBtn").addEventListener("click", generate);
document.getElementById("showChartBtn").addEventListener("click", showDistribution);
