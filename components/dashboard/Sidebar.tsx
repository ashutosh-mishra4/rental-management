import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useRouter, usePathname } from 'next/navigation';
import styled from '@emotion/styled';
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  FileText, 
  CreditCard, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const { Sider } = Layout;

const StyledSider = styled(Sider)<{ collapsed: boolean }>`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  border-right: 1px solid #E5E7EB;
  z-index: 100;
`;

const LogoContainer = styled.div`
  padding: 24px;
  border-bottom: 1px solid #E5E7EB;
`;

const LogoText = styled.div<{ collapsed: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: #8B5CF6;
  text-align: ${props => props.collapsed ? 'center' : 'left'};
`;

const StyledMenu = styled(Menu)`
  border: none;
  padding-top: 16px;
  padding-left: 12px;
  padding-right: 12px;
`;

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedKey, setSelectedKey] = useState('dashboard');

  // Update selected key based on current pathname
  useEffect(() => {
    if (pathname.includes('properties')) {
      setSelectedKey('properties');
    } else if (pathname === '/' || pathname.includes('dashboard')) {
      setSelectedKey('dashboard');
    }
  }, [pathname]);

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    
    // Navigate to the appropriate route
    switch (key) {
      case 'dashboard':
        router.push('/');
        break;
      case 'properties':
        router.push('/properties');
        break;
      case 'tenants':
        // Future implementation
        break;
      case 'invoices':
        // Future implementation
        break;
      case 'payments':
        // Future implementation
        break;
      case 'settings':
        // Future implementation
        break;
      case 'support':
        // Future implementation
        break;
      default:
        break;
    }
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard'
    },
    {
      key: 'properties',
      icon: <Building size={20} />,
      label: 'Properties'
    },
    {
      key: 'tenants',
      icon: <Users size={20} />,
      label: 'Tenants'
    },
    {
      key: 'invoices',
      icon: <FileText size={20} />,
      label: 'Invoices'
    },
    {
      key: 'payments',
      icon: <CreditCard size={20} />,
      label: 'Payments'
    },
    {
      key: 'settings',
      icon: <Settings size={20} />,
      label: 'Settings'
    },
    {
      key: 'support',
      icon: <HelpCircle size={20} />,
      label: 'Support'
    }
  ];

  return (
    <StyledSider
      width={280}
      collapsed={collapsed}
    >
      <LogoContainer>
        <LogoText collapsed={collapsed}>
          {collapsed ? 'RE' : 'RealEstate Pro'}
        </LogoText>
      </LogoContainer>
      
      <StyledMenu
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
      />
    </StyledSider>
  );
};

export default Sidebar;