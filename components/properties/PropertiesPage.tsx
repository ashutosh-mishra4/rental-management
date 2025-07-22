import React, { useState, useEffect } from 'react';
import { Layout, Spin, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Building, FileText, Users } from 'lucide-react';
import { downloadPropertiesCSV } from '../../utils/downloadUtils';
import Sidebar from '../dashboard/Sidebar';
import TopBar from '../dashboard/TopBar';
import PropertiesHeader from './PropertiesHeader';
import PropertiesFilters from './PropertiesFilters';
import PropertiesViewToggle from './PropertiesViewToggle';
import PropertiesTable from './PropertiesTable';
import PropertiesGrid from './PropertiesGrid';
import BulkActionsBar from './BulkActionsBar';
import AddPropertyModal from './AddPropertyModal';
import EditPropertyModal from './EditPropertyModal';
import RightPanel from './RightPanel';
import PropertyDetailsPanel from './PropertyDetailsPanel';
import InvoicesPanel from './InvoicesPanel';
import TenantsPanel from './TenantsPanel';
import { 
  useGetPropertiesQuery,
  useArchivePropertiesMutation,
  useSendRemindersMutation,
  useExportPropertiesCSVMutation,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  setViewMode,
  setFilters,
  setSelectedProperties,
  togglePropertySelection,
  selectAllProperties,
  clearPropertySelection,
  openAddPropertyModal,
  closeAddPropertyModal,
  addNotification
} from '../../store';
import { PropertyViewMode } from '../../types/enums';
import type { RootState } from '../../store';
import type { Property } from '../../types/schema';

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
  const [updateProperty] = useUpdatePropertyMutation();

  // Local state for panels and modals
  const [rightPanel, setRightPanel] = useState<{
    type: 'details' | 'invoices' | 'tenants' | null;
    property: Property | null;
  }>({ type: null, property: null });
  
  const [editModal, setEditModal] = useState<{
    open: boolean;
    property: Property | null;
  }>({ open: false, property: null });

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
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    switch (action) {
      case 'view':
        setRightPanel({ type: 'details', property });
        break;
      case 'edit':
        setEditModal({ open: true, property });
        break;
      case 'invoices':
        setRightPanel({ type: 'invoices', property });
        break;
      case 'tenants':
        setRightPanel({ type: 'tenants', property });
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

  const handleUpdateProperty = async (propertyData: any) => {
    try {
      if (!editModal.property) return;
      
      await updateProperty({ id: editModal.property.id, ...propertyData }).unwrap();
      refetch(); // Refresh the properties list
      setEditModal({ open: false, property: null });
    } catch (error) {
      throw error;
    }
  };

  const handleCloseRightPanel = () => {
    setRightPanel({ type: null, property: null });
  };

  const handleCloseEditModal = () => {
    setEditModal({ open: false, property: null });
  };

  const handleSendReminders = async () => {
    if (selectedProperties.length === 0) {
      message.warning('Please select properties to send reminders');
      return;
    }
    
    try {
      const result = await sendReminders(selectedProperties).unwrap();
      
      // Add notification for successful reminder sending
      dispatch(addNotification({
        title: 'Reminders Sent Successfully',
        message: `Payment reminders have been sent to ${result.remindersSent} ${result.remindersSent === 1 ? 'property' : 'properties'}. Tenants will receive notifications via email and SMS.`
      }));
      
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
      refetch(); // Refresh the properties list to show updated status
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
      // Get the selected properties data
      const selectedPropertiesData = properties.filter(property => 
        selectedProperties.includes(property.id)
      );
      
      // Download the CSV file
      downloadPropertiesCSV(selectedPropertiesData);
      
      const result = await exportCSV(selectedProperties).unwrap();
      message.success(`CSV export completed! ${result.exportedCount} ${result.exportedCount === 1 ? 'property' : 'properties'} exported`);
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

      <EditPropertyModal
        open={editModal.open}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateProperty}
        property={editModal.property}
        loading={false}
      />

      <RightPanel
        open={rightPanel.type !== null}
        onClose={handleCloseRightPanel}
        title={
          rightPanel.type === 'details' ? 'Property Details' :
          rightPanel.type === 'invoices' ? 'Invoices' :
          rightPanel.type === 'tenants' ? 'Tenants' : ''
        }
        icon={
          rightPanel.type === 'details' ? <Building size={18} color="#8B5CF6" /> :
          rightPanel.type === 'invoices' ? <FileText size={18} color="#8B5CF6" /> :
          rightPanel.type === 'tenants' ? <Users size={18} color="#8B5CF6" /> : null
        }
        width={rightPanel.type === 'details' ? 500 : 600}
      >
        {rightPanel.type === 'details' && rightPanel.property && (
          <PropertyDetailsPanel property={rightPanel.property} />
        )}
        {rightPanel.type === 'invoices' && rightPanel.property && (
          <InvoicesPanel 
            propertyId={rightPanel.property.id} 
            propertyName={rightPanel.property.name}
          />
        )}
        {rightPanel.type === 'tenants' && rightPanel.property && (
          <TenantsPanel 
            propertyId={rightPanel.property.id} 
            propertyName={rightPanel.property.name}
          />
        )}
      </RightPanel>
    </PropertiesLayout>
  );
};

export default PropertiesPage;