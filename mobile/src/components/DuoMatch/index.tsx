import { useState } from "react";
import { Modal, ModalProps, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';
import { THEME } from "../../theme";

interface Props extends ModalProps {
    discord: string;
    onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
    const [isCoping, setIsCoping] = useState(false);

    async function handleCopyDiscordToClipboard() {
        setIsCoping(true);
        Alert.alert('Discord Copiado!', 'Usuário copiado para você colocar no Discord.');
        setIsCoping(false);
    }

    return (
        <Modal
            animationType="fade"
            transparent
            statusBarTranslucent
            {...rest}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <TouchableOpacity
                        style={styles.closeIcon}
                        onPress={onClose}
                    >
                        <MaterialIcons
                        name="close"
                        size={20}
                        color={THEME.COLORS.CAPTION_500}
                        />
                    </TouchableOpacity>


                    <View
                        style={{backgroundColor: '#060', height: 64, width: 64}}
                    />

                    <Text style={styles.label}>
                        Adicione no Discord
                    </Text>

                    <TouchableOpacity
                        style={styles.discordButton}
                        onPress={handleCopyDiscordToClipboard}
                        disabled={isCoping}
                    >
                        <Text style={styles.discord}>
                            {isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
