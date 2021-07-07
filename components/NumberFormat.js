import React from 'react';
import { Text, StyleSheet } from 'react-native';

import NumberFormat from 'react-number-format';

const ReactNumberFormat = props => {
	return (
		<NumberFormat
			value={props.value}
			displayType={'text'}
			thousandSeparator={true}
			prefix={'Rp'}
			renderText={formattedValue => (
				<Text style={{ ...props.style, ...styles.text }}>
					{formattedValue}
				</Text>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	text: {
		fontFamily: 'open-sans',
	},
});

export default ReactNumberFormat;
