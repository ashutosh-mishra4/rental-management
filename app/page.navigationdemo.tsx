'use client';

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ConfigProvider, Layout, Typography, Card, Space, Button } from 'antd';
import { store } from '../store';
import theme from '../theme';
import Dashboard from '../components/dashboard/Dashboard';
import PropertiesPage from '../components/properties/PropertiesPage';
import { ChartPeriod } from '../types/enums';
import styled from '@emotion/styled';
import { Home, Building } from 'lucide-react';

const { Content } = Layout;
const { Title, Text } = Typography;

const DemoLayout = styled(Layout)`
  min-height: 100vh;
  background: #F9FAFB;
`;

const DemoContent = styled(Content)`
  padding: 24px;
  background: #F9FAFB;
`;

const DemoCard = styled(Card)`
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const NavigationDemo: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'properties'>('dashboard');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            selectedPeriod={ChartPeriod.MONTHLY}
            currentMonth={11}
          />
        );
      case 'properties':
        return <PropertiesPage />;
      default:
        return null;
    }
  };

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <DemoLayout>
          <DemoContent>
            <DemoCard>
              <Title level={2}>Navigation Demo</Title>
              <Text>
                This demo shows the navigation functionality between Dashboard and Properties pages. 
                Click the buttons below to simulate navigation, or use the sidebar navigation within each view.
              </Text>
              
              <Space style={{ marginTop: 16 }}>
                <Button 
                  type={currentView === 'dashboard' ? 'primary' : 'default'}
                  icon={<Home size={16} />}
                  onClick={() => setCurrentView('dashboard')}
                >
                  Dashboard (Home Route)
                </Button>
                <Button 
                  type={currentView === 'properties' ? 'primary' : 'default'}
                  icon={<Building size={16} />}
                  onClick={() => setCurrentView('properties')}
                >
                  Properties (/properties Route)
                </Button>
              </Space>
            </DemoCard>
            
            {renderCurrentView()}
          </DemoContent>
        </DemoLayout>
      </ConfigProvider>
    </Provider>
  );
};

export default NavigationDemo;