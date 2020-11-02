import React, { useState } from 'react';
import Select from 'react-select';

const SortDropDown = ({ onChaneHandler }) => {
  const [value, setValue] = useState('name');
  const options = [
    { value: 'name', label: '이름순' },
    { value: 'date', label: '날짜순' },
  ];
  const onChange = (e) => {
    onChaneHandler(e.value);
    setValue(e.value);
  };

  return <Select onChange={onChange} options={options} defaultInputValue="이름순" />;
};

export default SortDropDown;
