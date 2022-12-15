import { Module, customElements, Styles, Container, customModule, application, Input, RadioGroup } from '@ijstech/components';
import { PageBlock } from "./pageBlock.interface";
import './generalContent.css';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["i-section-general-content"]: GeneralContent;
        }
    }
}

const alignItems = [
    {
        caption: "Left",
        value: "left",
        checked: true,
    },
    {
        caption: "Center",
        value: "center",
        checked: false,
    },
    {
        caption: "Right",
        value: "right",
        checked: false,
    },
];

const autoItems = [
    {
        caption: "Fullwidth",
        value: "fullwidth",
        checked: false,
    },
    {
        caption: "Auto Width",
        value: "auto-width",
        checked: false,
    },
    {
        caption: "Auto Height",
        value: "auto-height",
        checked: false,
    },
];

@customModule
@customElements("i-section-general-content")
export default class GeneralContent extends Module implements PageBlock {
    private data: any;
    private widthElm: Input;
    private heightElm: Input;
    private alignElm: RadioGroup;
    private autoElm: RadioGroup;

    tag: any = {};
    defaultEdit: boolean = true;
    readonly onConfirm: () => Promise<void>;
    readonly onDiscard: () => Promise<void>;
    readonly onEdit: () => Promise<void>;

    async init() {
        super.init();
    }

    async getData() {
        return this.data;
    }

    async setData(value: any) {

    }

    getTag() {
        return this.tag;
    }

    async setTag(value: any) {
        this.tag = value;
        this.widthElm.value = value.width;
        this.heightElm.value = value.height;
        this.alignElm.selectedValue = value.align;
        this.autoElm.selectedValue = value.auto;
    }

    async edit() {

    }

    async confirm() {

    }

    async discard() {

    }

    async config() {

    }

    render() {
        return <i-panel>
            <i-label caption='General Content'></i-label>
        </i-panel>
    }
}