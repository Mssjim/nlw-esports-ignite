import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('screen');

export const THEME = {
    COLORS: {
        BACKGROUND_900: '#121214',
        BACKGROUND_800: '#18181B',
        BACKGROUND: '#fff',

        TEXT: '#FFFFFF',

        CAPTION_500: '#71717A',
        CAPTION_400: '#A1A1AA',
        CAPTION_300: '#D4D4D8',

        SHAPE: '#2A2634',

        PRIMARY: '#8B5CF6',
        SECONDARY: '#0066EE',
        SUCCESS: '#34D399',
        DANGER: '#FF4141',
        ALERT: '#F87171',

        FOOTER: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)'],
        OVERLAY: 'rgba(0,0,0,0.6)',
    },

    FONT_FAMILY: {
        REGULAR: 'Inter_400Regular',
        SEMI_BOLD: 'Inter_600SemiBold',
        BOLD: 'Inter_700Bold',
        BLACK: 'Inter_900Black'
    },

    FONT_SIZE: {
        SM: 14,
        MD: 16,
        LG: 24
    },

    CARD: {
        WIDTH: width * 0.9,
        HEIGHT: height * 0.78,
        BORDER_RADIUS: 20,
        OUT_OF_SCREEN: width * 1.5
    }
};