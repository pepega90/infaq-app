import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Button,
	ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Orang from '../models/orang';
import Colors from '../constant/Colors';
import NumberFormat from '../components/NumberFormat';
import * as orangActions from '../store/orang-actions';
import * as infaqActions from '../store/infaq-actions';

const DetailInfaqScreen = props => {
	const infaqId = props.navigation.getParam('idInfaq');
	const dispatch = useDispatch();
	const infaq = useSelector(state =>
		state.infaq.infaq.find(e => e.id == infaqId)
	);
	const orangs = useSelector(state => state.orang.orang);

	const arr_total = [];
	for (let key in orangs) {
		arr_total.push(orangs[key].jumlah);
	}

	// Get total jumlah infaq
	let total = arr_total.reduce((a, b) => a + b, 0);

	useEffect(() => {
		dispatch(orangActions.loadOrang(infaqId));
	}, [dispatch, infaqId]);

	const hapusOrangHandler = id => {
		dispatch(orangActions.hapus(id));
	};

	return (
		<ScrollView>
			<View style={styles.screen}>
				<View style={styles.detailContainer}>
					<Text style={styles.detailText}>Bulan: {infaq.bulan}</Text>
					<Text style={styles.detailText}>
						Total: <NumberFormat value={total} />
					</Text>
				</View>
				<View style={styles.btnContainer}>
					<Button
						style={styles.btnTambah}
						onPress={() =>
							props.navigation.navigate('NewInfaq', {
								infaqId: infaq.id,
							})
						}
						title="Tambah"
					/>
				</View>
				<View style={styles.detailTabel}>
					<View style={styles.tabelContainer}>
						<Text style={styles.tabelHeading}>No</Text>
						<Text style={styles.tabelHeading}>Nama</Text>
						<Text style={styles.tabelHeading}>Alamat</Text>
						<Text style={styles.tabelHeading}>Jumlah</Text>
						<Text style={styles.tabelHeading}>Action</Text>
					</View>
					<View style={styles.infaqTabel}>
						{orangs.length === 0 ? (
							<Text
								style={{
									textAlign: 'center',
									marginTop: 20,
								}}>
								Belum ada data infaq yang di masukkan!
							</Text>
						) : (
							orangs.map((e, i) => {
								return (
									<View style={styles.tabel} key={i}>
										<Text style={styles.textData}>
											{i + 1}
										</Text>
										<Text style={styles.textData}>
											{e.nama}
										</Text>
										<Text style={styles.textData}>
											{e.alamat}
										</Text>
										<NumberFormat value={e.jumlah} />
										<Button
											onPress={hapusOrangHandler.bind(
												this,
												e.id
											)}
											title="Hapus"
											color="crimson"
										/>
									</View>
								);
							})
						)}
					</View>
				</View>
			</View>
		</ScrollView>
	);
};

DetailInfaqScreen.navigationOptions = navData => {
	const bulan = navData.navigation.getParam('bulan');
	return {
		headerTitle: `Catatan Bulan ${bulan}`,
	};
};

const styles = StyleSheet.create({
	detailContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginVertical: 15,
	},
	detailText: {
		fontFamily: 'open-sans-bold',
		fontSize: 17,
	},
	detailTabel: {
		marginVertical: 15,
		alignItems: 'center',
	},
	tabelHeading: {
		fontFamily: 'open-sans-bold',
		fontSize: 15,
	},
	tabelContainer: {
		borderWidth: 1,
		borderBottomWidth: 0,
		width: '95%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	infaqTabel: {
		borderWidth: 1,
		borderTopWidth: 0,
		borderBottomWidth: 0,
		width: '95%',
	},
	tabel: {
		borderWidth: 1,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		marginVertical: 5,
		padding: 5,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	textData: {
		fontFamily: 'open-sans',
	},
	btnContainer: {
		alignItems: 'center',
		width: '100%',
		marginBottom: 10,
	},
});

export default DetailInfaqScreen;
