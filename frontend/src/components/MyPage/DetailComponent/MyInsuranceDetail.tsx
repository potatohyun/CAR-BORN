import styled from "@emotion/styled";
import Nav from './../../Nav';

// CarStatus 이미지 import 해오기
import Document from "../../../assets/carousel/CarStatus4.jpg";
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from "axios";
import { API_URL } from './../../../lib/api';
import { useState } from 'react';

const StyleMyInsuranceDetailDiv = styled.div`
width: 100vw;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const StyleMyInsuranceDetailContainerDiv = styled.div`
margin-top: 4rem;
margin-bottom: 4rem;
width: 80%;
border: 1px solid black;

display: flex;
flex-direction: column;
align-items: center;

padding-top: 3rem;
`;

const StyleMyInsuranceDetailTitleDiv = styled.div`
width: 50%;
height: 5rem;
border-bottom: 2px solid red;
display: flex;
justify-content: center;
align-items: center;
span {
  font-size: 2rem;
  font-weight: 900;
}
`;

const StyleInsuranceImg = styled.img`
width: 100%;
`;

const StyleMyInsuranceResultDiv = styled.div`
background-color: #adadad;
`;

export type insuranceResultType = {
  setInspectorResult: React.SetStateAction<any[]>;
  inspectorResult: any;
};

const MyInsuranceDetail = () => {
  const param = useParams();
  const carId = param.carId;

  const location = useLocation();
  const dispatch = useDispatch();
  const detail = location.state;
  const [inspectorResult, setInspectorResult] = useState<any[]>([]);

  // 검수 결과 보여주기 위한 데이터 가져오기.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `${API_URL}/myinspectordetail`,
        });
        setInspectorResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location.state, dispatch, carId, setInspectorResult]);

  return (
    <StyleMyInsuranceDetailDiv>
      <Nav />
      <StyleMyInsuranceDetailContainerDiv>
        <StyleMyInsuranceDetailTitleDiv>
          <span>정비(검수) 상세 내역</span>
        </StyleMyInsuranceDetailTitleDiv>
        {/* 디테일 정보  */}
        <table>
          <thead>
            <tr>
              <th>차량모델</th>
              <th>제조사</th>
              <th>{`주행거리(km)`}</th>
              <th>차량번호</th>
              <th>{`연식(년)`}</th>
              <th>보험종류</th>
              <th>보험처리일자</th>
              <th>내역등록일자</th>
              <th>보험사명</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{detail.carModel}</td>
              <td>{detail.manufacturer}</td>
              <td>{detail.mileage}</td>
              <td>{detail.plateNumber}</td>
              <td>{detail.year}</td>
              <td>{detail.insuranceType}</td>
              <td>
                {detail.insuranceProcessedDate === null
                  ? "-"
                  : detail.insuranceProcessedDate}
              </td>
              <td>
                {detail.registrationDate === null
                  ? "-"
                  : detail.registrationDate}
              </td>
              <td>{detail.insuranceCompany}</td>
            </tr>
          </tbody>
        </table>
        {/* 검수 전 이미지, 검수 후 이미지, 견적서 이미지 */}
        <table>
          <thead>
            <tr>
              <th>견적서</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <StyleInsuranceImg src={Document} alt="Document" />
              </td>
            </tr>
          </tbody>
        </table>
        {/* 검수 결과 */}
        <div>
          <p>보험 결과</p>
          <StyleMyInsuranceResultDiv>
          {inspectorResult.map((result, index) => (
            <li key={index}>
              {result.category} : {result.detail}
            </li>
          ))}
          </StyleMyInsuranceResultDiv>
        </div>
      </StyleMyInsuranceDetailContainerDiv>
    </StyleMyInsuranceDetailDiv>
  );
}

export default MyInsuranceDetail