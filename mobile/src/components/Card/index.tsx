import { LinearGradient } from 'expo-linear-gradient';
import { useCallback } from 'react';
import { View, Image, Text, Animated, PanResponder } from 'react-native';
import { Choice } from '../Choice';

import { styles } from './styles';

interface Props {
    name: string,
    source: string,
    isFirst: boolean,
    swipe: Animated.ValueXY,
    tiltSign: any
}

export function Card({name, source, isFirst, swipe, tiltSign, ...rest}: Props) {
    const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ["8deg", "0deg", "-8deg"]
    });

    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0, 1],
        extrapolate: "clamp"
    });

    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1, 0],
        extrapolate: "clamp"
    });

    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }
    const renderChoice = useCallback(() => {
        return(
            <>
                <Animated.View style={[styles.choiceContainer, styles.likeContainer, {opacity: likeOpacity}]}>
                    <Choice chat={true} text={"Chat"} />
                </Animated.View>
                <Animated.View style={[styles.choiceContainer, styles.nopeContainer, {opacity: nopeOpacity}]}>
                    <Choice chat={false} text={"Nope"} />
                </Animated.View>
            </>
        )
    }, [likeOpacity, nopeOpacity]);

    return (
        <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
            <Image source={{uri: source}} style={styles.image}/>
            <LinearGradient colors={['transparent', '#000D']} style={styles.gradient}/>
            <Text style={styles.name}>
                {name}
            </Text>

            {
                isFirst && renderChoice()
            }
        </Animated.View>
    );
}