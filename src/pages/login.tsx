import React, { useCallback, useState, useEffect } from 'react'
import ReactOTPInput from 'react-otp-input'
import styled from 'styled-components'
import { Form, FormInputItem } from '../components/ui-kits/Form'
import { Button } from '../components/ui-kits/Button'
import { useMutation } from '@apollo/react-hooks'
import { SIGNIN, SIGNIN2FA } from '../graphql/user/user.mutation'
import withApollo from '../utils/withApollo'
import { toast } from 'react-toastify'
import Router from 'next/router'
import Link from 'next/link'

const StyledLoginContainer = styled.div`
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

const StyledLoginForm = styled(Form)`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

const StyledRegisterLink = styled.p`
  display: block;
  padding-top: 20px;
`

function LoginPageEmailPassword({ onSubmit, loading }) {
  return (
    <StyledLoginForm onSubmit={onSubmit}>
      <FormInputItem placeholder="Email" name="email" />
      <FormInputItem placeholder="Password" type="password" name="password" />
      <Button isLoading={loading} full primary>
        Login
      </Button>

      <StyledRegisterLink>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </StyledRegisterLink>
    </StyledLoginForm>
  )
}

function LoginPageOTP({ onSubmit, ...props }) {
  return (
    <>
      <ReactOTPInput {...props} />
      <Button isLoading={props.loading} onClick={onSubmit} full primary>
        Send OTP
      </Button>
    </>
  )
}

function LoginPage() {
  const [nextToken, setNextToken] = useState()
  const [accessToken, setAccessToken] = useState()
  const [signIn, { data: signInData, error: signInError, loading: signInLoading }] = useMutation(
    SIGNIN
  )
  const [
    signIn2FA,
    { data: signIn2FAData, error: signIn2FAError, loading: signIn2FALoading },
  ] = useMutation(SIGNIN2FA)
  const [otpCode, setOtpCode] = useState()

  const errorMessage = signIn2FAError?.message || signInError?.message

  console.log(otpCode, 'otpCode')

  useEffect(() => {
    if (!nextToken && signInData?.signIn?.nextToken) {
      setNextToken(signInData?.signIn?.nextToken)
    }
  }, [signInData?.signIn?.nextToken])

  useEffect(() => {
    if (!accessToken) {
      setAccessToken(signInData?.signIn?.accessToken)
    }
  }, [signInData?.signIn?.accessToken])

  useEffect(() => {
    if (signIn2FAData?.signIn2FA?.accessToken) {
      setAccessToken(signIn2FAData?.signIn2FA?.accessToken)
    }
  }, [signIn2FAData?.signIn2FA?.accessToken])

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('token', accessToken)
      Router.push('/aboutMe')
    }
  }, [accessToken])

  useEffect(() => {
    if (errorMessage) {
      toast(errorMessage)
    }
  }, [errorMessage])

  const onSubmitEmailPassword = useCallback((e) => {
    e.preventDefault()

    const {
      email: { value: email },
      password: { value: password },
    } = e.target

    signIn({
      variables: {
        input: {
          email,
          password,
        },
      },
    })
  }, [])

  const onSubmitOTP = useCallback(
    (e) => {
      e.preventDefault()

      console.log('otpCode', otpCode)
      signIn2FA({
        variables: {
          input: {
            nextToken,
            twoFactorCode: otpCode,
          },
        },
      })
    },
    [otpCode]
  )

  if (nextToken) {
    return (
      <StyledLoginContainer>
        <div>
          <LoginPageOTP
            onSubmit={onSubmitOTP}
            onChange={setOtpCode}
            numInputs={8}
            separator={<span>-</span>}
            value={otpCode}
            loading={signIn2FALoading}
          />
        </div>
      </StyledLoginContainer>
    )
  }

  return (
    <StyledLoginContainer>
      <LoginPageEmailPassword onSubmit={onSubmitEmailPassword} loading={signInLoading} />
    </StyledLoginContainer>
  )
}

export default withApollo({ ssr: true })(LoginPage)
