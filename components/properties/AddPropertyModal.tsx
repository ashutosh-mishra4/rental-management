import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Button, 
  Row, 
  Col, 
  Card, 
  Typography, 
  Space,
  message 
} from 'antd';
import { X, Building, DollarSign } from 'lucide-react';
import styled from '@emotion/styled';
import PropertyImageUpload from './PropertyImageUpload';
import ContactSelector from './ContactSelector';
import PropertyTagsSelector from './PropertyTagsSelector';
import { useFormValidation } from '../../hooks/useFormValidation';
import { PropertyStatus } from '../../types/enums';
import type { PropertyFormData, ContactOption } from '../../types/schema';
import { mockContacts, mockCities, defaultPropertyForm } from '../../data/addPropertyMockData';
import { formatPropertyStatus } from '../../utils/formatters';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 12px;
    overflow: hidden;
  }
  
  .ant-modal-header {
    background: #FFFFFF;
    border-bottom: 1px solid #E5E7EB;
    padding: 20px 24px;
  }
  
  .ant-modal-body {
    padding: 24px;
    max-height: 70vh;
    overflow-y: auto;
  }
  
  .ant-modal-footer {
    border-top: 1px solid #E5E7EB;
    padding: 16px 24px;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ModalTitle = styled(Title)`
  margin: 0 !important;
  font-size: 20px !important;
  font-weight: 600 !important;
  color: #111827 !important;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CloseButton = styled(Button)`
  border: none;
  box-shadow: none;
  padding: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #F3F4F6;
  }
`;

const FormSection = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  
  .ant-card-head {
    border-bottom: 1px solid #F3F4F6;
    padding: 16px 20px;
  }
  
  .ant-card-body {
    padding: 20px;
  }
`;

const SectionTitle = styled(Text)`
  font-weight: 600;
  color: #374151;
  font-size: 16px;
`;

const RequiredLabel = styled.span`
  color: #EF4444;
  margin-left: 4px;
`;

const UnitCalculation = styled.div`
  background: #F9FAFB;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  padding: 12px;
  margin-top: 8px;
`;

const CalculationText = styled(Text)`
  color: #6B7280;
  font-size: 13px;
`;

interface AddPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (propertyData: PropertyFormData) => Promise<void>;
  loading?: boolean;
}

const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  open,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<PropertyFormData>(defaultPropertyForm);
  const [submitting, setSubmitting] = useState(false);
  const { errors, validateForm, isFormValid, clearErrors } = useFormValidation();

  useEffect(() => {
    if (open) {
      form.resetFields();
      setFormData(defaultPropertyForm);
      clearErrors();
    }
  }, [open, form, clearErrors]);

  const handleFieldChange = (field: keyof PropertyFormData, value: any) => {
    const newFormData = { ...formData, [field]: value };
    
    // Auto-calculate vacant units
    if (field === 'units' || (typeof value === 'object' && 'total' in value)) {
      const units = field === 'units' ? value : newFormData.units;
      units.vacant = Math.max(0, units.total - units.occupied);
      newFormData.units = units;
    }
    
    setFormData(newFormData);
    form.setFieldsValue(newFormData);
  };

  const handleUnitsChange = (type: 'total' | 'occupied', value: number | null) => {
    const newUnits = { ...formData.units };
    newUnits[type] = value || 0;
    newUnits.vacant = Math.max(0, newUnits.total - newUnits.occupied);
    
    handleFieldChange('units', newUnits);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        message.error('Please fix the form errors before submitting');
        return;
      }

      await onSubmit(formData);
      message.success('Property created successfully!');
      onClose();
    } catch (error) {
      message.error('Failed to create property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const modalFooter = (
    <Space>
      <Button onClick={onClose} disabled={submitting}>
        Cancel
      </Button>
      <Button 
        type="primary" 
        onClick={handleSubmit}
        loading={submitting || loading}
        disabled={!isFormValid(formData)}
      >
        Save Property
      </Button>
    </Space>
  );

  return (
    <StyledModal
      title={
        <ModalHeader>
          <ModalTitle level={3}>
            <Building size={20} color="#8B5CF6" />
            Add New Property
          </ModalTitle>
          <CloseButton type="text" onClick={onClose}>
            <X size={16} />
          </CloseButton>
        </ModalHeader>
      }
      open={open}
      onCancel={onClose}
      footer={modalFooter}
      width={800}
      destroyOnClose
      closable={false}
    >
      <Form form={form} layout="vertical" initialValues={formData}>
        {/* Property Information */}
        <FormSection title={<SectionTitle>Property Information</SectionTitle>}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    Property Name
                    <RequiredLabel>*</RequiredLabel>
                  </>
                }
                validateStatus={errors.name ? 'error' : ''}
                help={errors.name}
              >
                <Input
                  placeholder="Enter property name"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <>
                    City
                    <RequiredLabel>*</RequiredLabel>
                  </>
                }
                validateStatus={errors.city ? 'error' : ''}
                help={errors.city}
              >
                <Select
                  placeholder="Select city"
                  value={formData.city}
                  onChange={(value) => handleFieldChange('city', value)}
                >
                  {mockCities.map(city => (
                    <Option key={city} value={city}>{city}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item
            label={
              <>
                Address
                <RequiredLabel>*</RequiredLabel>
              </>
            }
            validateStatus={errors.address ? 'error' : ''}
            help={errors.address}
          >
            <Input
              placeholder="Enter full address"
              value={formData.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
            />
          </Form.Item>
          
          <Form.Item label="Description">
            <TextArea
              placeholder="Enter property description (optional)"
              rows={3}
              value={formData.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
            />
          </Form.Item>
        </FormSection>

        {/* Property Image */}
        <FormSection title={<SectionTitle>Property Image</SectionTitle>}>
          <PropertyImageUpload
            value={formData.thumbnail}
            onChange={(url) => handleFieldChange('thumbnail', url)}
            error={errors.thumbnail}
          />
        </FormSection>

        {/* Unit Configuration */}
        <FormSection title={<SectionTitle>Unit Configuration</SectionTitle>}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Total Units
                    <RequiredLabel>*</RequiredLabel>
                  </>
                }
                validateStatus={errors.totalUnits ? 'error' : ''}
                help={errors.totalUnits}
              >
                <InputNumber
                  min={1}
                  placeholder="Enter total units"
                  style={{ width: '100%' }}
                  value={formData.units.total}
                  onChange={(value) => handleUnitsChange('total', value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Occupied Units"
                validateStatus={errors.occupiedUnits ? 'error' : ''}
                help={errors.occupiedUnits}
              >
                <InputNumber
                  min={0}
                  max={formData.units.total}
                  placeholder="Enter occupied units"
                  style={{ width: '100%' }}
                  value={formData.units.occupied}
                  onChange={(value) => handleUnitsChange('occupied', value)}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Vacant Units">
                <InputNumber
                  value={formData.units.vacant}
                  disabled
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <UnitCalculation>
            <CalculationText>
              Vacant units are automatically calculated: Total ({formData.units.total}) - Occupied ({formData.units.occupied}) = Vacant ({formData.units.vacant})
            </CalculationText>
          </UnitCalculation>
        </FormSection>

        {/* Financial Information */}
        <FormSection title={
          <SectionTitle>
            <DollarSign size={16} style={{ marginRight: 8 }} />
            Financial Information
          </SectionTitle>
        }>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Monthly Revenue"
                validateStatus={errors.monthlyRevenue ? 'error' : ''}
                help={errors.monthlyRevenue}
              >
                <InputNumber
                  min={0}
                  placeholder="Enter total monthly revenue"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                  value={formData.monthlyRevenue}
                  onChange={(value) => handleFieldChange('monthlyRevenue', value || 0)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Average Rent per Unit">
                <InputNumber
                  min={0}
                  placeholder="Enter average rent per unit"
                  style={{ width: '100%' }}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => Number(value!.replace(/\$\s?|(,*)/g, ''))}
                  value={formData.averageRent}
                  onChange={(value) => handleFieldChange('averageRent', value || 0)}
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>

        {/* Property Status & Contacts */}
        <FormSection title={<SectionTitle>Property Status & Management</SectionTitle>}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Property Status">
                <Select
                  value={formData.status}
                  onChange={(value) => handleFieldChange('status', value)}
                >
                  {Object.values(PropertyStatus).map(status => (
                    <Option key={status} value={status}>
                      {formatPropertyStatus(status)}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Property Manager
                    <RequiredLabel>*</RequiredLabel>
                  </>
                }
              >
                <ContactSelector
                  value={formData.managerId || undefined}
                  onChange={(value) => handleFieldChange('managerId', Number(value))}
                  placeholder="Select property manager"
                  contacts={mockContacts}
                  filterByRole="Property Manager"
                  error={errors.managerId}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={
                  <>
                    Property Owner
                    <RequiredLabel>*</RequiredLabel>
                  </>
                }
              >
                <ContactSelector
                  value={formData.ownerId || undefined}
                  onChange={(value) => handleFieldChange('ownerId', Number(value))}
                  placeholder="Select property owner"
                  contacts={mockContacts}
                  filterByRole="Property Owner"
                  error={errors.ownerId}
                />
              </Form.Item>
            </Col>
          </Row>
        </FormSection>

        {/* Property Amenities */}
        <FormSection title={<SectionTitle>Property Amenities</SectionTitle>}>
          <Form.Item label="Select amenities and features">
            <PropertyTagsSelector
              value={formData.tags}
              onChange={(tags) => handleFieldChange('tags', tags)}
            />
          </Form.Item>
        </FormSection>
      </Form>
    </StyledModal>
  );
};

export default AddPropertyModal;