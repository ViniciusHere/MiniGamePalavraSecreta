import './App.css'

import { useCallback,useEffect, useState } from 'react'

import {wordsList} from './Data/words.jsx'

import StartScreen from './Components/StartScreen'
import Game from './Components/Game'
import GameOver from './Components/GameOver'


const stages = [
  {id:1, name: 'start'},
  {id:2, name: 'game'},
  {id:3, name: 'end'}
]

const guessesQty = 3

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickCategory, setPickCategory] = useState('')
  const [letters, setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]
    
    const word = words[category][Math.floor(Math.random() * words[category].length)]
    console.log(word);
    
    return {word, category}
  }, [words])

  const startGame = useCallback(() => {

    clearLetterStates()

    const {category, word} = pickWordAndCategory()

    let wordLetters = word.split('')

    wordLetters = wordLetters.map(l => l.toLowerCase())

    console.log(wordLetters);

    setPickedWord(word)
    setPickCategory(category)
    setLetters(wordLetters)
    console.log(category);
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase()

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter])
    }else {
      setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

    
  }

  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

   useEffect(() => {
    if(guesses <= 0){
      setGameStage(stages[2].name)
      clearLetterStates()
    }
   }, [guesses])

   useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name){
      setScore((actualScore) => actualScore += 100)
      startGame()
    }

   }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === 'start'&& <StartScreen startGame = {startGame} ></StartScreen>}
      {gameStage === 'game'&& 
        <Game verifyLetter = {verifyLetter} 
        pickedWord = {pickedWord}
        pickCategory = {pickCategory}
        letters = {letters}
        guessedLetters = {guessedLetters}
        wrongLetters = {wrongLetters}
        guesses = {guesses}
        score = {score}
        ></Game>}
      {gameStage === 'end'&& <GameOver retry={retry} score = {score}></GameOver>}
      
    </div>
  )
}

export default App
