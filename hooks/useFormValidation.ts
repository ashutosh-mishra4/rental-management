import { useState, useCallback } from 'react';
import type { PropertyFormData, FormValidationErrors } from '../types/schema';
import { formatUnitValidation } from '../utils/formatters';

export const useFormValidation = () => {
  const [errors, setErrors] = useState<FormValidationErrors>({});

  const validateField = useCallback((field: keyof PropertyFormData, value: any, formData?: PropertyFormData): string => {
    switch (field) {
      case 'name':
        return !value || value.trim() === '' ? 'Property name is required' : '';
      
      case 'address':
        return !value || value.trim() === '' ? 'Address is required' : '';
      
      case 'city':
        return !value || value === '' ? 'City is required' : '';
      
      case 'units':
        if (formData?.units) {
          return formatUnitValidation(formData.units.total, formData.units.occupied);
        }
        return '';
      
      case 'monthlyRevenue':
        return value < 0 ? 'Monthly revenue must be a positive number' : '';
      
      case 'managerId':
        return !value ? 'Please select a property manager' : '';
      
      case 'ownerId':
        return !value ? 'Please select a property owner' : '';
      
      default:
        return '';
    }
  }, []);

  const validateForm = useCallback((formData: PropertyFormData): FormValidationErrors => {
    const newErrors: FormValidationErrors = {};

    // Validate required fields
    const nameError = validateField('name', formData.name);
    if (nameError) newErrors.name = nameError;

    const addressError = validateField('address', formData.address);
    if (addressError) newErrors.address = addressError;

    const cityError = validateField('city', formData.city);
    if (cityError) newErrors.city = cityError;

    const unitsError = validateField('units', formData.units, formData);
    if (unitsError) {
      if (unitsError.includes('total')) {
        newErrors.totalUnits = unitsError;
      } else if (unitsError.includes('occupied')) {
        newErrors.occupiedUnits = unitsError;
      }
    }

    const revenueError = validateField('monthlyRevenue', formData.monthlyRevenue);
    if (revenueError) newErrors.monthlyRevenue = revenueError;

    const managerError = validateField('managerId', formData.managerId);
    if (managerError) newErrors.managerId = managerError;

    const ownerError = validateField('ownerId', formData.ownerId);
    if (ownerError) newErrors.ownerId = ownerError;

    return newErrors;
  }, [validateField]);

  const isFormValid = useCallback((formData: PropertyFormData): boolean => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  }, [validateForm]);

  const updateFieldError = useCallback((field: keyof FormValidationErrors, error: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: error || undefined
    }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    isFormValid,
    updateFieldError,
    clearErrors,
    setErrors
  };
};

export default useFormValidation;