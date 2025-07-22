import React from 'react';
import { Layout, Badge, Dropdown, Avatar, Typography } from 'antd';
import styled from '@emotion/styled';
import { User, Settings, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import NotificationDropdown from './NotificationDropdown';
import type { RootState } from '../../store';

const { Header } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)<{ sidebarWidth: number }>`
  position: fixed;
  top: 0;
  right: 0;
  left: ${props => props.sidebarWidth}px;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  padding: 0 24px;
`;

const DashboardTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #111827;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #F9FAFB;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const UserName = styled(Text)`
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 1.2 !important;
`;

const UserRole = styled(Text)`
  font-size: 12px !important;
  color: #6B7280 !important;
  line-height: 1.2 !important;
`;

const StyledAvatar = styled(Avatar)`
  border-radius: 8px;
`;

interface TopBarProps {
  sidebarWidth?: number;
}

const TopBar: React.FC<TopBarProps> = ({ sidebarWidth = 280 }) => {
  const user = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.notifications);
  
  const getPageTitle = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('properties')) return 'Properties';
      return 'Dashboard';
    }
    return 'Dashboard';
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <User size={16} />,
      label: 'View Profile'
    },
    {
      key: 'settings',
      icon: <Settings size={16} />,
      label: 'Account Settings'
    },
    {
      type: 'divider' as const
    },
    {
      key: 'logout',
      icon: <LogOut size={16} />,
      label: 'Logout',
      danger: true
    }
  ];

  return (
    <StyledHeader sidebarWidth={sidebarWidth}>
      <DashboardTitle>
        {getPageTitle()}
      </DashboardTitle>

      <HeaderActions>
        <Badge count={notifications.unreadCount} size="small">
          <NotificationDropdown />
        </Badge>

        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <UserDropdownContainer>
            <StyledAvatar 
              src={user.avatar} 
              size={32}
            />
            <UserInfo>
              <UserName>
                {user.name}
              </UserName>
              <UserRole>
                {user.role}
              </UserRole>
            </UserInfo>
          </UserDropdownContainer>
        </Dropdown>
      </HeaderActions>
    </StyledHeader>
  );
};

export default TopBar;