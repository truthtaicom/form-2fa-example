import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { Form, FormInputItem } from '../components/ui-kits/Form'
import { Button } from '../components/ui-kits/Button'
import { useMutation } from '@apollo/react-hooks'
import { SIGNUP } from '../graphql/user/user.mutation'
import withApollo from '../utils/withApollo'
import { toast } from 'react-toastify'
import Router from 'next/router'

const StyledRegisterContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  input {
    font-family: 'Roboto', sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    min-width: 3em;
    text-align: center;
  }
`

const StyledSignUpForm = styled(Form)`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

function SignUpForm({ onSubmit, loading }) {
  return (
    <StyledSignUpForm onSubmit={onSubmit}>
      <FormInputItem placeholder="Full Name" name="fullName" />
      <FormInputItem placeholder="Email" name="email" />
      <FormInputItem placeholder="Password" type="password" name="password" />
      <Button isLoading={loading} full primary>
        Register
      </Button>
    </StyledSignUpForm>
  )
}

function RegisterPage() {
  const [signUp, { data: signUpData, error: signUpError, loading }] = useMutation(SIGNUP)

  useEffect(() => {
    if (signUpData) {
      Router.push('/login')
    }
  }, [signUpData])

  const errorMessage = signUpError?.message

  const onSubmit = useCallback((e) => {
    e.preventDefault()

    const {
      fullName: { value: fullName },
      email: { value: email },
      password: { value: password },
    } = e.target

    signUp({
      variables: {
        input: {
          fullName,
          email,
          password,
        },
      },
    })
  }, [])

  if (errorMessage) {
    toast(errorMessage)
  }

  return (
    <StyledRegisterContainer>
      <SignUpForm onSubmit={onSubmit} loading={loading} />
    </StyledRegisterContainer>
  )
}

export default withApollo({ ssr: true })(RegisterPage)
