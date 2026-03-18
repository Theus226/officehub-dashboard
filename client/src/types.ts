export interface App {
  id: string;
  name: string;
  url: string;
  favicon: string;
  category?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppRequest {
  url: string;
  name?: string;
  category?: string;
  color?: string;
}

export interface UpdateAppRequest {
  name?: string;
  url?: string;
  category?: string;
  color?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
