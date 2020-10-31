import React from 'react';

import { Link } from 'react-router-dom';

import { ButtonGroup, Button } from 'react-bootstrap';

const SetsPage = () => {
  return (
    <div className="" style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Button>
          <Link to="/create-set">세트 만들기</Link>
        </Button>
      </div>
    </div>
  );
};

export default SetsPage;
