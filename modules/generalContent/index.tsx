import { Module, customElements, Styles, Container, customModule, application, Input, RadioGroup, Panel, VStack, IComboItem } from '@ijstech/components';
import { PageBlock } from "./pageBlock.interface";
import './generalContent.css';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["i-section-general-content"]: GeneralContent;
        }
    }
}

type ContentType = "paragraph" | "button"

interface GeneralContentData {
    title: {
        titleContent: string,
        titleFontsize: string,
        titleFontColor: string,
        titleAlignment: string
    },
    contentList: ContentData[]
}

interface ContentData {
    content: ParagraphData | ButtonData,
    type: ContentType
}

interface ParagraphData {
    paraContent: string,
    paraFontsize: string,
    paraFontColor: string,
    paraAlignment: string
}

interface ButtonData {
    btnTxt: string,
    btnTxtColor: string,
    btnTxtFontSize: string,
    btnBGColor: string,
    btnAlignment: string
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
    private preview: VStack;
    private titleColorPicker: Input;
    private titleInput: Input;
    private titleAlignmentPicker: Input;
    private titleFontSizeInput: Input;

    private tempData: GeneralContentData;
    private alignmentChoices: IComboItem[] = [
        { value: "start", label: "left" }, { value: "end", label: "right" }, { value: "center", label: "center" }
    ];

    tag: any = {};
    defaultEdit: boolean = true;
    readonly onConfirm: () => Promise<void>;
    readonly onDiscard: () => Promise<void>;
    readonly onEdit: () => Promise<void>;

    async init() {
        super.init();
        this.initTempData();
    }

    initTempData() {
        this.tempData = {
            title: {
                titleContent: 'Type the title here',
                titleFontsize: '18px',
                titleFontColor: '#000000',
                titleAlignment: 'start'
            },
            contentList: []
        }
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
        this.viewPage.visible = true;
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
        this.tempData.contentList.push({
            content: {
                paraContent: '',
                paraFontsize: '15px',
                paraFontColor: '#000000',
                paraAlignment: 'start'
            } as ParagraphData,
            type: "paragraph"
        } as ContentData)
    }

    private addButtons() {
        this.tempData.contentList.push({
            content: {
                btnTxt: 'More',
                btnTxtColor: '#000000',
                btnTxtFontSize: '13',
                btnBGColor: "#ff6600",
                btnAlignment: "center"
            } as ButtonData,
            type: "button"
        } as ContentData)
    }

    private handleTitleCaptionChange() {
        this.tempData.title.titleContent = this.titleInput.value;
        this.renderUI();
    }

    private handleTitleColorChange() {
        this.tempData.title.titleFontColor = this.titleColorPicker.value;
        this.renderUI();
    }

    private handleTitleAlignmentChange() {
        this.tempData.title.titleAlignment = this.titleAlignmentPicker.value;
        this.renderUI();
    }

    private handleTitleFontSizeChange() {
        this.tempData.title.titleFontsize = this.titleFontSizeInput.value + 'px';
        this.renderUI();
    }

    private renderUI() {

        this.preview.clearInnerHTML();

        // render title
        this.preview.append(
            <i-hstack width="100%" horizontalAlignment={this.tempData.title.titleAlignment as any}>
                <i-label font={{ size: this.tempData.title.titleFontsize, color: this.tempData.title.titleFontColor }}
                    caption={this.tempData.title.titleContent}></i-label>
            </i-hstack>
        )

        // render content
        for (let i = 0; i < this.tempData.contentList.length; i++) {

            if (this.tempData.contentList[i].type == "paragraph") {
                this.preview.append(
                    <i-hstack width="100%" horizontalAlignment={(this.tempData.contentList[i].content as ParagraphData).paraAlignment as any}>
                        <i-label font={{ size: this.tempData.title.titleFontsize, color: this.tempData.title.titleFontColor }}
                            caption={this.tempData.title.titleContent} wordBreak={"break-all"} overflowWrap={"break-word"}></i-label>
                    </i-hstack>
                )


            } else if (this.tempData.contentList[i].type == "button") {
                let btnData = this.tempData.contentList[i].content as ButtonData
                this.preview.append(
                    <i-hstack width="100%" horizontalAlignment={btnData.btnAlignment as any}>
                        <i-button padding={{ left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }}
                            caption={btnData.btnTxt} font={{ color: btnData.btnTxtColor, size: btnData.btnTxtFontSize }}
                            background={{ color: btnData.btnBGColor }}></i-button>
                    </i-hstack>
                )
            } else {
                console.log("Content type does not exist")
            }
        }
    }

    render() {
        return <i-panel id="mainPnl" width="100%">

            <i-hstack width="100%">
                <i-panel id="editPage" width="40%" padding={{ left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' }}>

                    <i-label caption="Content page setting"></i-label>

                    <i-vstack id="titleSetting" width="100%" gap="10px">
                        <i-label caption="Title"></i-label>
                        <i-hstack width={"100%"}>
                            <i-label caption="Color"></i-label>
                            <i-input id="titleColorPicker" inputType='color' onChanged={this.handleTitleColorChange}></i-input>
                        </i-hstack>
                        <i-hstack width={"100%"}>
                            <i-label caption="Alignment"></i-label>
                            <i-input id="titleAlignmentPicker" items={this.alignmentChoices} inputType="combobox" onChanged={this.handleTitleAlignmentChange}></i-input>
                        </i-hstack>
                        <i-hstack width={"100%"}>
                            <i-label caption="Font size"></i-label>
                            <i-input id="titleFontSizeInput" inputType="number" onChanged={this.handleTitleFontSizeChange}></i-input>
                        </i-hstack>
                        <i-label caption="Caption"></i-label>
                        <i-input id='titleInput' inputType="textarea" placeholder="Input the title here" width={'100%'} height={"200px"} onChanged={this.handleTitleCaptionChange} ></i-input>
                    </i-vstack>

                    <i-vstack id="contentSetting" width="100%" gap="10px">
                        <i-label caption="Content"></i-label>
                        <i-panel id="content" width="100%"></i-panel>
                        <i-hstack width="100%" justifyContent='center' gap="20px">
                            <i-button caption="Add a paragragh" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }} onClick={this.addParagraph}></i-button>
                            <i-button caption="Add button" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }} onClick={this.addButtons}></i-button>
                        </i-hstack>
                    </i-vstack>

                </i-panel>

                <i-panel id="viewPage" width="60%">
                    <i-label caption="Content preview"></i-label>
                    <i-vstack id="preview" width="100%" />
                </i-panel>
            </i-hstack>

        </i-panel>
    }
}