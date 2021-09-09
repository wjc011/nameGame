import React from 'react'

const Category = ({categories, timeLimit, onSelect, onSelectTime, started}) => {


    return (
    <div className = "category">
    <select id = "categoryList" onChange = {(e) => onSelect(e.target.value)} disabled = {started}>
    {categories.map((category) =>(
        <option value = {category.id} 
        > {category.name}</option>
    ))}
</select>
<select id = "timeLimit" onChange = {(e) => onSelectTime(e.target.value)} disabled = {started}> 
{timeLimit.map((time) =>(
        <option value = {time} 
        > {time} minutes</option>
    ))}
        </select>
</div>
    )
}

export default Category
