import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeComponent from './components/HomeComponent';
import MainComponent from './components/MainComponent';
import GalleryComponent from './components/GalleryComponent';

const App = createStackNavigator(
	{
		GalleryComponent: {
			screen: GalleryComponent,
			navigationOptions: {
				header: null
			}
		},
		HomeComponent: {
			screen: HomeComponent,
			navigationOptions: {
				header: null
			}
		},
		MainComponent: {
			screen: MainComponent,
			navigationOptions: {
				header: null
			}
		}
	},
	{
		headerMode: "float",
		mode: "card",
		initialRouteName: "HomeComponent"
	}
);

export default createAppContainer(App);
