import { gql } from 'apollo-boost'

export const SIGNIN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      accessToken
      nextToken
    }
  }
`

export const SIGNIN2FA = gql`
  mutation signIn2FA($input: SignIn2FAInput!) {
    signIn2FA(input: $input) {
      accessToken
    }
  }
`

export const SIGNUP = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      id
      fullName
    }
  }
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      enable2FA
      id
    }
  }
`
