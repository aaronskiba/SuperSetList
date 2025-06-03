/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {AuthProvider} from './src/contexts/AuthContext';

const Root = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

AppRegistry.registerComponent(appName, () => Root);
