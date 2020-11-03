import React, { useState } from 'react';
import Select from 'react-select';

const DropDown = ({ onChanegeHandler }) => {
  const [value, setValue] = useState('모든 세트목록');
  const options = [
    { value: 'all', label: '모든 세트목록' },
    { value: 'MySet', label: '내 세트만 보기' },
    { value: 'Scrap', label: '스크랩만 보기' },
  ];
  const onChange = (e) => {
    onChanegeHandler(e.value);
    setValue(e.value);
  };

  return <Select onChange={onChange} options={options} placeholder={'분류'} />;
};

export default DropDown;
