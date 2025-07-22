import React, { useState, useEffect } from 'react';
import { Layout, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import Sidebar from '../dashboard/Sidebar';
import TopBar from '../dashboard/TopBar';
import PropertiesHeader from './PropertiesHeader';
import PropertiesFilters from './PropertiesFilters';
import PropertiesViewToggle from './PropertiesViewToggle';
import PropertiesTable from './PropertiesTable';
import PropertiesGrid from './PropertiesGrid';
import BulkActionsBar from './BulkActionsBar';
import AddPropertyModal from './AddPropertyModal';
import { 
  useGetPropertiesQuery,
  useArchivePropertiesMutation,
  useSendRemindersMutation,
  useExportPropertiesCSVMutation,
  useCreatePropertyMutation,
  setViewMode,
  setFilters,
  setSelectedProperties,
  togglePropertySelection,
  selectAllProperties,
  clearPropertySelection,
  openAddPropertyModal,
  closeAddPropertyModal
} from '../../store';
import { PropertyViewMode } from '../../types/enums';
import type { RootState } from '../../store';

const { Content } = Layout;

const PropertiesLayout = styled(Layout)`
  min-height: 100vh;
  background: #F9FAFB;
`;

const PropertiesContent = styled(Content)<{ sidebarWidth: number; topBarHeight: number }>`
  margin-left: ${props => props.sidebarWidth}px;
  margin-top: ${props => props.topBarHeight}px;
  padding: 24px;
  background: #F9FAFB;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const PropertiesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { viewMode, filters, selectedProperties, addPropertyModal } = useSelector((state: RootState) => state.properties);
  
  const { data: properties = [], isLoading, refetch } = useGetPropertiesQuery(filters);
  const [archiveProperties] = useArchivePropertiesMutation();
  const [sendReminders] = useSendRemindersMutation();
  const [exportCSV] = useExportPropertiesCSVMutation();
  const [createProperty] = useCreatePropertyMutation();

  const sidebarWidth = 280;
  const topBarHeight = 72;

  const handleViewModeChange = (mode: PropertyViewMode) => {
    dispatch(setViewMode(mode));
  };

  const handleFiltersChange = (newFilters: typeof filters) => {
    dispatch(setFilters(newFilters));
    dispatch(clearPropertySelection());
  };

  const handlePropertySelect = (propertyId: number) => {
    dispatch(togglePropertySelection(propertyId));
  };

  const handleSelectAll = (selected: boolean, propertyIds: number[]) => {
    if (selected) {
      dispatch(selectAllProperties(propertyIds));
    } else {
      dispatch(clearPropertySelection());
    }
  };

  const handlePropertyAction = (action: string, propertyId: number) => {
    switch (action) {
      case 'view':
        message.info(`Viewing property ${propertyId}`);
        break;
      case 'edit':
        message.info(`Editing property ${propertyId}`);
        break;
      case 'invoices':
        message.info(`Viewing invoices for property ${propertyId}`);
        break;
      case 'tenants':
        message.info(`Managing tenants for property ${propertyId}`);
        break;
    }
  };

  const handleAddProperty = () => {
    dispatch(openAddPropertyModal());
  };

  const handleCloseModal = () => {
    dispatch(closeAddPropertyModal());
  };

  const handleCreateProperty = async (propertyData: any) => {
    try {
      await createProperty(propertyData).unwrap();
      refetch(); // Refresh the properties list
    } catch (error) {
      throw error;
    }
  };

  const handleSendReminders = async () => {
    if (selectedProperties.length === 0) {
      message.warning('Please select properties to send reminders');
      return;
    }
    
    try {
      const result = await sendReminders(selectedProperties).unwrap();
      message.success(`Reminders sent to ${result.remindersSent} ${result.remindersSent === 1 ? 'property' : 'properties'}`);
      dispatch(clearPropertySelection());
    } catch (error) {
      message.error('Failed to send reminders');
    }
  };

  const handleArchiveSelected = async () => {
    if (selectedProperties.length === 0) {
      message.warning('Please select properties to archive');
      return;
    }
    
    try {
      const result = await archiveProperties(selectedProperties).unwrap();
      message.success(`${result.archivedCount} ${result.archivedCount === 1 ? 'property' : 'properties'} archived successfully`);
      dispatch(clearPropertySelection());
    } catch (error) {
      message.error('Failed to archive properties');
    }
  };

  const handleExportCSV = async () => {
    if (selectedProperties.length === 0) {
      message.warning('Please select properties to export');
      return;
    }
    
    try {
      const result = await exportCSV(selectedProperties).unwrap();
      message.success(`CSV export ready! ${result.exportedCount} ${result.exportedCount === 1 ? 'property' : 'properties'} exported`);
      // In a real app, you would trigger the download here
      // window.open(result.downloadUrl, '_blank');
      dispatch(clearPropertySelection());
    } catch (error) {
      message.error('Failed to export CSV');
    }
  };

  const handleClearSelection = () => {
    dispatch(clearPropertySelection());
  };

  if (isLoading) {
    return (
      <PropertiesLayout>
        <Sidebar />
        <TopBar sidebarWidth={sidebarWidth} />
        <PropertiesContent sidebarWidth={sidebarWidth} topBarHeight={topBarHeight}>
          <LoadingContainer>
            <Spin size="large" />
          </LoadingContainer>
        </PropertiesContent>
      </PropertiesLayout>
    );
  }

  return (
    <PropertiesLayout>
      <Sidebar />
      <TopBar sidebarWidth={sidebarWidth} />
      
      <PropertiesContent sidebarWidth={sidebarWidth} topBarHeight={topBarHeight}>
        <PropertiesHeader onAddProperty={handleAddProperty} />
        
        <PropertiesFilters 
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
        
        <PropertiesViewToggle
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
        />
        
        {viewMode === PropertyViewMode.TABLE ? (
          <PropertiesTable
            properties={properties}
            selectedProperties={selectedProperties}
            onPropertySelect={handlePropertySelect}
            onSelectAll={handleSelectAll}
            onPropertyAction={handlePropertyAction}
            loading={isLoading}
          />
        ) : (
          <PropertiesGrid
            properties={properties}
            selectedProperties={selectedProperties}
            onPropertySelect={handlePropertySelect}
            onPropertyAction={handlePropertyAction}
            loading={isLoading}
            total={properties.length}
          />
        )}
      </PropertiesContent>

      <BulkActionsBar
        selectedCount={selectedProperties.length}
        onSendReminders={handleSendReminders}
        onArchive={handleArchiveSelected}
        onExportCSV={handleExportCSV}
        onClear={handleClearSelection}
      />

      <AddPropertyModal
        open={addPropertyModal.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateProperty}
        loading={addPropertyModal.isLoading}
      />
    </PropertiesLayout>
  );
};

export default PropertiesPage;