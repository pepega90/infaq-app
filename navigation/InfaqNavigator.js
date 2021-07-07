import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

// Screens
import InfaqListScreen from '../screens/InfaqListScreen';
import NewInfaqScreen from '../screens/NewInfaqScreen';
import DetailInfaqScreen from '../screens/DetailInfaqScreen';

// Other
import Colors from '../constant/Colors';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Colors.primary,
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerTintColor: '#fff',
};

const InfaqNavigator = createStackNavigator(
	{
		Infaq: InfaqListScreen,
		NewInfaq: NewInfaqScreen,
		DetailInfaq: DetailInfaqScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

export default createAppContainer(InfaqNavigator);
