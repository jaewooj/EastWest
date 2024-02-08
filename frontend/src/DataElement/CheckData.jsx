import React from 'react';
import './CheckData.css'
import { useSelector, useDispatch } from 'react-redux';
import { changeItem } from '../store/modules/itemSlice';

const CheckData = () => {
    const selectedOption = useSelector(state => state.item.selectedOption); // Redux 스토어의 selectedOption 값을 가져옵니다.
    const dispatch = useDispatch(); // useDispatch 훅을 사용하여 디스패치 함수를 가져옵니다.

    const handleOptionChange = (event) => {
        dispatch(changeItem(event.target.value));
    };
    
    return (
        <div className="checkData">
            <div className="commonCb totalGr">
                <input type="radio" 
                value="option1" 
                checked={selectedOption==='option1'}
                onChange={handleOptionChange}
                />
                <p>통합</p>
            </div>
            <div className="commonCb arrayGr">
                <input type="radio" 
                value="option2" 
                checked={selectedOption==='option2'}
                onChange={handleOptionChange}
                />
                <p>어레이</p>
            </div>
            <div className="commonCb InvGr">
                <input type="radio" 
                value="option3" 
                checked={selectedOption==='option3'}
                onChange={handleOptionChange}/>
                <p>인버터</p>
            </div>
            <div className="commonCb insolation">
                <input type="radio"
                value="option4" 
                checked={selectedOption==='option4'}
                onChange={handleOptionChange}
                 />
                <p>일사량</p>
            </div>
        </div>
    );
};

export default CheckData;