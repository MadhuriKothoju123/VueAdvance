// src/utils/validation.js

import { ref } from 'vue';

export const emailError = ref('');
export const passwordError = ref('');
export const phoneError = ref('');
export const stateError = ref('');
export const cityError = ref('');
export const streetError = ref('');

export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailError.value = emailPattern.test(email) ? '' : 'Invalid email format';
};

export const validatePassword = (password: string) => {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  passwordError.value = passwordPattern.test(password)
    ? ''
    : 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
};
export const validatePhone = (phone: string) => {
  const phonePattern = /^[0-9]{10}$/;
  phoneError.value = phonePattern.test(phone) ? '' : 'Invalid phone number format';
};

export const validateState = (state: string) => {
  stateError.value = state ? '' : 'Please select a state';
};

export const validateCity = (city: string) => {
  cityError.value = city ? '' : 'Please select a city';
};

export const validateStreet = (street: string) => {
  streetError.value = street ? '' : 'Street address is required';
};
