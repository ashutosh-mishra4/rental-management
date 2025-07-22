import React from 'react';
import { Row, Col, Input, Select, Space } from 'antd';
import { Search } from 'lucide-react';
import styled from '@emotion/styled';
import { PropertyFilters } from '../../types/schema';
import { PropertyTag } from '../../types/enums';
import { formatPropertyTag } from '../../utils/formatters';

const { Option } = Select;

const FiltersContainer = styled(Row)`
  margin-bottom: 24px;
  padding: 20px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid #E5E7EB;
`;

const SearchInput = styled(Input)`
  .ant-input {
    padding-left: 40px;
  }
`;

const FilterSelect = styled(Select)`
  width: 100%;
`;

interface PropertiesFiltersProps {
  filters: PropertyFilters;
  onFiltersChange: (filters: PropertyFilters) => void;
}

const PropertiesFilters: React.FC<PropertiesFiltersProps> = ({ 
  filters, 
  onFiltersChange 
}) => {
  const handleFilterChange = (key: keyof PropertyFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <FiltersContainer gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={6}>
        <SearchInput
          placeholder="Search properties..."
          prefix={<Search size={16} color="#6B7280" />}
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          allowClear
        />
      </Col>
      
      <Col xs={12} sm={6} md={4} lg={3}>
        <FilterSelect
          placeholder="Status"
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        >
          <Option value="all">All Statuses</Option>
          <Option value="active">Active</Option>
          <Option value="vacant">Vacant</Option>
          <Option value="archived">Archived</Option>
        </FilterSelect>
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <FilterSelect
          placeholder="City"
          value={filters.city}
          onChange={(value) => handleFilterChange('city', value)}
        >
          <Option value="all">All Cities</Option>
          <Option value="New York">New York</Option>
          <Option value="Los Angeles">Los Angeles</Option>
          <Option value="Chicago">Chicago</Option>
          <Option value="Houston">Houston</Option>
          <Option value="Phoenix">Phoenix</Option>
          <Option value="Miami">Miami</Option>
        </FilterSelect>
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <FilterSelect
          placeholder="Unit Count"
          value={filters.unitCount}
          onChange={(value) => handleFilterChange('unitCount', value)}
        >
          <Option value="any">Any Units</Option>
          <Option value="1-5">1-5 units</Option>
          <Option value="6-20">6-20 units</Option>
          <Option value="21+">21+ units</Option>
        </FilterSelect>
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <FilterSelect
          placeholder="Vacancy"
          value={filters.vacancy}
          onChange={(value) => handleFilterChange('vacancy', value)}
        >
          <Option value="any">Any Vacancy</Option>
          <Option value="available">Available</Option>
          <Option value="fully_occupied">Fully Occupied</Option>
          <Option value="partially_vacant">Partially Vacant</Option>
        </FilterSelect>
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <FilterSelect
          placeholder="Price Range"
          value={filters.priceRange}
          onChange={(value) => handleFilterChange('priceRange', value)}
        >
          <Option value="any">Any Price</Option>
          <Option value="0-1000">$0 - $1,000</Option>
          <Option value="1000-2500">$1,000 - $2,500</Option>
          <Option value="2500-5000">$2,500 - $5,000</Option>
          <Option value="5000+">$5,000+</Option>
        </FilterSelect>
      </Col>

      <Col xs={12} sm={6} md={4} lg={3}>
        <FilterSelect
          mode="multiple"
          placeholder="Tags"
          value={filters.tags}
          onChange={(value) => handleFilterChange('tags', value)}
        >
          {Object.values(PropertyTag).map(tag => (
            <Option key={tag} value={tag}>
              {formatPropertyTag(tag)}
            </Option>
          ))}
        </FilterSelect>
      </Col>
    </FiltersContainer>
  );
};

export default PropertiesFilters;