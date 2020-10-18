export interface User {
  user_id: number;
  groups: string[];
}

export interface OAuthAuthenticateResponse {
  access_token: string;
  refresh_token: string;
}
