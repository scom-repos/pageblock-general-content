import { Styles } from '@ijstech/components';

const Theme = Styles.Theme.ThemeVars as any;

Styles.cssRule('#mainPnl', {
    $nest: {
        '#editPage *': {
            fontSize: '13px',
            color: '#676a6c'
        },

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

        '.settingTxt': {
            color: 'var(--colors-primary-main)',
            fontSize: '20px',
        },

        '.listDivider': {
            borderTop: '1px dashed #e7eaec',
            height: '1px',
            width: '100%',
            margin: '20px 0',
        },

        '.titleDivider': {
            borderTop: '1px solid #e7eaec',
            height: '1px',
            width: '100%',
            marginBottom: '20px',
        },

        '.caption textarea': {
            width: '100% !important',
            padding: "7px"
        },

        '.shortInput textarea': {
            width: '100% !important',
        },

        'i-input i-combo-box': {
            width: '100% !important'
        },

        '.shortInput input': {
            padding: "7px"
        },

        '.scrollable': {
            minHeight: "500px",
            overflowY: "scroll"
        },

        '#preview': {
            display: 'block',
            overflow: 'auto'
        }

        // '.spaceEvenly': {
        //     justifyContent: "space-evenly"
        // }
    }
});