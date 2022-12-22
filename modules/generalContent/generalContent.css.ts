import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('#mainPnl', {
    $nest: {
        '.textCenter': {
            textAlign: 'center',
            overflowWrap: 'break-word'
        },

        '.textLeft': {
            textAlign: 'left',
            overflowWrap: 'break-word'
        },

        '.textRight': {
            textAlign: 'right',
            overflowWrap: 'break-word'
        },

        '.textJustify': {
            textAlign: 'justify',
            overflowWrap: 'break-word'
        },

        'textarea': {
            borderRadius: '10px'
        },

        'input': {
            textAlign: 'center'
        },

        '.settingTxt': {
            color: 'var(--colors-primary-main)',
            fontSize: '20px',
        }
    }
});