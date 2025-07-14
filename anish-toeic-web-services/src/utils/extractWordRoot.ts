export function extractWordRoot(word: string): string {
  const commonSuffixes = [
    'ment',
    'able',
    'ness',
    'ly',
    'tion',
    'sion',
    'ing',
    'ed',
    'er',
    'al',
  ];

  for (const suffix of commonSuffixes) {
    if (word.endsWith(suffix)) {
      return word.slice(0, -suffix.length);
    }
  }
  return word;
}
