import React from 'react';
import { View } from 'react-native';
import { THEME } from '../../theme';
import { RoundButton } from '../RoundButton';

import { styles } from './styles';

export function Footer({handleChoice}: any) {
    return (
        <View style={styles.container}>
            <RoundButton name="times" size={40} color={THEME.COLORS.DANGER} onPress={() => handleChoice(-1)}/>
            <RoundButton name="heart" size={34} color={THEME.COLORS.SUCCESS} onPress={() => handleChoice(1)}/>
        </View>
    );
}