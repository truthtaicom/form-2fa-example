import React, { useCallback } from 'react'
import Form, { FormInputItem } from './Form'
import { withA11y } from '@storybook/addon-a11y'
import { Button } from '../Button'

export default {
  title: 'Form',
  component: Form,
  decorators: [withA11y],
}

export const formSignIn = () => {
  const onSubmit = useCallback((e) => {
    e.preventDefault()
    const {
      email: { value: email },
      password: { value: password },
    } = e.target
    console.log(email, password)
  }, [])

  return (
    <Form onSubmit={onSubmit}>
      <FormInputItem name="email" />
      <FormInputItem name="password" />
      <Button>Login</Button>
    </Form>
  )
}
