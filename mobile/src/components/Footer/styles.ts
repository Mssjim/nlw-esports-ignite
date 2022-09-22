import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 15,
        width: 170,
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: -1
    }
});