import { useState } from 'react'
import styles from './SearchBar.module.css'
import searchImg from './SearchIcon.svg'

const SearchBar = () => {
  const [inputText, setInputText] = useState('')

  return (
    <div className={styles.searchBar}>
      <label htmlFor='search'>Just start typing here...</label>
      <div className={styles.inputWrapper}>
        <input
          id="search"
          className={styles.input}
          value={inputText}
          onChange={(val) => setInputText(val.currentTarget.value)}
          placeholder='Crypto trade, sell clothes, design shoes, e.t.c'
        />
        <span></span>
        <button type='button' onClick={async () => {
          console.log('Clicked!')
          const body = {
            text: inputText
          }
          const res = await fetch(`http://localhost:4000/`, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          })
          const resJson = await res.text()
          console.log('RESPONSE: ', resJson)
        }}>
          <img src={searchImg} />
        </button>
        
      </div>
      
    </div>
  )
}

export default SearchBar