import React from 'react';

const NtcItem = ({item}) => {
    const {no,title,writer,time} = item
    return (
        <tr>
            <td>{no}</td>
            <td>{title}</td>
            <td>{writer}</td>
            <td>{time}</td>
        </tr>
    );
};

export default NtcItem;