import styled from '@emotion/styled';
import Nav2 from '../Nav2';
import MySellContentComponent from './TableComponent/MySellContentComponent';

const StyleSellContent = styled.div`
  width: 100vw;
  background: linear-gradient(
    to bottom,
    #000000,
    #1e0000e8
  );
  background-size: 100% 200%;
  animation: gradient 10s ease infinite;
  
  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

const StyleSellContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SellContent = () => {
  return (
    <StyleSellContent>
      <Nav2 />
      <StyleSellContentContainer>
        <MySellContentComponent />
      </StyleSellContentContainer>
    </StyleSellContent>
  )
}

export default SellContent;