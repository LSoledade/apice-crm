export interface GeneralSettings {
  companyName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  defaultLanguage: string;
  timeZone: string;
  dateFormat: string;
  emailNotifications: boolean;
}

export interface UserRole {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  active: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export interface Domain {
  id: string;
  name: string;
  url: string;
  verified: boolean;
  primary: boolean;
  createdAt: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: string;
  description: string;
  enabled: boolean;
  apiKey?: string;
  webhookUrl?: string;
  lastSync?: Date;
  createdAt: Date;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  actions: string[];
}
