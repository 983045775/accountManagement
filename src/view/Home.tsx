import React, {useRef} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

// @ts-ignore
import icon_add from '../assets/icon_add.png';
import AddAccountDialog from './AddAccountDialog';

function Home() {
    const AddAccountRef = useRef(null);
    return (
        <View style={styles.root}>
            <Text style={styles.title}>账号管理</Text>
            <TouchableOpacity
                onPress={() => {
                    if (AddAccountRef.current != null) {
                        // @ts-ignore
                        AddAccountRef.current.showAdd();
                    }
                }}
                style={styles.add}>
                <Image source={icon_add} />
            </TouchableOpacity>
            <AddAccountDialog ref={AddAccountRef} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    add: {
        borderRadius: 10,
        margin: 20,
        bottom: 0,
        right: 0,
        position: 'absolute',
    },
});

export default Home;
