import { Module, customElements, Styles, Container, customModule, application, Input, RadioGroup, Panel } from '@ijstech/components';
import { PageBlock } from "./pageBlock.interface";
import './generalContent.css';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["i-section-general-content"]: GeneralContent;
        }
    }
}

type ContentType = 'paragraph' | 'buttons';

interface GeneralContentData {
    title: {
        titleContent: string,
        titleFontsize: number,
        titleFontColor: string
    },
    content: ContentData[]
}

interface ContentData {
    type: ContentType
}

@customModule
@customElements("i-section-general-content")
export default class GeneralContent extends Module implements PageBlock {
    private data: any;
    private widthElm: Input;
    private heightElm: Input;
    private alignElm: RadioGroup;
    private autoElm: RadioGroup;
    private editPage: Panel;
    private viewPage: Panel;
    private content: Panel;

    tag: any = {};
    defaultEdit: boolean = true;
    readonly onConfirm: () => Promise<void>;
    readonly onDiscard: () => Promise<void>;
    readonly onEdit: () => Promise<void>;

    async init() {
        super.init();
    }

    async config() {

    }

    async onConfigCancel() {

    }

    async onConfigSave() {

        this.tag.width = this.widthElm.value;
        this.tag.height = this.heightElm.value;
        this.tag.align = this.alignElm.selectedValue;
        this.tag.auto = this.autoElm.selectedValue;
    }

    validate(): boolean {
        return true;
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
        this.editPage.visible = true;
        this.viewPage.visible = false;
        this.editPage.width = "40%";
        this.viewPage.width = "60%";
    }

    async confirm() {
        this.editPage.visible = false;
        this.viewPage.visible = true;
        this.editPage.width = "0%";
        this.viewPage.width = "100%";
    }

    async discard() {
        this.editPage.visible = false;
        this.viewPage.visible = true;
        this.editPage.width = "0%";
        this.viewPage.width = "100%";
    }

    private addParagraph() {

    }

    private addButtons() {

    }

    private setTitle() {

    }

    render() {
        return <i-panel width="100%">

            <i-hstack width="100%">
                <i-panel id="editPage" width="40%">

                    <i-label caption="Content page setting"></i-label>

                    <i-vstack id="titleSetting" width="100%" gap="10px">
                        <i-label caption="Title"></i-label>
                        <i-input id='titleInput' inputType="textarea" placeholder="Input the title here" width={'100%'} height={"200px"} onChanged={this.setTitle} ></i-input>
                    </i-vstack>

                    <i-vstack id="contentSetting" width="100%" gap="10px">
                        <i-label caption="Content"></i-label>
                        <i-panel id="content" width="100%"></i-panel>
                        <i-hstack width="100%" justifyContent='center' gap="20px">
                            <i-button caption="Add a paragragh" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }} onClick={this.addParagraph}></i-button>
                            <i-button caption="Add buttons" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }} onClick={this.addButtons}></i-button>
                        </i-hstack>
                    </i-vstack>

                </i-panel>

                <i-panel id="viewPage" width="60%">
                    <i-label caption="Content preview"></i-label>

                </i-panel>
            </i-hstack>

        </i-panel>
    }
}