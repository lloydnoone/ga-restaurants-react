import React from 'react'

const Item = ({ id, name, onClick, className }) => (
  <div className={className} onClick={() => onClick(id)}>{name}</div>
)

export default Item