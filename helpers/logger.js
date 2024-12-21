const logger = (message, level = "info") => {
  const levels = { info: "[INFO]", warn: "[WARN]", error: "[ERROR]" };
  console.log(`${levels[level]} ${message}`);
};

module.exports = logger;
