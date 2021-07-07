import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Button,
	TextInput,
	FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';

import * as orangActions from '../store/orang-actions';
import * as infaqActions from '../store/infaq-actions';

const NewInfaqScreen = props => {
	const [nama, setNama] = useState('');
	const [alamat, setAlamat] = useState('');
	const [jumlah, setJumlah] = useState(0);

	const dispatch = useDispatch();

	const namaHandler = nama_text => {
		setNama(nama_text);
	};

	const alamatHandler = alamat_text => {
		setAlamat(alamat_text);
	};

	const jumlahHandler = jumlah_text => {
		setJumlah(parseInt(jumlah_text));
	};

	const tambahCatatanHandler = () => {
		const infaqId = props.navigation.getParam('infaqId');
		dispatch(orangActions.addOrang(nama, alamat, jumlah, infaqId));

		setNama('');
		setAlamat('');
		setJumlah('');
		props.navigation.goBack();
	};

	return (
		<View style={styles.formContainer}>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Nama</Text>
				<TextInput onChangeText={namaHandler} style={styles.input} />
			</View>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Alamat</Text>
				<TextInput onChangeText={alamatHandler} style={styles.input} />
			</View>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Jumlah</Text>
				<TextInput
					onChangeText={jumlahHandler}
					keyboardType="number-pad"
					style={styles.input}
				/>
			</View>
			<Button onPress={tambahCatatanHandler} title="Submit" />
		</View>
	);
};

NewInfaqScreen.navigationOptions = {
	headerTitle: 'Tambah Orang Infaq',
};

const styles = StyleSheet.create({
	formContainer: {
		padding: 10,
	},
	formGroup: {
		marginVertical: 10,
	},
	label: {
		fontFamily: 'open-sans-bold',
		fontSize: 16,
	},
	input: {
		borderColor: '#333',
		borderBottomWidth: 1,
		fontSize: 15,
	},
});

export default NewInfaqScreen;
