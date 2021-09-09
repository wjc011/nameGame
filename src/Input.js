import React from 'react'
import { useEffect } from 'react'


const Input = ({nameWord, hint, toggle, started}) => {

const onSubmit = (e) => {
    e.preventDefault()
    var input = document.getElementById("fieldID")
    nameWord(input.value)
    input.value=""
    input.focus()

}
useEffect(()=>{
    var input = document.getElementById("fieldID")
    input.focus()
}, [started])


    return (
        <div className = 'input' onSubmit = {onSubmit}>
    <form id = "formID" autoComplete="off">
    <label> Player </label>
    <input type = 'text' id = "fieldID" spellCheck = {false}  readOnly = {started} ></input>

        </form>
        
        {toggle ? <div className = 'hint'>  "{hint}" is close!</div>: ""}

        </div>
    )
}
export default Input
