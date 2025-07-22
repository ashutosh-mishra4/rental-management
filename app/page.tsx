'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from '../store';
import theme from '../theme';
import Dashboard from '../components/dashboard/Dashboard';
import { ChartPeriod } from '../types/enums';

const DashboardPage: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Dashboard
          selectedPeriod={ChartPeriod.MONTHLY}
          currentMonth={11}
        />
      </ConfigProvider>
    </Provider>
  );
};

export default DashboardPage;