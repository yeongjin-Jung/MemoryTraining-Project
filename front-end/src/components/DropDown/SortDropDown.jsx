import React, { useState } from 'react';
import Select from 'react-select';

const SortDropDown = ({ onChaneHandler }) => {
  const [value, setValue] = useState('name');
  const options = [
    { value: 'name', label: '이름' },
    { value: 'date', label: '날짜(오래된순)' },
  ];
  const onChange = (e) => {
    onChaneHandler(e.value);
    setValue(e.value);
  };

  return <Select onChange={onChange} options={options} placeholder={'분류'} />;
};

export default SortDropDown;
