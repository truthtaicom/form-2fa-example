import React from 'react'
import { StyledFormContainer } from './Form.styled'

interface FormProps {
  children: React.ReactNode
  onSubmit?(e: any): void
}

interface FormInputItemProps {
  name: string
  type?: string
  placeholder?: string
}

const Form: React.FC<FormProps> = (props) => {
  return (
    <StyledFormContainer>
      <form {...props}>{props.children}</form>
    </StyledFormContainer>
  )
}

export const FormInputItem: React.FC<FormInputItemProps> = (props) => {
  return <input {...props} />
}

export default Form
