import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('#mainPnl', {
    $nest: {
        '.changePageBtn:hover': {
            backgroundColor: 'black'
        },
        '.removeImg': {
            visibility: 'visible',
            zIndex: 10
        }
    }
});