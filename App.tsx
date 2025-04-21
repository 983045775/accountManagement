/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Home from './src/view/Home.tsx';

function App(): React.JSX.Element {
    return (
        <View style={styles.root}>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'#00ff0033'}
            />
            <Home />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#00000011',
    },
});

export default App;
