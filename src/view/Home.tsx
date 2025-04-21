import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function Home() {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>账号管理</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: 30,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default Home;
