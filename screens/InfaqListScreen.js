import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as infaqActions from '../store/infaq-actions';
import InfaqItem from '../components/InfaqItem';
import InfaqInput from '../components/InfaqInput';

const InfaqListScreen = ({ navigation }) => {
	const [showModal, setShowModal] = useState(false);
	const infaqs = useSelector(state => state.infaq.infaq);
	const total = useSelector(state => state.infaq.total);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(infaqActions.loadInfaq());
	}, [dispatch]);

	const showModalHandler = () => {
		setShowModal(true);
	};

	const cancelModalHandler = () => {
		setShowModal(false);
	};

	const addBulanHandler = text => {
		const initialTotal = 0;
		dispatch(infaqActions.addInfaq(text, initialTotal));
	};

	return (
		<View style={styles.screen}>
			<View style={styles.btnTambah}>
				<Button onPress={showModalHandler} title="Tambah Catatan" />
			</View>
			<InfaqInput
				visible={showModal}
				onCancelModal={cancelModalHandler}
				onAddBulan={addBulanHandler}
			/>
			<FlatList
				data={infaqs}
				renderItem={itemData => {
					return (
						<InfaqItem
							navigation={navigation}
							infaqId={itemData.item.id}
							bulan={itemData.item.bulan}
						/>
					);
				}}
				keyExtractor={item => item.id}
			/>
		</View>
	);
};

InfaqListScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Catatan Infaq',
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnTambah: {
		marginVertical: 15,
	},
});

export default InfaqListScreen;
