'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { store } from '../../store';
import theme from '../../theme';
import PropertiesPage from '../../components/properties/PropertiesPage';

const PropertiesRoute: React.FC = () => {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <PropertiesPage />
      </ConfigProvider>
    </Provider>
  );
};

export default PropertiesRoute;