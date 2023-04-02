import styled from "@emotion/styled";
import { useState } from 'react';
import { API_URL } from './../../../lib/api';
import axios from 'axios';
import { useEffect } from 'react';

const StyleMyCommunityContentPaginationDiv = styled.div`
width: 100vw;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export interface MyCommunityContentPaginationProps {
  title: string;
  date: string;
  id: number;
}

const MyCommunityContentPagination = ({itemsPerPage,}: any) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [myCommunityData, setMyCommunityData] = useState<MyCommunityContentPaginationProps[]>([]);
  const totalPages = Math.ceil(myCommunityData.length / itemsPerPage);

  const handleRequestMyCommunityData = async (page: number, count: number) => {
    try {
      // const response = await axios.get(`${API_URL}/buycontent/${page}/${count}`);
      const response = await axios.get(`${API_URL}/posts`);
      setMyCommunityData(response.data);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleRequestMyCommunityData(currentPage, itemsPerPage);
  }, []);

  // 페이지네이션 유효성 검사
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = myCommunityData.slice(startIndex, endIndex);

  return (
    <StyleMyCommunityContentPaginationDiv>
      <table>
        <thead>
          <tr>
            <th>게시글 번호</th>
            <th>게시글 제목</th>
            <th>작성일자</th>
            <th>게시글 보러가기</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(
            (post: MyCommunityContentPaginationProps, index: number) => (
              <tr key={index}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>
                  {post.date === null ? "-" : post.date}
                </td>
                <td>
                  <button>조회</button>  
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handleRequestMyCommunityData(currentPage - 1, itemsPerPage)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 2) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handleRequestMyCommunityData(i + 1, itemsPerPage)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handleRequestMyCommunityData(currentPage + 1, itemsPerPage)}
        >
          Next
        </button>
      </div>
    </StyleMyCommunityContentPaginationDiv>
  );
}

export default MyCommunityContentPagination;