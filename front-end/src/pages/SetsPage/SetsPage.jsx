import React from 'react';

import { Link } from 'react-router-dom';

import { ButtonGroup, Button } from 'react-bootstrap';

const SetsPage = () => {
  return (
    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h2>abc@abc.com</h2>
        <h5>이름</h5>
      </div>

      <div>
        <Button>
          <Link to="/create-set">세트 만들기</Link>
        </Button>
      </div>

      <div>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">만든 세트</Button>
          <Button variant="secondary">학습한 세트</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default SetsPage;
