import { gql } from 'apollo-boost'

export const ABOUTME = gql`
  query aboutMe {
    me {
      fullName
      email
      enable2FA
      QRCode
    }
  }
`
