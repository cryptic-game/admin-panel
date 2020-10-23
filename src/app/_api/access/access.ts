export interface AdminUser {
  id: number;
  groups: string[];
  name?: string;
  avatar_url?: string;
}

export interface AdminGroup {
  id: string;
  display_name: string;
}
