import { useRef, useCallback } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { styles } from './styles';

interface Props {
    name: string,
    size: number,
    color: string,
    onPress: Function
}

export function RoundButton({name, size, color, onPress}: Props) {
    const scale = useRef(new Animated.Value(1)).current;
    const animateScale = useCallback((newValue: number) => {
        Animated.spring(scale, {
            toValue: newValue,
            friction: 4,
            useNativeDriver: true
        }).start();
    }, []);

    return (
            <TouchableWithoutFeedback
                onPressIn={() => animateScale(0.8)}
                delayPressIn={0}
                onPressOut={() => {
                    animateScale(1),
                    onPress()
                }}
                delayPressOut={110}
            >
                <Animated.View style={[styles.container, {transform: [{ scale }]}]}>
                    <FontAwesome name={name} size={size} color={color} />
                </Animated.View>
            </TouchableWithoutFeedback>
    );
}