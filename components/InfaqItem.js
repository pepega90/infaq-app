import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Button,
	Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as infaqActions from '../store/infaq-actions';
import * as orangActions from '../store/orang-actions';
import NumberFormat from './NumberFormat';

const InfaqItem = props => {
	const dispatch = useDispatch();
	const hapusCatatanHandler = () => {
		dispatch(infaqActions.hapusInfaq(props.infaqId));
		dispatch(orangActions.deleteOrangInfaq(props.infaqId));
	};

	return (
		<TouchableOpacity
			activeOpacity={0.6}
			onPress={() =>
				props.navigation.navigate('DetailInfaq', {
					idInfaq: props.infaqId,
					bulan: props.bulan,
				})
			}>
			<View style={styles.screen}>
				<View style={styles.card}>
					<View style={styles.infaqItem}>
						<View style={styles.textContainer}>
							<Text style={styles.labelText}>Bulan: </Text>
							<Text
								style={{
									fontFamily: 'open-sans',
									fontSize: 16,
								}}>
								{props.bulan}
							</Text>
						</View>
						<View style={styles.textContainer}>
							<Button
								onPress={hapusCatatanHandler}
								title="Hapus Catatan"
								color="crimson"
							/>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	screen: {
		alignItems: 'center',
	},
	card: {
		elevation: 5,
		borderRadius: 4,
		backgroundColor: 'white',
		alignItems: 'center',
		padding: 10,
		marginVertical: 10,
	},
	infaqItem: {
		width: '90%',
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	textContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	labelText: {
		color: 'cadetblue',
		margin: 5,
		fontSize: 18,
		fontFamily: 'open-sans-bold',
	},
});

export default InfaqItem;
