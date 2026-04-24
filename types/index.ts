// Type definitions for the schema-driven page builder

export interface PageOptionsType {
  _id: string;
  pageNameEN: string;
  pageNameTR?: string;
  isNavbar: boolean;
  isSubpage: boolean;
  pageStyle?: React.CSSProperties;
  metadata?: PageMetadata;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  robots?: string;
}

export interface ContainerType {
  _id: string;
  componentName: string;
  componentType: string;
  language: string;
  position: number;
  page: string;
  props?: Record<string, any>;
  data?: Record<string, any>;
}

// Alias for convenience
export type Container = ContainerType;

export interface PageData {
  pageOptions: PageOptionsType;
  containers: ContainerType[];
}

export interface ComponentConfig {
  component: React.ComponentType<any>;
  propBuilder: (item: ContainerType, page: string) => any;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
