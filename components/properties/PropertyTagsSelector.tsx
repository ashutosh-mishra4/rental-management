import React from 'react';
import { Select, Tag } from 'antd';
import { Tags } from 'lucide-react';
import styled from '@emotion/styled';
import { PropertyTag } from '../../types/enums';
import { formatPropertyTag } from '../../utils/formatters';

const { Option } = Select;

const StyledSelect = styled(Select)`
  width: 100%;
  
  .ant-select-selection-item {
    border-radius: 6px;
    background: #F3F4F6;
    border: 1px solid #E5E7EB;
  }
`;

const TagOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagIcon = styled(Tags)`
  color: #8B5CF6;
`;

interface PropertyTagsSelectorProps {
  value?: PropertyTag[];
  onChange?: (tags: PropertyTag[]) => void;
  placeholder?: string;
}

const PropertyTagsSelector: React.FC<PropertyTagsSelectorProps> = ({
  value = [],
  onChange,
  placeholder = "Select amenities and features"
}) => {
  const tagOptions = Object.values(PropertyTag).map(tag => ({
    value: tag,
    label: formatPropertyTag(tag)
  }));

  return (
    <StyledSelect
      mode="multiple"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxTagCount="responsive"
      tagRender={(props) => {
        const { label, closable, onClose } = props;
        return (
          <Tag
            color="blue"
            closable={closable}
            onClose={onClose}
            style={{ marginRight: 3, borderRadius: 6 }}
          >
            {label}
          </Tag>
        );
      }}
    >
      {tagOptions.map(option => (
        <Option key={option.value} value={option.value}>
          <TagOption>
            <TagIcon size={14} />
            {option.label}
          </TagOption>
        </Option>
      ))}
    </StyledSelect>
  );
};

export default PropertyTagsSelector;