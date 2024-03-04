import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.StudyBuddy.app',
  appName: 'study-buddy',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
