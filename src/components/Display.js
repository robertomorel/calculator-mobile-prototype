import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default props => {

    return (

        <View style={styles.display}>
            <Text
                style={styles.displayValue}
                numberOfLines={1}>{props.value}</Text>
        </View>

    );

};

const styles = StyleSheet.create({

    display: {
        flex: 1, // -- Se adaptar à tela
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)', // -- Preto com transparência
        alignItems: 'flex-end', // -- Alinhado a direita
    },

    displayValue: {
        fontSize: 60,
        color: '#fff',
    },

});