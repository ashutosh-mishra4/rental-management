import React, { useState } from 'react';
import { Upload, message, Image } from 'antd';
import { Camera, Upload as UploadIcon } from 'lucide-react';
import styled from '@emotion/styled';
import type { UploadProps, UploadFile } from 'antd';
import { ImageUploadState } from '../../types/enums';
import { formatImageUploadError } from '../../utils/formatters';

const { Dragger } = Upload;

const UploadContainer = styled.div`
  margin-bottom: 16px;
`;

const StyledDragger = styled(Dragger)`
  .ant-upload-drag-container {
    padding: 24px;
  }
  
  .ant-upload-drag-icon {
    margin-bottom: 16px;
  }
  
  .ant-upload-text {
    color: #374151;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  .ant-upload-hint {
    color: #6B7280;
    font-size: 14px;
  }
`;

const PreviewContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

const PreviewImage = styled(Image)`
  border-radius: 8px;
  max-width: 200px;
  max-height: 150px;
`;

const UploadIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #8B5CF6;
`;

interface PropertyImageUploadProps {
  value?: string;
  onChange?: (url: string) => void;
  error?: string;
}

const PropertyImageUpload: React.FC<PropertyImageUploadProps> = ({
  value,
  onChange,
  error
}) => {
  const [uploadState, setUploadState] = useState<ImageUploadState>(ImageUploadState.IDLE);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const beforeUpload = (file: File) => {
    const isValidFormat = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp';
    if (!isValidFormat) {
      message.error('Please upload JPG, PNG, or WebP format');
      return false;
    }

    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    
    try {
      setUploadState(ImageUploadState.UPLOADING);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would upload to your server/cloud storage
      // For now, we'll create a local URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadState(ImageUploadState.SUCCESS);
        onChange?.(imageUrl);
        onSuccess?.(imageUrl);
        message.success('Image uploaded successfully');
      };
      reader.readAsDataURL(file as File);
      
    } catch (error) {
      setUploadState(ImageUploadState.ERROR);
      onError?.(error as Error);
      message.error('Upload failed. Please try again');
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList);
    
    if (info.file.status === 'removed') {
      onChange?.('');
      setUploadState(ImageUploadState.IDLE);
    }
  };

  const uploadProps: UploadProps = {
    name: 'image',
    multiple: false,
    maxCount: 1,
    fileList,
    beforeUpload,
    customRequest: handleUpload,
    onChange: handleChange,
    showUploadList: {
      showPreviewIcon: false,
      showRemoveIcon: true,
      showDownloadIcon: false
    }
  };

  return (
    <UploadContainer>
      <StyledDragger {...uploadProps}>
        <UploadIconContainer>
          {value ? (
            <Camera size={32} />
          ) : (
            <UploadIcon size={32} />
          )}
          <div className="ant-upload-text">
            {value ? 'Change Property Image' : 'Upload Property Image'}
          </div>
          <div className="ant-upload-hint">
            Click or drag image to upload. Supports JPG, PNG, WebP (max 5MB)
          </div>
        </UploadIconContainer>
      </StyledDragger>
      
      {value && (
        <PreviewContainer>
          <PreviewImage
            src={value}
            alt="Property preview"
            preview={false}
          />
        </PreviewContainer>
      )}
      
      {error && (
        <div style={{ color: '#EF4444', fontSize: '14px', marginTop: '8px' }}>
          {error}
        </div>
      )}
    </UploadContainer>
  );
};

export default PropertyImageUpload;