import React from 'react'

const SearchForm = ({ name, label, onChange, onSubmit }) => (
  <form onChange={onChange} onSubmit={onSubmit}>
    <label>{label}</label>
    <input name={name} placeholder={name} />
    <button type='submit'>Search</button>
  </form>
)

export default SearchForm