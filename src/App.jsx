import { useEffect, useState } from 'react'
import Data from './Data'
import './App.css'
import data from './Data'

function App() {
  const [dices, setDices] = useState(Data)
  const [checkNumbers, setCheckNumbers] = useState(false)
  
  {console.log(dices)}

  function randomNumber(){
    return Math.floor(Math.random() * 10) + 1
  }

  function rollNumbers(){
    setDices(prevDices => {
      return prevDices.map((item) => {
        return item.freeze ? item : {...item, number: randomNumber()} 
      })
    })
  }

  useEffect(() => {
    const allSameNumber = dices.every((item) => item.number === dices[0].number);
    console.log(allSameNumber, "allsame")
    setCheckNumbers(prevCheck => allSameNumber ? true  : false)
  }, [dices])

  function toggleFreeze(id){
    if(dices[id-1].freeze) {
        setDices(prevDices => {
          return prevDices.map((item) => {
            return item.id === id ? {...item, freeze: !item.freeze} : item
          })
        })
    }else{
        setDices(prevDices => {
          return prevDices.map((item) => {
            return item.id === id ? {...item, freeze: !item.freeze} : item
          })
        })
    }
  }

  const DiceComponent = (props) => {
    return(
      <div className='dice' id={props.id} style={{ backgroundColor: props.freeze ? 'green' : 'white' }} onClick={event => toggleFreeze(props.id)}>{props.number}</div>
    )
  }

  const renderComponents = dices.map((item) => {
      return <DiceComponent key={item.id} id={item.id} number={item.number} freeze={item.freeze}/>
  })
  


  return (
    <>
      <div className='container'>
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls</p>
          <div className='container-inner'>
            {renderComponents}
          </div>
          <button onClick={rollNumbers}>{checkNumbers ? "Congrats you won!" : "Roll"}</button>
      </div>
    </>
  )
}

export default App
