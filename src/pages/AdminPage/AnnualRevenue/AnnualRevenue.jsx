import React, { useState } from 'react';
import RevenueChart from './RevenueChart';
import { Select } from 'antd';

const { Option } = Select;

const AnnualRevenue = () => {
  const [year, setYear] = useState(2024);

  const handleChange = (value) => {
    setYear(value);
  };

  return (
    <div className="annual-revenue">
      <header className="App-header">
        <h1 className="text-3xl text-center font-bold">
          Annual Revenue Dashboard
        </h1>
        <Select value={year} onChange={handleChange} style={{ width: 120 }}>
          <Option value={2023}>2023</Option>
          <Option value={2024}>2024</Option>
          <Option value={2025}>2025</Option>
        </Select>
        <RevenueChart year={year} />
      </header>
    </div>
  );
};

export default AnnualRevenue;
