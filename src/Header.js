import React from 'react'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
const Header = ({category}) => {
useEffect(() => {
console.log(document.getElementById("header").style)
document.getElementById("header").style.backgroundImage = "url('./images/" +category.name+ ".jpg')";
}, [category])

    return (
        <header className = "header" id = "header">
        <div>
           <h1> NAME AS MANY {category.name.toUpperCase()} AS YOU CAN </h1>
           </div>  

         </header>
    )
}


Header.defaultProps = {
    title: "NAME GAME",
}

Header.propTypes = {
    title: PropTypes.string.isRequired,

}
export default Header
