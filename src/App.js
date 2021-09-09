import Header from "./Header"
import Category from "./Category"
import Logged from "./Logged"
import Input from "./Input"
import PopUp from "./PopUp"
import { useState, useEffect } from "react"




function App() {
//LOGGED CLASS USE STATE VARIABLES (WORDBANK = DATABASE)
  const [wordBank, setWordBank] = useState([])
  const [logged, setLogged] = useState([])
  const [highlight, setHighlight] = useState()
  const [highlightToggle, setHighlightToggle] = useState(false)
  const [hint, setHint] = useState()
  const [showHint, setShowHint] = useState(false)
  useEffect(() =>{
    const fetchTasks = async() =>{
      const res = await fetch('http://localhost:9000/testAPI/countries')
      const data = await res.json()

      setWordBank(data)
    }
    fetchTasks();
  }, [])

  const [categories, setCategories] = useState([
    {id: 1, name: 'Countries'}, 
    {id: 2, name: 'Composers'}, 
    {id: 3, name: 'Movies'}
  ])

  const [category, setCategory] = useState(categories[0])

  const [timeOptions, setTimeOptions] = useState([
    2, 5, 10
  ])
  const [start, setStart] = useState(false)
  const [newGame, setNewGame] = useState(true)
  const [outsideClick, setOutsideClick] = useState(false)

  const startGame = () =>{
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    setNewGame(false)
    var timeleft = 3;
    popup.innerHTML = timeleft;

    var downloadTimer = setInterval(function(){
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        popup.classList.toggle("show");
        setIsActive(true)
        setStart(true)
      }
      timeleft -= 1;
      timeleft ===0 ? popup.innerHTML = "GO!" : popup.innerHTML = timeleft;
}, 1000);



  }

const [timeLimit, setTimeLimit] = useState(timeOptions[0]*60)
//USES CATEGORY I.D.
const selectCategory = (id) =>{
  var cat = categories.find(indx => indx.id == id)
  setCategory(cat)
  const fetchTasks = async() =>{
    const res = await fetch(`http://localhost:9000/testAPI/${cat.name}`)
    const data = await res.json()

    setWordBank(data)
  }
  fetchTasks();
  
}
const selectTimeLimit = (time) =>{
console.log(time)
setSeconds(time*60)
setTimeLimit(time)
}

const [seconds, setSeconds] = useState(timeLimit);
const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setIsActive(false);
    setStart(false)
    setSeconds(0)
    setLogged([])

  }
  const restart = () =>{
    document.getElementById("myPopup").classList.toggle("show");
    setSeconds(timeLimit);
    setNewGame(true)
    setOutsideClick(false)
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      if(seconds <0){
        reset();
        setOutsideClick(true)
        var popup = document.getElementById("myPopup")
        popup.innerHTML = "TIME'S UP! <br> NICE! YOU GOT " +logged.length+" WORDS!"
         popup.classList.toggle("show");

      }
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);


  const nameWord = (word) =>{
    word = word.toUpperCase()
    let repeat = logged.find(key => key.Name.toUpperCase()===word || (key.children!==undefined && key.children.toUpperCase() === word))
    console.log(repeat)

    if(repeat !== undefined){
      console.log(highlight)
      setHighlightToggle(!highlightToggle)
      setHighlight(repeat)
      setShowHint(false)

    }
    else{
      setShowHint(false)

    let match= wordBank.filter(key => closeMatch(key.Name.toUpperCase(), word)<=1);
    if(match.length===0){
      return
    }
    console.log(match)
    if(match.length >1){
      for(const i of match){
        console.log(i)
        if(i.Name.toUpperCase() === word){

          setHighlight(null)
          setLogged([i, ...logged])
          return
        }
      }
      setShowHint(true)
      setHint(word)
    }
    else if(match[0].Name.toUpperCase()=== word){
    
      setHighlight(null)
      setLogged([match[0], ...logged])
      console.log(logged)
      
    }
    else{
      setShowHint(true)
      setHint(word)
    }

  }

}
const closeMatch = (key, value) =>{
        var diff = Math.abs(key.length-value.length)
        if(diff > 1) return diff
        var d = diff
        var i =0, j = 0, A = key.split(""), B = value.split("")
        if(diff === 0){
          while(d < 2 && i<A.length && j<B.length){
              if(A[i] !== B[j]) d++
              i++
              j++    
          }
          return d
      }
        if(key.length < value.length){ //swap array A and array B
          var C = B
          B = A
          A = C
        }
        i = 0
        j = 0
        d = 0 //reset counters
        while(d < 2 && i<A.length && j<B.length){
          if(A[i] !== B[j]){
            d++
            i++
          }
          else{
            i++
            j++
          }
        }
        //console.log(d)
        return d
       
}

  return (
    <div className="App">
      <div className = "time">Remaining Time {Math.floor(seconds/60)}:{seconds%60 < 10 ?
      "0"+ seconds%60 : seconds%60 } </div>
      <Header category = {category}></Header>
      <Category categories = {categories}
      timeLimit = {timeOptions} onSelect = {selectCategory}
      onSelectTime = {selectTimeLimit} started = {start}/>
      <PopUp newGame = {outsideClick} restart = {restart}/>
     {/*  <div className="popup">
        <span className="popuptext" id="myPopup"></span>
        </div> */}
      <Logged word = {logged[0]} highlight = {highlight} toggle = {highlightToggle} reset = {newGame}></Logged>
      <Input nameWord = {nameWord} hint={hint} toggle ={showHint} started = {!start}></Input>
      <div className = "startButton">
      <button disabled = {!newGame} onClick = {startGame}> Start </button>
      </div>
    </div>
  );
}



export default App;
