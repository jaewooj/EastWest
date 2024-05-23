import React, {useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DateSearch.css'
import axios from 'axios'; 
import { useSelector, useDispatch } from 'react-redux';
import { changeArrayItem, changeIntegratedItem } from '../store/modules/itemSlice';
import webUrl from '../common/weburl';

const DateSearch = () => {
    const selectedOption = useSelector(state => state.item.selectedOption);
    const dispatch = useDispatch();
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate()-1);
    yesterday.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    today.setHours(0,0,0,0);
    const [startDate01, setStartDate01] = useState(today);
    const [startDate02, setStartDate02] = useState(tomorrow);
    const [minDate01, setMinDate01] = useState(new Date());
    const [searchResults,setSearchResults] = useState([]);

    const ExampleCustomInput = ({ value, onClick }) => (
      <button className="custom-input" onClick={onClick}>
        {value}
      </button>
    );
    const handleStartDateChange = (date) => {
        setStartDate01(date);
        // 두 번째 DatePicker의 최소 날짜를 첫 번째 DatePicker의 다음 날로 설정
        setMinDate01(new Date(date.getTime() + 24 * 60 * 60 * 1000));
        setStartDate02(new Date(date.getTime() + 24 * 60 * 60 * 1000));
        // setStartDate02와 minDate02를 조정하여 유효한 범위로 설정할 수도 있습니다.
        // setStartDate02(new Date(date.getTime() + 24 * 60 * 60 * 1000));
    };
    useEffect(()=>{
        const clickSearch = async () => {
            try {
                const now = startDate01;
                const year = now.getFullYear();
                const month = now.getMonth()+1;
                const day = now.getDate();
                const tableName = `DATA_${year}_${month}_${day}_hour`;
                const response = await axios.get(`http://${webUrl}:5021/search/${tableName}`)
                setSearchResults(response.data) // 검색결과를 상태에 저장
                /* console.log(`${searchResults}`) */
            } catch (error) {
                console.error('검색 오류 : ', error);
            }
        };
        clickSearch();
    },[startDate02])
    
    const arrayDataInput = ()=> {
        if(selectedOption==='option1'){
            dispatch(changeIntegratedItem(searchResults));
        } else if(selectedOption==='option2'){
            dispatch(changeArrayItem(searchResults));
        } else if(selectedOption==='option3'){
            
        } else if(selectedOption==='option4'){

        }
        /* console.log(`zz${searchResults}`) */
    }


    return (
        <div className="dateSearch">
            <DatePicker
            selected={startDate01}
            onChange={handleStartDateChange}
            customInput={<ExampleCustomInput />}
            dateFormat="yyyy-MM-dd, HH:00:00"
            maxDate={new Date()}
            />
            <p>&nbsp;~&nbsp;</p>
             <DatePicker
            selected={startDate02}
            onChange={date => setStartDate02(date)}
            customInput={<ExampleCustomInput />}
            /* showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="Time" */
            dateFormat="yyyy-MM-dd, HH:00:00"
            minDate={minDate01}
            maxDate={minDate01}
            />
            <button className="searchBtn" onClick={arrayDataInput}>검색</button>
        </div>
    );
};

export default DateSearch;