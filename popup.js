function crazyRandom() {
    let seed = performance.now();
    let x = Math.sin(seed) * 10000;
    x = x - Math.floor(x);
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  }
  
  function generate() {
    const min = parseInt(document.getElementById("minValue").value, 10);
    const max = parseInt(document.getElementById("maxValue").value, 10);
  
    if (isNaN(min) || isNaN(max) || min >= max) {
      document.getElementById("numberBox").textContent = "Invalid bounds";
      return;
    }
  
    const rand = crazyRandom();
    const result = Math.floor(rand * (max - min + 1)) + min;
    document.getElementById("numberBox").textContent = result;
  }
  
  document.getElementById("generateBtn").addEventListener("click", generate);
  