import { useRoute } from '@react-navigation/native';
import { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, Animated, PanResponder } from 'react-native';
import { GameParams } from '../../@types/navigation';
import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { THEME } from '../../theme';

import { styles } from './styles';

export function Roleta() {
    const router = useRoute();
    const params = router.params as GameParams[];

    const [cards, setCards] = useState(params);

    const swipe = useRef(new Animated.ValueXY()).current;

    const tiltSign = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if(!cards.length) setCards(params);
    }, [cards.length]);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx: x, dy: y, y0}) => {
            swipe.setValue({ x, y:0 }),
            tiltSign.setValue(y0 > THEME.CARD.HEIGHT / 2 ? 1 : -1)
        },
        onPanResponderRelease:  (_, {dx, dy}) => {
            const direction = Math.sign(dx);
            const isActionActive = Math.abs(dx) > 100;

            if(isActionActive) {
                Animated.timing(swipe, {
                    duration: 500,
                    toValue: {
                        x: direction * THEME.CARD.OUT_OF_SCREEN,
                        y: dy
                    },
                    useNativeDriver: true
                }).start(removeTopCard);
            } else {
                Animated.spring(swipe, {
                    toValue: {
                        x: 0, y: 0
                    },
                    useNativeDriver: true,
                    friction: 5
                }).start();
            }
        },
    });
    
    const removeTopCard = useCallback(() => {
        setCards((prevState) => prevState.slice(1));
        swipe.setValue({x: 0, y: 0});
    }, [swipe]);

    const handleChoice = useCallback((direction: number) => { // TODO navigate Chat
        Animated.timing(swipe.x, {
            toValue: direction * THEME.CARD.OUT_OF_SCREEN,
            duration: 500,
            useNativeDriver: true,
        }).start(removeTopCard)
    }, [removeTopCard, swipe.x]);

    return (
        <View style={styles.container}>
            {cards?.map(({id, title, bannerUrl}, index) => {
                const isFirst = index == 0;

                const dragHandlers = isFirst ? panResponder.panHandlers : {};


                return <Card key={id} name={title} source={bannerUrl} isFirst={isFirst} swipe={swipe} tiltSign={tiltSign} {...dragHandlers}/>
            }).reverse()}

            <Footer handleChoice={handleChoice} />
        </View>
    );
}
