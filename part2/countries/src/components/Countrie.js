import React from 'react'

const Countrie =({countrie}) => {
    console.log(countrie)
    return(
      <div>
          <h1>{countrie.name}</h1>
  
          <div>
            capital {countrie.capital}  
          </div>
          <div>
            population {countrie.population}
          </div> 
  
          <h2>languages</h2>
          <ul>
            {countrie.languages.map(language =>
            <li key={language.name}>
              {language.name}
            </li>
              )}
          </ul>
  
          <img 
            src={countrie.flag} 
            alt="Flag" 
            width="160" 
            height="120">
          </img>
  
      </div>
    )  
  }

  export default Countrie