import React from 'react';
import { Card, Timeline, Avatar, Typography, Tag } from 'antd';
import styled from '@emotion/styled';
import { formatTime, formatActivityType } from '../../utils/formatters';
import type { Activity } from '../../types/schema';
import { ActivityType } from '../../types/enums';

const { Title, Text } = Typography;

const ActivityCard = styled(Card)`
  border-radius: 12px;
  border: 1px solid #E5E7EB;
  height: 400px;
  
  .ant-card-body {
    padding: 24px;
  }
`;

const ActivityTitle = styled(Title)`
  margin: 0 0 24px 0 !important;
  color: #111827 !important;
`;

const TimelineContainer = styled.div`
  height: 320px;
  overflow-y: auto;
  padding-right: 8px;
`;

const StyledTimeline = styled(Timeline)`
  padding-top: 8px;
  padding-left: 8px;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
`;

const ActivityAvatar = styled(Avatar)`
  border-radius: 8px;
`;

const SystemAvatar = styled(Avatar)`
  background-color: #8B5CF6;
  border-radius: 8px;
`;

const ActivityContent = styled.div`
  padding-bottom: 16px;
`;

const ActivityHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const ActivityDescription = styled(Text)`
  font-weight: 500 !important;
  color: #111827 !important;
`;

const ActivityTime = styled(Text)`
  font-size: 12px !important;
  color: #6B7280 !important;
`;

const ActivityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ActivityTag = styled(Tag)`
  border-radius: 12px;
  font-size: 11px;
  margin: 0;
`;

const ActivityAmount = styled(Text)`
  font-size: 12px !important;
  color: #6B7280 !important;
`;

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case ActivityType.PAYMENT_RECEIVED:
        return 'success';
      case ActivityType.TENANT_ADDED:
        return 'processing';
      case ActivityType.PROPERTY_LISTED:
        return 'warning';
      case ActivityType.INVOICE_SENT:
        return 'default';
      case ActivityType.MAINTENANCE_SCHEDULED:
        return 'error';
      default:
        return 'default';
    }
  };

  const timelineItems = activities.map(activity => ({
    key: activity.id,
    dot: (
      <AvatarContainer>
        {activity.user.avatar ? (
          <ActivityAvatar 
            src={activity.user.avatar} 
            size={32}
          />
        ) : (
          <SystemAvatar size={32}>
            {activity.user.name.charAt(0)}
          </SystemAvatar>
        )}
      </AvatarContainer>
    ),
    children: (
      <ActivityContent>
        <ActivityHeader>
          <ActivityDescription>
            {activity.description}
          </ActivityDescription>
          <ActivityTime>
            {formatTime(activity.timestamp)}
          </ActivityTime>
        </ActivityHeader>
        
        <ActivityMeta>
          <ActivityTag color={getActivityColor(activity.type)}>
            {formatActivityType(activity.type)}
          </ActivityTag>
          
          {activity.amount && (
            <ActivityAmount>
              ${activity.amount.toLocaleString()}
            </ActivityAmount>
          )}
        </ActivityMeta>
      </ActivityContent>
    )
  }));

  return (
    <ActivityCard>
      <ActivityTitle level={4}>
        Activities
      </ActivityTitle>
      
      <TimelineContainer>
        <StyledTimeline
          items={timelineItems}
          mode="left"
        />
      </TimelineContainer>
    </ActivityCard>
  );
};

export default ActivityTimeline;