/* eslint-disable jsx-a11y/no-onchange */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form } from '../components/ui-kits/Form'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { ABOUTME } from '../graphql/user/user.query'
import withApollo from '../utils/withApollo'
import { toast } from 'react-toastify'
import { Text } from '../components/ui-kits/Text'
import { Button } from '../components/ui-kits/Button'
import { UPDATE_PROFILE } from '../graphql/user/user.mutation'
import { Loading } from '../components/ui-kits/Loading'
import Router from 'next/router'

const StyledAboutMeContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const StyledAboutMe = styled(Form)`
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
`

const StyledList = styled.ul`
  list-style: none;
`
const StyledListItem = styled.li`
  padding: 10px 0;
`

function AboutMePage() {
  const [getAboutMe, { data, loading, error }] = useLazyQuery(ABOUTME, {
    fetchPolicy: 'network-only',
  })
  const [
    updateProfile,
    { data: updateProfileData, loading: updateProfileLoading, error: updateProfileError },
  ] = useMutation(UPDATE_PROFILE)
  const [enable2FA, setEnable2FA] = useState(false)

  const isLoading = updateProfileLoading || loading
  const errorMessage = error?.message || updateProfileError?.message
  const errorStatus = error?.graphQLErrors?.[0]?.extensions?.code
  const userInfo = data?.me

  if (errorStatus === 401) {
    Router.push('/login')
  }

  useEffect(() => {
    getAboutMe()
  }, [])

  useEffect(() => {
    setEnable2FA(!!userInfo?.enable2FA)
  }, [userInfo])

  useEffect(() => {
    if (updateProfileData) {
      getAboutMe()
    }
  }, [updateProfileData])

  const onChangeSelect = (e) => {
    if (e.target.value === 'true') {
      setEnable2FA(true)
    } else {
      setEnable2FA(false)
    }
  }

  const onSave = () => {
    updateProfile({
      variables: {
        input: {
          enable2FA: enable2FA,
        },
      },
    })
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    Router.push('/login')
  }

  if (errorMessage) {
    toast(errorMessage)
  }

  if (loading || !userInfo) {
    return <Loading />
  }

  return (
    <StyledAboutMeContainer>
      <StyledAboutMe>
        <StyledList>
          <StyledListItem>
            <Text>Full name: {userInfo.fullName}</Text>
          </StyledListItem>

          <StyledListItem>
            <Text>Email: {userInfo.email}</Text>
          </StyledListItem>

          <StyledListItem>
            <label htmlFor={'enable2FA'}>Enable 2FA: </label>
            <select defaultValue={String(!!userInfo?.enable2FA)} onChange={onChangeSelect}>
              <option value="true">YES</option>
              <option value="false">NO</option>
            </select>
          </StyledListItem>

          <StyledListItem>
            {userInfo.enable2FA && <img src={userInfo.QRCode} alt="qrCode" />}
          </StyledListItem>

          {isLoading ? (
            'Saving...'
          ) : (
            <Button type="button" onClick={onSave} full primary>
              Save
            </Button>
          )}

          <Button type="button" onClick={onLogout} full>
            Logout
          </Button>
        </StyledList>
      </StyledAboutMe>
    </StyledAboutMeContainer>
  )
}

export default withApollo({ ssr: true })(AboutMePage)
