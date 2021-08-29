declare interface AuthOptions {
  region: Region;
  username: string;
  password: string;
}

declare interface Authentication {
  token: string;
  retrievedAt: string;
  expiresIn: string;
}