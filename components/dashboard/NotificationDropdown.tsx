import React from 'react';
import { Dropdown, List, Typography, Avatar, Button, Empty } from 'antd';
import styled from '@emotion/styled';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { markAsRead, markAllAsRead } from '../../store';
import { formatTime } from '../../utils/formatters';
import type { RootState } from '../../store';
import type { Notification } from '../../types/schema';

const { Text } = Typography;

const DropdownContainer = styled.div`
  width: 360px;
  max-height: 400px;
  background: #FFFFFF;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
`;

const DropdownHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled(Text)`
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #111827 !important;
`;

const MarkAllButton = styled(Button)`
  color: #8B5CF6;
  font-size: 12px;
  height: auto;
  padding: 4px 8px;
`;

const NotificationsList = styled.div`
  max-height: 320px;
  overflow-y: auto;
`;

const EmptyContainer = styled.div`
  padding: 40px 20px;
`;

const NotificationItem = styled(List.Item)<{ isRead: boolean }>`
  padding: 12px 20px !important;
  border-bottom: 1px solid #F3F4F6 !important;
  background-color: ${props => props.isRead ? 'transparent' : '#F8FAFC'} !important;
  cursor: pointer !important;
  transition: background-color 0.2s !important;
`;

const NotificationContent = styled.div`
  width: 100%;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const NotificationTitle = styled(Text)<{ isRead: boolean }>`
  font-weight: ${props => props.isRead ? 400 : 600} !important;
  color: #111827 !important;
  font-size: 14px !important;
`;

const NotificationMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NotificationTime = styled(Text)`
  font-size: 11px !important;
  color: #6B7280 !important;
`;

const UnreadDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #8B5CF6;
`;

const NotificationMessage = styled(Text)`
  font-size: 13px !important;
  color: #6B7280 !important;
  line-height: 1.4 !important;
`;

const BellIcon = styled.div`
  cursor: pointer;
  color: #6B7280;
`;

const NotificationDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications);

  const handleMarkAsRead = (notificationId: number) => {
    dispatch(markAsRead(notificationId));
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const dropdownContent = (
    <DropdownContainer>
      <DropdownHeader>
        <HeaderTitle>
          Notifications
        </HeaderTitle>
        {notifications.unreadCount > 0 && (
          <MarkAllButton 
            type="text" 
            size="small"
            icon={<CheckCheck size={14} />}
            onClick={handleMarkAllAsRead}
          >
            Mark all read
          </MarkAllButton>
        )}
      </DropdownHeader>

      <NotificationsList>
        {notifications.items.length === 0 ? (
          <EmptyContainer>
            <Empty 
              description="No notifications"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </EmptyContainer>
        ) : (
          <List
            dataSource={notifications.items}
            renderItem={(item: Notification) => (
              <NotificationItem
                isRead={item.read}
                onClick={() => !item.read && handleMarkAsRead(item.id)}
              >
                <NotificationContent>
                  <NotificationHeader>
                    <NotificationTitle isRead={item.read}>
                      {item.title}
                    </NotificationTitle>
                    <NotificationMeta>
                      <NotificationTime>
                        {formatTime(item.timestamp)}
                      </NotificationTime>
                      {!item.read && <UnreadDot />}
                    </NotificationMeta>
                  </NotificationHeader>
                  <NotificationMessage>
                    {item.message}
                  </NotificationMessage>
                </NotificationContent>
              </NotificationItem>
            )}
          />
        )}
      </NotificationsList>
    </DropdownContainer>
  );

  return (
    <Dropdown
      dropdownRender={() => dropdownContent}
      trigger={['click']}
      placement="bottomRight"
      arrow={{ pointAtCenter: true }}
    >
      <BellIcon>
        <Bell size={20} />
      </BellIcon>
    </Dropdown>
  );
};

export default NotificationDropdown;