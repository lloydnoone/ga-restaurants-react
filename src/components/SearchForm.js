import React from 'react'

const SearchForm = ({ name, onChange, onSubmit }) => (
  <form onChange={onChange} onSubmit={onSubmit}>
    <input name={name} placeholder={name} />
    <button type='submit'>Search</button>
  </form>
)

export default SearchForm