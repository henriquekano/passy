import compromise from 'compromise'
import adjetives from './data/adjetives.json'
import adverbs from './data/adverbs.json'
import nouns from './data/nouns.json'
import verbs from './data/verbs.json'

/* Totally not copied from the internet */
/* https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php */
const shuffle = <T>(array: T[]): T[] => {
  let ctr = array.length
  let temp
  let index

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr)
    // Decrease ctr by 1
    ctr--
    // And swap the last element with it
    temp = array[ctr]
    array[ctr] = array[index]
    array[index] = temp
  }
  return array
}

// https://www.grammar.cl/Present/Verbs_Third_Person.htm
const conjugateVerbToPresentTenseThirdPerson = (verb: string): string => {
  const endsInConsoantY = /[^aeiou]y$/.test(verb)
  if (endsInConsoantY) {
    return verb.replace(/..$/, 'ies')
  }

  const endsInSS = /ss$/.test(verb)
  const endsInX = /x$/.test(verb)
  const endsInCH = /ch$/.test(verb)
  const endsInSH = /sh$/.test(verb)
  const endsInO = /o$/.test(verb)
  if (endsInSS || endsInX || endsInCH || endsInSH || endsInO) {
    return verb + 'es'
  }

  return verb + 's'
}

const generateRandomInteger = (min: number, max: number): number =>
  Math.max(Math.round(Math.random() * Math.round(max)), min)

const getRandomNElementsFromArray = (list: string[], n: number): string[] => {
  const returnedList = []
  for (let i = 0; i < n; i++) {
    returnedList.push(list[generateRandomInteger(0, list.length - 1)])
  }

  return returnedList
}

export const generateRandomPhrase = (
  { makesSense }: { makesSense: boolean } = { makesSense: false },
): string => {
  if (makesSense) {
    const adjetive1 = adjetives[generateRandomInteger(0, nouns.length - 1)]
    const noun1 = nouns[generateRandomInteger(0, nouns.length - 1)]
    const adverb = adverbs[generateRandomInteger(0, adverbs.length)]
    const verb = conjugateVerbToPresentTenseThirdPerson(
      verbs[generateRandomInteger(0, verbs.length)],
    )
    const adjetive2 = adjetives[generateRandomInteger(0, nouns.length)]
    const noun2 = nouns[generateRandomInteger(0, nouns.length)]
    let article1 = 'the'
    if (Math.random() > 0.5) {
      if (/^[aeiou]/.test(adjetive1[0])) {
        article1 = 'an'
      } else {
        article1 = 'a'
      }
    }
    let article2 = 'the'
    if (Math.random() > 0.5) {
      if (/^[aeiou]/.test(adjetive2[0])) {
        article2 = 'an'
      } else {
        article2 = 'a'
      }
    }
    return `${article1} ${adjetive1} ${noun1} ${adverb} ${verb} ${article2} ${adjetive2} ${noun2}`
  }

  return getRandomNElementsFromArray(
    [...nouns, ...adjetives, ...verbs, ...adverbs],
    generateRandomInteger(4, 6),
  ).join(' ')
}

const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
const easyToReadLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'j',
  'k',
  'm',
  'n',
  'p',
  'q',
  'r',
  's',
  't',
  'x',
  'y',
  'z',
]
const hardToReadLetters = ['i', 'l', 'o', 'u', 'v', 'w']
const easyToReadCapitalLetters = easyToReadLetters.map((letter) =>
  letter.toUpperCase(),
)
const hardToReadCapitalLetters = hardToReadLetters.map((letter) =>
  letter.toUpperCase(),
)
const specialCharacters = [
  '+',
  '=',
  '/',
  '_',
  '!',
  '@',
  '#',
  '$',
  '%',
  '&',
  '*',
  '(',
  ')',
  '-',
  ':',
  ':',
  ',',
  '?',
  '.',
  '<',
  '>',
  '{',
  '}',
  '[',
  ']',
]

const reallySpecialCharacters = [
  '×',
  '÷',
  '€',
  '£',
  '¥',
  '₩',
  '^',
  "'",
  '"',
  '`',
  '~',
  '\\',
  '|',
  '°',
  '•',
  '○',
  '●',
  '□',
  '■',
  '♤',
  '♡',
  '◇',
  '♧',
  '☆',
  '▪︎',
  '¤',
  '《',
  '》',
  '¡',
  '¿',
]

/**
 * @throws {Error(result)} if the limitations imposed
 * don't fit the minimum number of characters
 */
export const generateRandomString = ({
  atLeastNNumbers,
  atLeastNCapitalLetters,
  atLeastNSmallLetters,
  atLeastNSpecialCharacters,
  restrictReallySpecialCharacters,
  restrictSpecialCharacters,
  shouldBeEasyToRead,
  numberOfCharacters,
}: {
  numberOfCharacters: number
  atLeastNNumbers: number
  atLeastNCapitalLetters: number
  atLeastNSmallLetters: number
  atLeastNSpecialCharacters: number
  shouldBeEasyToRead: boolean
  restrictReallySpecialCharacters: boolean
  restrictSpecialCharacters: boolean
}): string => {
  let consideredSpecialCharacters: string[] = []
  if (!restrictSpecialCharacters) {
    consideredSpecialCharacters = specialCharacters
    if (!restrictReallySpecialCharacters) {
      consideredSpecialCharacters = [
        ...consideredSpecialCharacters,
        ...reallySpecialCharacters,
      ]
    }
  }

  const consideredLetters = shouldBeEasyToRead
    ? [...easyToReadCapitalLetters, ...easyToReadLetters]
    : [
        ...easyToReadCapitalLetters,
        ...easyToReadLetters,
        ...hardToReadCapitalLetters,
        ...hardToReadLetters,
      ]

  const obligatoryNumbers = getRandomNElementsFromArray(
    numbers,
    atLeastNNumbers,
  )
  const obligatoryCapitalLetters = getRandomNElementsFromArray(
    [...easyToReadCapitalLetters, ...hardToReadCapitalLetters],
    atLeastNCapitalLetters,
  )
  const obligatorySmallLetters = getRandomNElementsFromArray(
    [...easyToReadLetters, ...hardToReadLetters],
    atLeastNSmallLetters,
  )
  const obligatorySpecialCharacters = getRandomNElementsFromArray(
    consideredSpecialCharacters.length
      ? consideredSpecialCharacters
      : specialCharacters,
    atLeastNSpecialCharacters,
  )

  const finalString = [
    ...obligatoryNumbers,
    ...obligatoryCapitalLetters,
    ...obligatorySmallLetters,
    ...obligatorySpecialCharacters,
  ]
  const missingNumberCharacters = numberOfCharacters - finalString.length
  const alreadyFilledTheMinimumRequirement = missingNumberCharacters === 0
  if (alreadyFilledTheMinimumRequirement) {
    return shuffle(finalString).join('')
  }

  const resultIsTooLarge = missingNumberCharacters < 0
  if (resultIsTooLarge) {
    throw Error(shuffle(finalString).join(''))
  }

  const paddingCharacters = getRandomNElementsFromArray(
    [...consideredLetters, ...consideredSpecialCharacters, ...numbers],
    missingNumberCharacters,
  )

  return shuffle([...paddingCharacters, ...finalString]).join('')
}
