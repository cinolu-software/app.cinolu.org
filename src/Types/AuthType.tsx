import { ChangeEvent } from "react";

export interface Role{
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfilePayload {
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string
}

export interface UpdateProfilePassword {
  old_password: string;
  password: string;
  password_confirm: string;
}

export interface User {
  id: number | undefined;
  email: string;
  first_name: string;
  name: string;
  last_name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string | null;
  google_image: string | null;
  profile: string | null;
  verified_at: string;
  created_at: string;
  updated_at: string;
  roles: Role[];
}

export interface AuthResponse {
  access_token: string;
}

export interface ApiError {
  property: string;
  message: string;
}

export interface AuthError {
  message: ApiError[];
  error: string;
  statusCode: number;
}

export interface LoginSubmitProp {
  email: string;
  password: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string
}

export interface ProfileImageData {
  userId: number;
  image: File;
}

export interface AuthState {

  user : User | null;
  statusAuth : 'idle' | 'loading' | 'succeeded' | 'failed';
  errorAuth: string | null;
  isAuthenticated: boolean;
}

export interface LoginFormType {
  password?: boolean;
  logoClass?: string;
  validation?: boolean;
}

export interface SignupProp {
  logoClass?: string;
}

export interface SignupSubmitProp {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

interface FormValueInterFace {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  age: string;
  passPort: string;
  country: string;
  state: string;
  city: string;
}

export interface RegisterWizardForm {
  getUserData: (event: ChangeEvent<HTMLInputElement>) => void;
  formValue: FormValueInterFace;
}

export interface RegisterWizardButtonProp {
  showFinish: boolean;
  level: number;
  handleBackButton: () => void;
  handleNextButton: () => void;
  formValue: FormValueInterFace;
}

export interface RegisterWizadListProp {
  level: number;
}

export interface CountdownDataProp {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

