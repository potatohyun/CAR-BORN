/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import styled from '@emotion/styled';

const StyleMainNav = styled.div`
  width: 100vw;
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid black;
`

const StyleMainLogo = styled.div`
  width: 100vw;
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`

const StyleLogo = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: red;
  padding: 2.5rem;
`

const StyleNav = styled.div`
  width: 60vw;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyleNavUl = styled.ul`
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: pink;
`

const StyleNavLi = styled.li`
  list-style-type: none;
  width: 5rem;
  height: 7vh;
  background-color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.25rem;
`

const StyleNavTitle = styled.h1`
  margin-left: 2.5rem;
`

const StyleLinkText = css`
  text-decoration: none;
  font-size: 1.25rem;
  font-weight: bold;
  color: black;
`

function Nav() {
  const [title, setTitle] = useState<string>('Home');
  const location = useLocation();

  // API 요청해서 받아오거나, json 파일에 저장해서 바로 임포트 해야할듯
  useEffect(() => {
    if (location.pathname === '/') {
      setTitle('Home');
    } else if (location.pathname === '/login') {
      setTitle('User Login');
    }
  }, [location.pathname]);

  return (
    <StyleMainNav>
      <StyleMainLogo>
        <StyleLogo>
          로고
        </StyleLogo>
        <StyleNav>
          <StyleNavUl>
              <Link to="/" css={StyleLinkText}>
                <StyleNavLi>
                  Home
                </StyleNavLi>
              </Link>
              <Link to="/login" css={StyleLinkText}>
                <StyleNavLi>
                  Login
                </StyleNavLi>
              </Link>
          </StyleNavUl>
        </StyleNav>
      </StyleMainLogo>
      <StyleNavTitle>
        {title}
      </StyleNavTitle>
    </StyleMainNav>
  );
}

export default Nav;
