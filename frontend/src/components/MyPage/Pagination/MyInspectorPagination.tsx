import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export interface MyInspectorPaginationProps {
  data: never[];
  itemsPerPage: number;
}

export interface CarInspectorTypes {
  model:string,
  manufacturer:string,
  mileage:number,
  plateNumber:string,
  year:number,
  maintenanceSchedule:null|string,
  lastMaintenanceDate:null|string,
  maintenanceStatus:string,
  maintenanceCompany:null|string
}

const MyInspectorPagination = ({ data, itemsPerPage }: MyInspectorPaginationProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  if (data.length === 0) {
    return <div>No data Found!</div>;
  }

  // 디테일 페이지로
  const getInspectionDetail = () => {
    navigate('/', {state:{}})
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>제조사</th>
            <th>{`주행거리(km)`}</th>
            <th>차량번호</th>
            <th>{`연식(년)`}</th>
            <th>검수예약일</th>
            <th>검수완료일</th>
            <th>검수상태</th>
            <th>검수업체명</th>
            <th>상세조회</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map(
            (
              car: CarInspectorTypes,
              index: number
            ) => (
              <tr key={index}>
                <td>{car.model}</td>
                <td>{car.manufacturer}</td>
                <td>{car.mileage}</td>
                <td>{car.plateNumber}</td>
                <td>{car.year}</td>
                <td>{car.maintenanceSchedule === null ? '-' : car.maintenanceSchedule }</td>
                <td>{car.lastMaintenanceDate === null ? '-' : car.lastMaintenanceDate}</td>
                <td>{car.maintenanceStatus}</td>
                <td>{car.maintenanceCompany === null ? '-' : car.maintenanceCompany}</td>
                <td>
                  <button onClick={getInspectionDetail}>조회</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => {
          if (i >= currentPage + 2 || i <= currentPage - 3) return null;
          return (
            <button
              key={i}
              disabled={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          );
        })}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyInspectorPagination;
