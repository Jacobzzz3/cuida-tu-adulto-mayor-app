import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/style';

export const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: theme.colors.background 
    },
    container: { 
        flex: 1, 
        padding: theme.spacing.m 
    },
    centerContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: theme.colors.background 
    },
    muroContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background
    },
    candadoIcon: {
        fontSize: 60,
        marginBottom: theme.spacing.m,
        color: theme.colors.textSecondary,
        fontWeight: 'bold'
    },
    muroTitle: {
        marginBottom: theme.spacing.s,
        color: theme.colors.textPrimary
    },
    muroText: {
        marginBottom: theme.spacing.l,
        lineHeight: 24
    },
    muroSubText: {
        color: theme.colors.primary,
        fontWeight: 'bold'
    },
    loadingText: { 
        marginTop: theme.spacing.s 
    },
    headerTitle: { 
        marginBottom: theme.spacing.m 
    },
    eventCard: { 
        backgroundColor: theme.colors.surface, 
        borderRadius: theme.borderRadius.small, 
        padding: theme.spacing.m, 
        marginBottom: 12, 
        elevation: 2, 
        borderLeftWidth: 5, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    eventDate: { 
        marginTop: 4 
    },
    gForce: { 
        fontWeight: 'bold', 
        color: theme.colors.textPrimary 
    },
    emptyText: { 
        marginTop: 50, 
        color: theme.colors.textSecondary 
    },
    fallBorder: { 
        borderColor: theme.colors.danger 
    },
    normalBorder: { 
        borderColor: theme.colors.primary 
    },
    flatlistContent: {
        paddingTop: 10, 
        paddingBottom: 20 
    }
});