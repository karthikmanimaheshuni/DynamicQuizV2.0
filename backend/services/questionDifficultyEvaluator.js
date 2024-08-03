const evaluateDifficulty = (questionText) => {
  const easyKeywords = ['what', 'who', 'when', 'where', 'name', 'list'];
  const mediumKeywords = ['explain', 'describe', 'compare', 'contrast'];
  const hardKeywords = ['analyze', 'evaluate', 'synthesize', 'interpret'];

  let score = 0;

  // Check for keywords
  easyKeywords.forEach(keyword => {
    if (questionText.toLowerCase().includes(keyword)) score += 1;
  });

  mediumKeywords.forEach(keyword => {
    if (questionText.toLowerCase().includes(keyword)) score += 3;
  });

  hardKeywords.forEach(keyword => {
    if (questionText.toLowerCase().includes(keyword)) score += 5;
  });

  // Check sentence complexity
  const sentences = questionText.split(/[.?!]/).filter(Boolean);
  sentences.forEach(sentence => {
    const words = sentence.split(' ').filter(Boolean).length;
    if (words > 10) score += 2;
    if (words > 20) score += 4;
  });

  // Consider the overall length of the question text
  const length = questionText.length;
  if (length > 20) score += 3;
  if (length > 100) score += 5;

  // Determine difficulty based on score
  if (score <= 5) return 'easy';
  if (score <= 10) return 'medium';
  return 'hard';
};

module.exports = evaluateDifficulty;
