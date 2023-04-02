import styled from '@emotion/styled';
import Nav2 from '../Nav2';
import Nav from './../Nav';
import MySellContentComponent from './TableComponent/MySellContentComponent';

const StyleSellContent = styled.div`
  width: 100vw;
`

const StyleSellContentContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyleSellContentTitleDIv = styled.div`
  width: 60%;
  height: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 2.5rem;
    font-weight: 900;
  }

  border-bottom: 2px solid red;
  margin-top: 3rem;
`

const SellContent = () => {
  return (
    <StyleSellContent>
      <Nav2 />
      <StyleSellContentContainer>
        <StyleSellContentTitleDIv>
          <p>판매 내역</p>
        </StyleSellContentTitleDIv>
        <br/>
        <MySellContentComponent />
      </StyleSellContentContainer>
    </StyleSellContent>
  )
}

export default SellContent;