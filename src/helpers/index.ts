export const capitalizeFirstLetterOfEachWord = (text: string) => {
  const allWords = text.split(" ");
  return allWords
    .map((word) => word[0].toUpperCase() + word.substring(1))
    .join(" ");
};
