import { useState } from 'react';

export interface PaginationProps {
  data: never[];
  itemsPerPage: number;
}

const MyCarInfoPagination = ({ data, itemsPerPage }:PaginationProps) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  if(data.length === 0) {
    return <div>No data Found!</div>
  }

  return (
    <div>
      {/* <ul>
        {currentItems.map((item:any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul> */}
      <table>
        <thead>
          <tr>
            <th>차량모델</th>
            <th>차량번호</th>
            <th>{`주행거리(km)`}</th>
            <th>{`연식(년)`}</th>
            <th>차량등록일</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((car:{model:string, license_plate:string, mileage:string, year:string, registration_date:string}, index:number) => (
            <tr key={index}>
              <td>{car.model}</td>
              <td>{car.license_plate}</td>
              <td>{car.mileage}</td>
              <td>{car.year}</td>
              <td>{car.registration_date}</td>
            </tr>
          ))}
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
  )
}

export default MyCarInfoPagination;