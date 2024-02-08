import React from 'react';
import './ExcelDown.css'
import * as XLSX from "xlsx";

const ExcelDown = () => {
    const downloadExcel = (data) => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'my_sheet');
        XLSX.writeFile(workbook, '제목은 날짜로.xlsx');
    };
    const sampleData = [
        {
          key: '테스트1',
          value: '결과1',
        },
        {
          key: '테스트2',
          value: '결과2',
        },
        {
          key: 'key3',
          value: 'value3',
        },
        {
          key: 'key4',
          value: 'value4',
        },
      ];

    return (
        <div className="excelDown">
            <img className="excelDownImg" src="/images/excel.png" onClick={()=>downloadExcel(sampleData)}/>
        </div>
    );
};

export default ExcelDown;