export const E2EEnvironment = {
  AUTH_USERNAME: 'test@user.com',
  AUTH_PASSWORD: 'S3cur1tY?'
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      E2E_TEST_USERNAME: string;
      E2E_TEST_PASSWORD: string;
    }
  }
}
