function chaoticRandom(min, max) {
    let raw = performance.now(); // Example: 120553.221
    let ms = Math.floor((raw % 1000)); // Just milliseconds (0–999)
  
    // Chaotic transformations
    ms = (ms * 73 + 41) ^ (ms << 1); // Multiply, add, XOR with left-shifted self
    ms = Math.abs(ms); // Ensure positive
  
    // Force into bounds
    const range = max - min + 1;
    const final = min + (ms % range);
    return final;
  }
  
  function generate() {
    const min = parseInt(document.getElementById("minValue").value, 10);
    const max = parseInt(document.getElementById("maxValue").value, 10);
  
    if (isNaN(min) || isNaN(max) || min >= max) {
      document.getElementById("numberBox").textContent = "Invalid bounds";
      return;
    }
  
    const result = chaoticRandom(min, max);
    document.getElementById("numberBox").textContent = result;
  }
  
  document.getElementById("generateBtn").addEventListener("click", generate);
  