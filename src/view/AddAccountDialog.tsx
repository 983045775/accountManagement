import React, {useImperativeHandle, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
// @ts-ignore
import icon_close from '../assets/icon_close_modal.png';

const addAccount = React.forwardRef(function AddAccountDialog(props, ref) {
    const [display, setDisplay] = useState(false);

    const show = () => {
        setDisplay(true);
    };
    const hide = () => {
        setDisplay(false);
    };
    useImperativeHandle(ref, () => {
        return {
            showAdd: show,
            hideAdd: hide,
        };
    });
    return (
        <Modal
            visible={display}
            animationType={'fade'}
            transparent={true}
            statusBarTranslucent={true}
            onRequestClose={() => {
                hide();
            }}>
            <View style={[styles.root, StyleSheet.absoluteFill]}>
                <View style={styles.viewRoot}>
                    <Text style={styles.title}>{'添加账号'}</Text>
                    <TouchableOpacity
                        style={styles.close}
                        activeOpacity={0.7}
                        onPress={hide}>
                        <Image style={styles.closeImg} source={icon_close} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000033',
    },
    viewRoot: {
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '80%',
        height: '10%',
    },
    title: {
        marginTop: 10,
        fontSize: 14,
    },
    close: {
        marginRight: 10,
        marginTop: 5,
        width: 30,
        height: 30,
        right: 0,
        position: 'absolute',
    },
    closeImg: {
        tintColor: '#00000033',
        width: 30,
        height: 30,
    },
});

export default addAccount;
