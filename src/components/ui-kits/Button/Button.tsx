import React from 'react'
import { StyledButton } from './Button.styled'
import { Text } from '../Text'

interface ButtonProps {
  children?: React.ReactChild
  onClick?(e: React.MouseEvent<HTMLElement>): void
  type?: string
  disabled?: boolean
  onSubmit?(e: any): void
  isLoading?: boolean
  full?: boolean
  primary?: boolean
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  if (props.isLoading) {
    return <Text>Loading...</Text>
  }
  return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
