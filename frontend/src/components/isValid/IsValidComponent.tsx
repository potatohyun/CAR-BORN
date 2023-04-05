import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import 성공 from '../../assets/성공.svg'
import 실패 from '../../assets/실패.svg'

const showCheckmark = keyframes`
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledIcon = styled.span<{ isValid: boolean }>`
  img {
    margin-top: 5px;
    margin-left: 5px;
    width: 18px;
    height: 18px;
    animation: ${showCheckmark} 0.5s ease-in-out forwards;
    animation-delay: 2s;
  }

  path {
    stroke: ${props => props.isValid ? 'green' : 'red'};
  }
`;

const IsValidComponent = ({ isValid }:any) => {
  return (
    <StyledIcon isValid={isValid}>
      {isValid ? (
        <img src={성공} alt="성공"/>
      ) : (
        <img src={실패} alt="실패"/>
      )}
    </StyledIcon>
  );
};

export default IsValidComponent;