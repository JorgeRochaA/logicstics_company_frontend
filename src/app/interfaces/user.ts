export interface UserResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}
