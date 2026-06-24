import { StyleSheet } from 'react-native';
import { theme } from '../../../styles/style';

export const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: theme.colors.background 
    },
    container: { 
        padding: theme.spacing.m, 
        paddingBottom: theme.spacing.xl 
    },
    screenTitle: { 
        marginBottom: theme.spacing.m, 
        marginTop: theme.spacing.s 
    },
    sectionTitle: { 
        marginTop: theme.spacing.l, 
        marginBottom: theme.spacing.s, 
        textTransform: 'uppercase', 
        letterSpacing: 0.5,
        fontWeight: 'bold'
    },

    profileCard: { 
        backgroundColor: theme.colors.surface, 
        borderRadius: theme.borderRadius.large, 
        padding: theme.spacing.m, 
        flexDirection: 'row', 
        alignItems: 'center', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.06, 
        shadowRadius: 10, 
        elevation: 4 
    },
    avatarContainer: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        backgroundColor: '#EBF4FF', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: theme.spacing.m, 
        borderWidth: 2, 
        borderColor: '#3182CE' 
    },
    avatarText: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#3182CE' 
    },
    profileInfo: { 
        flex: 1 
    },
    userEmail: { 
        marginTop: 2, 
        marginBottom: 8 
    },
    statusBadge: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#F0FFF4', 
        alignSelf: 'flex-start', 
        paddingHorizontal: 10, 
        paddingVertical: 4, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: '#C6F6D5' 
    },
    statusDot: { 
        width: 8, 
        height: 8, 
        borderRadius: 4, 
        backgroundColor: theme.colors.primary, 
        marginRight: 6 
    },
    statusText: { 
        color: '#2F855A', 
        fontWeight: '600' 
    },
    planStatusText: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: theme.colors.primary
    },
    planButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    planButton: {
        flex: 1,
        padding: 12,
        borderRadius: theme.borderRadius.small,
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1
    },
    planButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary
    },
    planButtonInactive: {
        backgroundColor: 'transparent',
        borderColor: theme.colors.border
    },
    planButtonText: {
        fontWeight: 'bold',
        fontSize: 14
    },
    planTextActive: {
        color: '#FFFFFF'
    },
    planTextInactive: {
        color: theme.colors.textSecondary
    },
    settingDescription: { 
        marginTop: 8 
    },
    currentDeviceContainer: { 
        backgroundColor: '#EBF4FF', 
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 12, 
        borderWidth: 1, 
        borderColor: '#BEE3F8' 
    },
    currentDeviceLabel: { 
        color: '#2B6CB0', 
        fontWeight: '600', 
        marginBottom: 4 
    },
    currentDeviceText: { 
        color: '#2C5282', 
        fontWeight: 'bold', 
        letterSpacing: 1 
    },
    inputRow: { 
        flexDirection: 'row', 
        marginTop: 15, 
        alignItems: 'center' 
    },
    input: { 
        flex: 1, 
        height: 50, 
        backgroundColor: theme.colors.background, 
        borderRadius: theme.borderRadius.small, 
        paddingHorizontal: 15, 
        fontSize: 16, 
        color: theme.colors.textPrimary, 
        marginRight: 10, 
        borderWidth: 1, 
        borderColor: theme.colors.border 
    },
    bindButton: {
        paddingHorizontal: theme.spacing.m
    },
    logoutButton: { 
        marginTop: 40 
    }
});