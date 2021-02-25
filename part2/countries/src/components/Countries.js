import React from 'react'
import Countrie from './Countrie'

const Countries = ({countries,filter,handleFilterChange}) => {
    if(countries.length <= 0 || filter === ''){
      return(
        <div></div>
      )
    }
  
    const countriesFiltered = countries.filter(countrie => 
      countrie.name.includes(filter)) 
  
    if(countriesFiltered.length === 1){  
      return(
        <Countrie key={countriesFiltered[0].name} countrie={countriesFiltered[0]} />
      )
    }else if(countriesFiltered.length <= 10){
      return(
        <div>        
          {countriesFiltered.map(countrie =>
            <div key={countrie.name}>
              {countrie.name}
              <button onClick={handleFilterChange} value={countrie.name}> show</button>
            </div>
            
          )}
        </div>   
      )
  
    }else{
      return(
        <div>
        Too many maches, specify another filter
        </div>
      )
    }
  
}

export default Countries