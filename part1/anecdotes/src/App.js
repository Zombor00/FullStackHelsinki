import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
        <p>
          {props.anecdote}
          <br></br>
          has {props.points} votes
        </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(Math.floor((Math.random() * anecdotes.length)))
  const [points,setPoints] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))

  const nextAnecdote = () => {
    let lastSel = selected
    let random = selected
    do{
      random = Math.floor((Math.random  () * anecdotes.length))
    }while(lastSel === random)
    setSelected(random)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const maxIndex = () => {

    if(points.length === 0){
      return -1
    }
  
    let maxNum = points[0]
    let maxIndex = 0
  
    for(let i = 1; i < points.length; i++){
      if(points[i] > maxNum){
        maxNum = points[i]
        maxIndex = i
      }
    }
  
    return maxIndex
  }

  
  const maxIndexVal = maxIndex(points)

  return (
    <div>
      <Anecdote text="Anecdote of the day" anecdote={anecdotes[selected]} points={points[selected]}/>
      <Button handleClick={vote} text="vote"/>
      <Button handleClick={nextAnecdote} text="next anecdote"/>
      <Anecdote text="Anecdote with most votes" anecdote={anecdotes[maxIndexVal]} points={points[maxIndexVal]}/>
    </div>
  )
}

export default App