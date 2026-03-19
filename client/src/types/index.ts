export interface App {
  id: string;
  name: string;
  url: string;
  favicon: string;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateAppInput = {
  name: string;
  url: string;
  category?: string;
};

export type UpdateAppInput = Partial<Omit<App, "id" | "createdAt">>;
