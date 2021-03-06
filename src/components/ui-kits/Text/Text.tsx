import React from 'react'
import { StyledText } from './Text.styled'

interface TextProps {
  children: any
  role?: string
}

const Text: React.FC<TextProps> = (props) => {
  return <StyledText>{props.children}</StyledText>
}

export default Text
