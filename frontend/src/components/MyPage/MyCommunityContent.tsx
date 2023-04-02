import styled from "@emotion/styled"
import Nav2 from "../Nav2";
import Nav from './../Nav';
import MyCommunityContentComponent from './TableComponent/MyCommunityContentComponent';

const StyleMyCommunityContent = styled.div`
  width: 100vw;
`

const StyleMyCommunityContentContainer = styled.div`
  width: 100vw;
  height: 80vh;
  border: 1px solid black;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyleMyCommunityContentTitleDIv = styled.div`
  width: 70%;
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

const MyCommunityContent = () => {

  return (
    <StyleMyCommunityContent>
      <Nav2 />
      <StyleMyCommunityContentContainer>
        <StyleMyCommunityContentTitleDIv>
          <p>내가 쓴 게시글 리스트 내역</p>
        </StyleMyCommunityContentTitleDIv>
        <MyCommunityContentComponent />
      </StyleMyCommunityContentContainer>
    </StyleMyCommunityContent>
  )
}

export default MyCommunityContent;