import type { ThemeConfig } from 'antd';

const config: ThemeConfig = {
  token: {
    // Primary brand colors - lavender/purple theme
    colorPrimary: '#8B5CF6', // Purple-500
    colorPrimaryBg: '#F3F4F6', // Light gray background
    colorPrimaryBorder: '#E5E7EB',
    colorPrimaryHover: '#7C3AED', // Purple-600
    colorPrimaryActive: '#6D28D9', // Purple-700
    
    // Background colors
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#FFFFFF', 
    colorBgElevated: '#FFFFFF',
    colorBgLayout: '#F9FAFB', // Very light gray
    
    // Text colors
    colorTextBase: '#111827', // Gray-900
    colorText: '#374151', // Gray-700
    colorTextSecondary: '#6B7280', // Gray-500
    colorTextTertiary: '#9CA3AF', // Gray-400
    
    // Border and layout
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    colorBorder: '#E5E7EB', // Gray-200
    colorBorderSecondary: '#F3F4F6', // Gray-100
    
    // Success colors (green)
    colorSuccess: '#10B981', // Emerald-500
    colorSuccessBg: '#D1FAE5', // Emerald-100
    colorSuccessText: '#047857', // Emerald-700
    
    // Error colors (red)
    colorError: '#EF4444', // Red-500
    colorErrorBg: '#FEE2E2', // Red-100
    colorErrorText: '#DC2626', // Red-600
    
    // Warning colors (amber)
    colorWarning: '#F59E0B', // Amber-500
    colorWarningBg: '#FEF3C7', // Amber-100
    colorWarningText: '#D97706', // Amber-600
    
    // Typography
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontSize: 14,
    fontSizeLG: 16,
    fontSizeXL: 20,
    fontSizeHeading1: 32,
    fontSizeHeading2: 24,
    fontSizeHeading3: 20,
    fontSizeHeading4: 16,
    fontSizeHeading5: 14,
    
    // Shadows
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    
    // Spacing
    sizeStep: 4,
    sizeUnit: 4,
    sizeSM: 16,
    size: 24,
    sizeLG: 32,
    sizeXL: 48,
    
    // Control heights
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 32
  },
  components: {
    Layout: {
      siderBg: '#FFFFFF',
      headerBg: '#FFFFFF',
      bodyBg: '#F9FAFB',
      headerHeight: 72,
      headerPadding: '0 24px'
    },
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: '#F3F4F6',
      itemSelectedColor: '#8B5CF6',
      itemHoverBg: '#F9FAFB',
      itemHoverColor: '#6B7280',
      iconSize: 20,
      itemHeight: 48,
      itemMarginInline: 8,
      itemBorderRadius: 8
    },
    Card: {
      borderRadius: 12,
      paddingLG: 24,
      headerBg: 'transparent'
    },
    Table: {
      borderRadius: 12,
      headerBg: '#F9FAFB',
      headerColor: '#374151',
      cellPaddingBlock: 16,
      cellPaddingInline: 16
    },
    Tag: {
      borderRadius: 20,
      fontSizeSM: 12
    },
    Button: {
      borderRadius: 8,
      fontWeight: 500
    },
    Avatar: {
      borderRadius: 8
    }
  }
};

export default config;