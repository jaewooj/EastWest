import React from 'react';
import './ExcelDown.css'
import { useSelector } from 'react-redux';
import * as XLSX from "xlsx";

const ExcelDown = () => {
  const xData = useSelector(state => state.item.xData);
  const yData = useSelector(state => state.item.yDataExcel);
  const yTotalData = useSelector(state => state.item.totalDataExcel);

    const downloadExcel = () => {
      const dataToExport = xData.map((time, index) => {
        const newData = { time };
      
        for (const key in yTotalData) {
          if (Object.hasOwnProperty.call(yTotalData, key)) {
            newData[key] = yTotalData[key][index];
          }
        }
      
        return newData;
      }
      /* ({
        time,
        // value: yData[index]
      [Object.keys(yTotalData)[0]]: yTotalData[Object.keys(yTotalData)[0]][index],
      [Object.keys(yTotalData)[1]]: yTotalData[Object.keys(yTotalData)[1]][index],
      }) */
      );
      console.log(yTotalData);
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const filename = `${year}-${month}-${day}.xlsx`;

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'my_sheet');
        XLSX.writeFile(workbook, filename);
    };
    /* const sampleData = [
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
      ]; */

    return (
        <div className="excelDown">
            <img className="excelDownImg" src="/images/excel.png" onClick={downloadExcel}/>
        </div>
    );
};

export default ExcelDown;