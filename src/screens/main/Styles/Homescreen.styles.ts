import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/style';

export const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: theme.colors.background 
    },
    container: { 
        flex: 1, 
        padding: theme.spacing.l 
    },
    header: { 
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'baseline', 
        marginTop: theme.spacing.xl, 
    },
    greetingText: {
        fontSize: 26, 
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
    },
    nameText: {
        fontSize: 26, 
        fontWeight: '600',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.large,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
        borderLeftWidth: 0,
    },
    statusCardError: {
        borderLeftWidth: 5,
        borderColor: theme.colors.danger,
        backgroundColor: '#FFF5F5',
    },
    statusTextContainer: {
        marginLeft: theme.spacing.l,
        flex: 1,
    },
    statusTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
    }
});