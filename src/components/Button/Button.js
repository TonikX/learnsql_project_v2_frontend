import React from 'react'
import classNames from 'classnames'
import Button from '@material-ui/core/Button'
import { useStyles } from './Button.styles'

export default ({children, type, onClick, variant, color, className, disabled}) => {
  const classes = useStyles()

  return (
    <Button
      className={classNames(classes.button, {
        [classes.secondaryButton]: type === 'secondary',
        [classes.outlined]: type === 'outlined',
        [className]: className,
      })}
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}