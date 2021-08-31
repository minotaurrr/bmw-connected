declare interface AuthOptions {
  region: Region;
  username: string;
  password: string;
  debug?: boolean;
}

declare interface Authentication {
  token: string;
  retrievedAt: string;
  expiresIn: string;
}
