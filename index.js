/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/contexts/AuthContext';
import {StrictMode} from 'react';

const Root = () => (
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

AppRegistry.registerComponent(appName, () => Root);
