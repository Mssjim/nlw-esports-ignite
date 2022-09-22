import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from "../screens/Home";
import { Game } from "../screens/Game";
import { Roleta } from '../screens/Roleta';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
        screenOptions={{ headerShown: false }}
    >
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="game"
        component={Game}
      />

      <Screen
        name="roleta"
        component={Roleta}
      />
    </Navigator>
  );
}
