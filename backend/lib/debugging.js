export const logLine = (...args) => {
  console.log("\n" + "-".repeat(20));
  console.log(...args);
  console.log("\n" + "-".repeat(20));
};
