import React from 'react'
import { useState, useEffect} from 'react'

const Logged = ({word, highlight, toggle, reset}) => {

    const [length, setLength] = useState(0)
    useEffect(() => {  
        if(reset){
            console.log("reset")
            document.getElementById("inputText").innerHTML = ""
        } 
        if(word !== undefined){
            console.log(document.getElementById("inputText").innerHTML
            )
            if(highlight === null){
                setLength(length+ word.Name.length+2)
                var inputText = document.getElementById("inputText");
                var innerHTML = inputText.innerHTML;
                innerHTML += "<span id='" +word.Name+ "'" + "class='normal'>" + word.Name.toUpperCase() + "</span><span>, </span>"
                inputText.innerHTML = innerHTML;
                return
            }
            console.log(highlight)

    if(document.getElementById(highlight.Name) === null){
        blink(highlight.children,0);
    }
    else{
    blink(highlight.Name, 0)
    }
    return

    }
    }, [word, highlight, toggle, reset])

    const blink = (id, counter) =>{
        if(counter >=4) return
        var inputText = document.getElementById(id);
        if(counter%2 ===0){
        inputText.className = 'highlight'
        }
        else{
            inputText.className = 'normal'
        }
       setTimeout(function(){ 
            blink(id, counter+1)

        }, 300) 
    

    }

    return (
        <div className = {length < 900 ? "logBox" : "logBoxOverflow"}>
            <div id = "inputText">
            </div> 
        </div>
    )
}

export default Logged
