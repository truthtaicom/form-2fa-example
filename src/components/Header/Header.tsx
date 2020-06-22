import React from 'react'
import Link from 'next/link'
import { Text } from '../ui-kits/Text'
import {
  StyledHeader,
  StyledHeaderMenu,
  StyledHeaderLogo,
  StyledHeaderButton,
  StyledHeaderMenuItem,
} from './Header.styled'

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <StyledHeaderLogo>LOGO</StyledHeaderLogo>
      <StyledHeaderMenu>
        <StyledHeaderMenuItem>
          <Text>Home</Text>
        </StyledHeaderMenuItem>
        <StyledHeaderMenuItem>
          <Text>Products</Text>
        </StyledHeaderMenuItem>
      </StyledHeaderMenu>
      <Link href="/login">Login</Link>
    </StyledHeader>
  )
}

export default Header
