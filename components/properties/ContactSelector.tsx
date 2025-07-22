import React from 'react';
import { Select, Avatar } from 'antd';
import { User } from 'lucide-react';
import styled from '@emotion/styled';
import type { ContactOption } from '../../types/schema';

const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 100%;
  
  .ant-select-selection-item {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactName = styled.span`
  font-weight: 500;
  color: #374151;
`;

const ContactRole = styled.span`
  font-size: 12px;
  color: #6B7280;
`;

interface ContactSelectorProps {
  value?: number;
  onChange?: (value: number) => void;
  placeholder?: string;
  contacts: ContactOption[];
  filterByRole?: 'Property Manager' | 'Property Owner';
  error?: string;
}

const ContactSelector: React.FC<ContactSelectorProps> = ({
  value,
  onChange,
  placeholder = "Select contact",
  contacts,
  filterByRole,
  error
}) => {
  const filteredContacts = filterByRole 
    ? contacts.filter(contact => contact.role === filterByRole)
    : contacts;

  const selectedContact = contacts.find(contact => contact.id === value);

  return (
    <div>
      <StyledSelect
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          (option?.children as any)?.props?.children[1]?.props?.children[0]?.props?.children
            ?.toLowerCase()
            ?.includes(input.toLowerCase()) ?? false
        }
        status={error ? 'error' : undefined}
      >
        {filteredContacts.map(contact => (
          <Option key={contact.id} value={contact.id}>
            <OptionContainer>
              <Avatar 
                size={24} 
                src={contact.avatar}
                icon={<User size={14} />}
              >
                {contact.initials}
              </Avatar>
              <ContactInfo>
                <ContactName>{contact.name}</ContactName>
                <ContactRole>{contact.role}</ContactRole>
              </ContactInfo>
            </OptionContainer>
          </Option>
        ))}
      </StyledSelect>
      
      {error && (
        <div style={{ color: '#EF4444', fontSize: '14px', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default ContactSelector;