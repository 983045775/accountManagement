import React, {useImperativeHandle, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
// @ts-ignore
import icon_close from '../assets/icon_close_modal.png';
import {getUUID} from '../utils/UUIDUtils';
import {saveData, getData} from '../utils/DBUtils';

export const key = 'accountData';
export const array: string[] = ['游戏', '平台', '银行卡', '其他'];

const addAccount = React.forwardRef(function AddAccountDialog(props, ref) {
    // @ts-ignore
    const {refreshData} = props;
    const [display, setDisplay] = useState(false);
    const [id, setId] = useState<string>('');
    const [select, setselect] = useState(0);
    const [designationState, setDesignation] = useState('');
    const [accountState, setAccount] = useState('');
    const [passwordState, setPassword] = useState('');
    const saveSubmit = () => {
        const data = {
            id: id,
            type: array[select],
            name: designationState,
            account: accountState,
            pwd: passwordState,
        };
        getData(key)
            .then(value => {
                let array: any[] =
                    typeof value === 'string' ? JSON.parse(value) : [];
                array.push(data);
                saveData(key, JSON.stringify(array))
                    .then(() => {
                        getData(key).then(data => {
                            console.log(data);
                        });
                        setDisplay(false);
                        Alert.alert('保存成功');
                        refreshData();
                    })
                    .catch(() => {
                        Alert.alert('保存失败');
                    });
            })
            .catch(e => {
                console.error(e);
            });
    };

    const show = () => {
        setId(getUUID());
        setDisplay(true);
        //清空
        setselect(0);
        setDesignation('');
        setAccount('');
        setPassword('');
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

    const renderTitle = () => {
        const styles = StyleSheet.create({
            close: {
                marginRight: 10,
                marginTop: 5,
                width: 30,
                height: 30,
                right: 0,
                position: 'absolute',
            },
            title: {
                marginTop: 10,
                fontSize: 14,
            },
            closeImg: {
                tintColor: '#00000033',
                width: 30,
                height: 30,
            },
            root: {
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
            },
        });
        return (
            <View style={styles.root}>
                <Text style={styles.title}>{'添加账号'}</Text>
                <TouchableOpacity
                    style={styles.close}
                    activeOpacity={0.7}
                    onPress={hide}>
                    <Image style={styles.closeImg} source={icon_close} />
                </TouchableOpacity>
            </View>
        );
    };
    const renderChoose = () => {
        const getButton = () => {
            return array.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={`item=${item}`}
                        style={[
                            styles.touch,
                            index === 0
                                ? styles.leftRadius
                                : index === 3
                                ? styles.rightRadius
                                : '',
                            {
                                marginLeft: index === 0 ? 0 : -1,
                                backgroundColor:
                                    select === index ? '#3599f7' : '#ffffff',
                            },
                        ]}
                        onPress={() => {
                            setselect(index);
                        }}>
                        <Text
                            style={[
                                styles.txt,
                                {
                                    color:
                                        select === index
                                            ? '#ffffff'
                                            : '#000000',
                                },
                            ]}
                            key={`item=${item}`}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                );
            });
        };

        const styles = StyleSheet.create({
            root: {
                marginTop: 10,
                marginRight: 10,
                marginLeft: 10,
                flexDirection: 'row',
                height: 40,
            },
            touch: {
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#EDEDED',
                flex: 1,
                height: 40,
            },
            txt: {
                fontSize: 10,
            },
            leftRadius: {
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
            },
            rightRadius: {
                borderBottomRightRadius: 6,
                borderTopRightRadius: 6,
            },
        });

        return <View style={styles.root}>{getButton()}</View>;
    };
    const txtInput = (index: number) => {
        const styles = StyleSheet.create({
            root: {},
            txtInput: {
                borderRadius: 6,
                marginRight: 10,
                marginTop: 8,
                height: 40,
                marginLeft: 10,
                backgroundColor: '#ededed',
                fontSize: 10,
            },
        });

        return (
            <View style={styles.root}>
                <TextInput
                    style={styles.txtInput}
                    value={
                        index === 1
                            ? designationState
                            : index === 2
                            ? accountState
                            : index === 3
                            ? passwordState
                            : ''
                    }
                    onChangeText={(text: string) => {
                        switch (index) {
                            case 1:
                                setDesignation(text);
                                break;
                            case 2:
                                setAccount(text);
                                break;
                            case 3:
                                setPassword(text);
                                break;
                        }

                        console.log(designationState);
                    }}
                />
            </View>
        );
    };
    const saveButton = () => {
        const styles = StyleSheet.create({
            root: {
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                marginTop: 16,
                backgroundColor: '#3599f7',
                borderRadius: 6,
                marginLeft: 10,
                marginRight: 10,
                height: 40,
            },
            txt: {
                color: '#ffffff',
                fontSize: 14,
            },
        });

        return (
            <TouchableOpacity
                style={styles.root}
                activeOpacity={0.7}
                onPress={saveSubmit}>
                <Text style={styles.txt}>{'保存'}</Text>
            </TouchableOpacity>
        );
    };
    return (
        <Modal
            visible={display}
            animationType={'fade'}
            transparent={true}
            statusBarTranslucent={true}
            onRequestClose={hide}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'android' ? 'height' : 'padding'}
                style={[styles.root, StyleSheet.absoluteFill]}>
                <View style={styles.viewRoot}>
                    {renderTitle()}
                    <Text style={styles.txt}>{'账号类型'}</Text>
                    {renderChoose()}
                    <Text style={styles.txt}>{'账号名称'}</Text>
                    {txtInput(1)}
                    <Text style={styles.txt}>{'账号'}</Text>
                    {txtInput(2)}
                    <Text style={styles.txt}>{'密码'}</Text>
                    {txtInput(3)}
                    {saveButton()}
                </View>
            </KeyboardAvoidingView>
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
        flexDirection: 'column',
        borderRadius: 20,
        backgroundColor: '#ffffff',
        width: '80%',
    },
    txt: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 10,
    },
});

export default addAccount;
