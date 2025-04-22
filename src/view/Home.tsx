import React, {useRef, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    SectionList,
} from 'react-native';
import {getData} from '../utils/DBUtils';
import {key} from '../view/AddAccountDialog';
import {array} from '../view/AddAccountDialog';
import AddAccountDialog from './AddAccountDialog';
// @ts-ignore
import icon_add from '../assets/icon_add.png';
// @ts-ignore
import icon_game from '../assets/icon_game.png';
// @ts-ignore
import icon_arrow from '../assets/icon_arrow.png';
// @ts-ignore
import icon_bank from '../assets/icon_bank.png';
// @ts-ignore
import icon_other from '../assets/icon_other.png';
// @ts-ignore
import icon_platform from '../assets/icon_platform.png';

function Home() {
    const [showdata, setShowData] = useState([]);

    useEffect(() => {
        getData(key).then(result => {
            let list: any[] =
                typeof result === 'string' ? JSON.parse(result) : [];
            //渲染完,获取数据
            const gameList = list.filter(item => item.type === array[0]);
            const platformList = list.filter(item => item.type === array[1]);
            const bankCardList = list.filter(item => item.type === array[2]);
            const otherList = list.filter(item => item.type === array[3]);

            const resultData: any[] = [
                {title: array[0], data: gameList},
                {title: array[1], data: platformList},
                {title: array[2], data: bankCardList},
                {title: array[3], data: otherList},
            ];
            // @ts-ignore
            setShowData(resultData);
        });
    }, []);

    const AddAccountRef = useRef(null);

    const sectionRender = (info: any) => {
        const {item, index} = info;
        const styles = StyleSheet.create({
            root: {
                marginTop: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
            },
            itemView: {
                flexDirection: 'row',
            },
            title: {
                marginTop:6,
                marginLeft: 10,
                fontSize: 12,
                fontWeight: 'bold',
            },
            txt: {
                marginTop: 10,
                marginBottom: 10,
                color: '#bdbdbd',
                marginLeft: 10,
                fontSize: 12,
                flex: 1,
            },
        });
        return (
            <View style={styles.root}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={styles.itemView}>
                    <Text style={styles.txt}>{item.account}</Text>
                    <Text style={styles.txt}>{item.pwd}</Text>
                </View>
            </View>
        );
    };
    const HeadSectionRender = (info: any) => {
        const {section} = info;
        const styles = StyleSheet.create({
            root: {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                alignItems: 'center',
                marginTop: 20,
                backgroundColor: 'white',
                flexDirection: 'row',
                height: 50,
            },
            img: {
                marginLeft: 10,
                width: 26,
                height: 26,
            },
            txt: {
                fontWeight: 'bold',
                fontSize: 12,
                marginLeft: 12,
            },
            moreTouch: {
                position: 'absolute',
                padding: 10,
                top: 10,
                right: 20,
                width: 18,
                height: 18,
            },
            moreImg: {
                width: 18,
                height: 18,
            },
        });
        return (
            <View style={styles.root}>
                <Image
                    style={styles.img}
                    source={
                        section.title === array[0]
                            ? icon_game
                            : section.title === array[1]
                            ? icon_platform
                            : section.title === array[2]
                            ? icon_bank
                            : section.title === array[3]
                            ? icon_other
                            : null
                    }
                />
                <Text style={styles.txt}>{section.title}</Text>
                <TouchableOpacity style={styles.moreTouch}>
                    <Image source={icon_arrow} style={styles.moreImg} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.root}>
            <Text style={styles.title}>{'账号管理'}</Text>
            <SectionList
                style={styles.sectionListView}
                keyExtractor={(item, index) => `item=${item}+index${index}`}
                sections={showdata}
                renderItem={sectionRender}
                renderSectionHeader={HeadSectionRender}
            />
            <AddAccountDialog ref={AddAccountRef} />
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
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        backgroundColor: '#B8b8b8',
        width: '100%',
        height: '100%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    add: {
        backgroundColor: 'white',
        borderRadius: 40,
        margin: 20,
        bottom: 0,
        right: 0,
        position: 'absolute',
    },
    sectionListView: {
        marginTop: 12,
        width: '95%',
    },
});

export default Home;
