import React from 'react'
import { useStyles } from './SearchBar.styles'

export default ({onKeyPress}) => {
  const classes = useStyles()

  return (
    <input
      className={classes.searchBar}
      placeholder="Поиск"
      onKeyPress={onKeyPress}
    />
  )
}