import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput } from 'react-native';

const InfaqInput = props => {
	const [bulan, setBulan] = useState('');

	const onChangeBulanHandler = text => {
		setBulan(text);
	};

	const addBulanHandler = () => {
		props.onAddBulan(bulan);
		setBulan('');
		props.onCancelModal();
	};

	return (
		<Modal visible={props.visible} animationType="slide">
			<View style={styles.screen}>
				<View style={styles.inputContainer}>
					<Text style={styles.textInput}>Masukkan Nama Bulan</Text>
					<TextInput
						onChangeText={onChangeBulanHandler}
						style={styles.input}
					/>
				</View>
				<View style={styles.btnContainer}>
					<Button
						title="Tambah"
						onPress={addBulanHandler}
						color="steelblue"
					/>
					<Button
						onPress={props.onCancelModal}
						title="Cancel"
						color="coral"
					/>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	screen: {
		marginTop: 20,
	},
	inputContainer: {
		marginVertical: 20,
		padding: 10,
	},
	textInput: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		marginTop: 10,
	},
	input: {
		borderColor: '#333',
		borderBottomWidth: 1,
		fontSize: 16,
		marginTop: 10,
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default InfaqInput;
