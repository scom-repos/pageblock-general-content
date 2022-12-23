import { Module, customElements, Styles, Container, customModule, application, Input, RadioGroup, Panel, VStack, IComboItem, Label } from '@ijstech/components';
import { PageBlock } from "./pageBlock.interface";
import './generalContent.css';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ["i-section-general-content"]: GeneralContent;
        }
    }
}

type ContentType = "paragraph" | "button";
type sceneType = "editor" | "viewer"

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
    contentId: string,
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
    btnAlignment: string,
    btnLink: string
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
    private previewTxt: Label;
    private titleSetting: VStack;
    private noContent: Label;

    private maxContentId = -1;
    private tempData: GeneralContentData;
    private alignmentChoices: IComboItem[] = [
        { value: "textLeft", label: "left" }, { value: "textRight", label: "right" }, { value: "textCenter", label: "center" }
    ];

    tag: any = {};
    defaultEdit: boolean = true;
    readonly onConfirm: () => Promise<void>;
    readonly onDiscard: () => Promise<void>;
    readonly onEdit: () => Promise<void>;

    async init() {
        super.init();
        this.initData();
        this.initTitleSetting();
    }

    initData() {
        this.tempData = {
            title: {
                titleContent: 'New title',
                titleFontsize: '25px',
                titleFontColor: '#000000',
                titleAlignment: 'textCenter'
            },
            contentList: []
        }
        this.data = this.deepCopyGeneralContentData(this.tempData);
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

    async setData(value: GeneralContentData) {
        this.data = this.deepCopyGeneralContentData(value)
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
        if (this.data != undefined) this.tempData = this.deepCopyGeneralContentData(this.data)
        else { console.log("data is undefined"); }
        this.changeScene("editor");
        this.renderPreview();
        this.renderConfig();
    }

    async confirm() {
        this.setData(this.tempData);

        this.changeScene("viewer");
        this.renderPreview();
    }

    async discard() {
        if (this.data != undefined) this.tempData = this.deepCopyGeneralContentData(this.data)
        else { console.log("data is undefined"); }
        this.changeScene("viewer");
        this.renderPreview();
    }

    private changeScene(sceneName: sceneType) {
        if (sceneName == "editor") {
            this.editPage.visible = true;
            this.viewPage.visible = true;
            this.editPage.width = "40%";
            this.viewPage.width = "60%";
            this.previewTxt.visible = true

        } else if (sceneName == "viewer") {
            this.editPage.visible = false;
            this.viewPage.visible = true;
            this.editPage.width = "0%";
            this.viewPage.width = "100%";
            this.previewTxt.visible = false

        } else {
            console.log("Scene does not exist")
        }
    }

    private deepCopyGeneralContentData(toBeCopied: GeneralContentData) {
        let newList: GeneralContentData = {
            title: {
                titleContent: toBeCopied.title.titleContent,
                titleFontsize: toBeCopied.title.titleFontsize,
                titleFontColor: toBeCopied.title.titleFontColor,
                titleAlignment: toBeCopied.title.titleAlignment,
            },
            contentList: []
        }
        for (let i = 0; i < toBeCopied.contentList.length; i++) {
            if (toBeCopied.contentList[i].type == "paragraph") {
                newList.contentList.push({
                    contentId: toBeCopied.contentList[i].contentId,
                    type: toBeCopied.contentList[i].type,
                    content: {
                        paraContent: (toBeCopied.contentList[i].content as ParagraphData).paraContent,
                        paraFontsize: (toBeCopied.contentList[i].content as ParagraphData).paraFontsize,
                        paraFontColor: (toBeCopied.contentList[i].content as ParagraphData).paraFontColor,
                        paraAlignment: (toBeCopied.contentList[i].content as ParagraphData).paraAlignment
                    }
                })
            } else if (toBeCopied.contentList[i].type == "button") {
                newList.contentList.push({
                    contentId: toBeCopied.contentList[i].contentId,
                    type: toBeCopied.contentList[i].type,
                    content: {
                        btnTxt: (toBeCopied.contentList[i].content as ButtonData).btnTxt,
                        btnTxtColor: (toBeCopied.contentList[i].content as ButtonData).btnTxtColor,
                        btnTxtFontSize: (toBeCopied.contentList[i].content as ButtonData).btnTxtFontSize,
                        btnBGColor: (toBeCopied.contentList[i].content as ButtonData).btnBGColor,
                        btnAlignment: (toBeCopied.contentList[i].content as ButtonData).btnAlignment,
                        btnLink: (toBeCopied.contentList[i].content as ButtonData).btnLink,
                    }
                })
            } else {
                console.log("Content type does not exist")
            }
        }
        return newList;
    }

    private setNoContent() {
        this.noContent.visible = (this.tempData.contentList.length == 0);
    }

    private handleTitleCaptionChange(value: any) {
        this.tempData.title.titleContent = this.titleInput.value;
        this.renderPreview();
    }

    private handleTitleColorChange(value: any) {
        this.tempData.title.titleFontColor = this.titleColorPicker.value;
        this.renderPreview();
    }

    private handleTitleAlignmentChange(value: any) {
        this.tempData.title.titleAlignment = this.titleAlignmentPicker.value.value;
        this.renderPreview();
    }

    private handleTitleFontSizeChange(value: any) {
        if (this.titleFontSizeInput.value > 200) return;
        this.tempData.title.titleFontsize = this.titleFontSizeInput.value + 'px';
        this.renderPreview();
    }

    private handleContentColorChange(value: any, type: string) {
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1])
        if (type == "p") {
            (this.tempData.contentList[index].content as ParagraphData).paraFontColor = value.value;
        } else if (type == "b") {
            (this.tempData.contentList[index].content as ButtonData).btnTxtColor = value.value;
        }
        this.renderPreview();
    }

    private handleContentAlignmentChange(value: any, type: string) {
        try {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.parentNode.id.split("_")[1]) // workaround
            if (type == "p") {
                (this.tempData.contentList[index].content as ParagraphData).paraAlignment = value.value.value;
            } else if (type == "b") {
                (this.tempData.contentList[index].content as ButtonData).btnAlignment = value.value.value;
            }
        } catch (e) {
            console.log(e);
        }

        this.renderPreview();
    }

    private handleContentFontSizeChange(value: any, type: string) {
        if (value.value > 200) return;
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1])
        if (type == "p") {
            (this.tempData.contentList[index].content as ParagraphData).paraFontsize = value.value + 'px';
        } else if (type == "b") {
            (this.tempData.contentList[index].content as ButtonData).btnTxtFontSize = value.value + 'px';
        }
        this.renderPreview();
    }

    private handleContentCaptionChange(value: any, type: string) {
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1])
        if (type == "p") {
            (this.tempData.contentList[index].content as ParagraphData).paraContent = value.value;
        } else if (type == "b") {
            (this.tempData.contentList[index].content as ButtonData).btnTxt = value.value;
        }
        this.renderPreview();
    }

    private handleButtonColorChange(value: any) {
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
        (this.tempData.contentList[index].content as ButtonData).btnBGColor = value.value;
        this.renderPreview();
    }

    private handleButtonLinkChange(value: any) {
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
        (this.tempData.contentList[index].content as ButtonData).btnLink = value.value;
        this.renderPreview();
    }

    private removeAContent(value: any) {
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);

        // remove the VStack
        let vstackToBeRemoved = document.getElementById(`vstack_${this.tempData.contentList[index].contentId}`)
        vstackToBeRemoved.parentNode.removeChild(vstackToBeRemoved);

        // remove the data
        this.tempData.contentList = this.tempData.contentList.filter(e => e.contentId !== value.id.split("_")[1]);

        this.setNoContent();
        this.renderPreview();
    }

    private addParagraph() {
        this.maxContentId = this.maxContentId + 1
        let newContentId = (this.maxContentId).toString();
        this.tempData.contentList.push({
            content: {
                paraContent: 'new paragraph',
                paraFontsize: '15px',
                paraFontColor: '#000000',
                paraAlignment: 'textLeft'
            } as ParagraphData,
            type: "paragraph",
            contentId: newContentId
        } as ContentData)
        this.renderConfig();
        this.renderPreview();
    }

    private addButtons() {
        this.maxContentId = this.maxContentId + 1
        let newContentId = (this.maxContentId).toString();
        this.tempData.contentList.push({
            content: {
                btnTxt: 'More',
                btnTxtColor: '#000000',
                btnTxtFontSize: '13',
                btnBGColor: "var(--colors-primary-main)",
                btnAlignment: "textCenter",
                btnLink: ""
            } as ButtonData,
            type: "button",
            contentId: newContentId
        } as ContentData)
        this.renderConfig();
        this.renderPreview();
    }

    private handleClickBtn(value: any) {
        let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
        window.open((this.tempData.contentList[index].content as ButtonData).btnLink)
    }

    private renderConfig() {

        this.content.clearInnerHTML();
        this.setNoContent();

        for (let i = 0; i < this.tempData.contentList.length; i++) {

            if (this.tempData.contentList[i].type == "paragraph") {
                let contentId = this.tempData.contentList[i].contentId
                this.content.append(
                    <i-vstack id={`vstack_${contentId}`} class="configVstack" width="100%" background={{ color: '#ffe6d5' }}
                        margin={{ bottom: '10px' }} border={{ radius: '10px' }}
                        padding={{ top: '1rem', bottom: "1rem", left: "1rem", right: "1rem" }} gap="10px">
                        <i-hstack width="100%" justifyContent='space-between' verticalAlignment='center'>
                            <i-hstack gap={"10px"}>
                                <i-label caption="Color"></i-label>
                                <i-input id={`Pcolor_${contentId}`} inputType='color' value={(this.tempData.contentList[i].content as ParagraphData).paraFontColor}
                                    onChanged={(value) => this.handleContentColorChange(value, "p")}></i-input>
                            </i-hstack>
                            <i-icon id={`removeBtn_${contentId}`} name='times-circle' fill='black'
                                width="25px" height="25px" class="pointer"
                                onClick={(value) => this.removeAContent(value)}></i-icon>
                        </i-hstack>
                        <i-hstack width={"100%"} gap={"10px"}>
                            <i-hstack width={"50%"} gap={"10px"}>
                                <i-label caption="Alignment"></i-label>
                                <i-input id={`Palign_${contentId}`}
                                    items={this.alignmentChoices} inputType="combobox"
                                    selectedItem={this.getAlignmentChoicesByLabel(((this.tempData.contentList[i].content) as ParagraphData).paraAlignment, 0)}
                                    onChanged={(value) => this.handleContentAlignmentChange(value, "p")}></i-input>
                            </i-hstack>
                            <i-hstack width={"50%"} gap={"10px"}>
                                <i-label caption="Font size"></i-label>
                                <i-input id={`PfontSize_${contentId}`} inputType="number" width="70px" border={{ radius: '10px' }}
                                    value={parseInt((this.tempData.contentList[i].content as ParagraphData).paraFontsize.replace("px", ""))}
                                    onChanged={(value) => this.handleContentFontSizeChange(value, "p")}></i-input>
                            </i-hstack>
                        </i-hstack>

                        <i-label caption="Caption"></i-label>
                        <i-input id={`Pcaption_${contentId}`} inputType="textarea" placeholder="Input the title here"
                            width={'100%'} height={"150px"} value={(this.tempData.contentList[i].content as ParagraphData).paraContent}
                            onChanged={(value) => this.handleContentCaptionChange(value, "p")} ></i-input>
                    </i-vstack>
                )

            } else if (this.tempData.contentList[i].type == "button") {

                let contentId = this.tempData.contentList[i].contentId
                this.content.append(
                    <i-vstack id={`vstack_${contentId}`} class="configVstack" width="100%" background={{ color: '#ffe6d5' }}
                        margin={{ bottom: '10px' }} border={{ radius: '10px' }}
                        padding={{ top: '1rem', bottom: "1rem", left: "1rem", right: "1rem" }} gap="10px">
                        <i-hstack width="100%" justifyContent='space-between' verticalAlignment='center'>
                            <i-hstack gap={"10px"}>
                                <i-label caption="Text color"></i-label>
                                <i-input id={`Bcolor_${contentId}`} inputType='color'
                                    value={(this.tempData.contentList[i].content as ButtonData).btnTxtColor}
                                    onChanged={(value) => this.handleContentColorChange(value, "b")}></i-input>
                            </i-hstack>

                            <i-icon id={`removeBtn_${contentId}`} name='times-circle' fill='black'
                                width="25px" height="25px" class="pointer"
                                onClick={(value) => this.removeAContent(value)}></i-icon>
                        </i-hstack>
                        <i-hstack width={"100%"} gap={"10px"}>
                            <i-label caption="Background color"></i-label>
                            <i-input id={`BBGcolor_${contentId}`} inputType='color'
                                value={(this.tempData.contentList[i].content as ButtonData).btnBGColor}
                                onChanged={(value) => this.handleButtonColorChange(value)}></i-input>
                        </i-hstack>

                        <i-hstack width={"100%"} gap={"10px"}>
                            <i-hstack width={"50%"} gap={"10px"}>
                                <i-label caption="Alignment"></i-label>
                                <i-input id={`BAlignment_${contentId}`} items={this.alignmentChoices} inputType="combobox"
                                    selectedItem={this.getAlignmentChoicesByLabel(((this.tempData.contentList[i].content) as ButtonData).btnAlignment, 2)}
                                    onChanged={(value) => this.handleContentAlignmentChange(value, "b")} ></i-input>
                            </i-hstack>
                            <i-hstack width={"50%"} gap={"10px"}>
                                <i-label caption="Font size"></i-label>
                                <i-input id={`BFontSize_${contentId}`} inputType="number" width="70px" border={{ radius: '10px' }}
                                    value={parseInt((this.tempData.contentList[i].content as ButtonData).btnTxtFontSize.replace("px", ""))}
                                    onChanged={(value) => this.handleContentFontSizeChange(value, "b")}></i-input>
                            </i-hstack>
                        </i-hstack>


                        <i-hstack width="100%" gap="5px" verticalAlignment='center'>
                            <i-label caption="Caption"></i-label>
                            <i-input id={`BCaption_${contentId}`} inputType="textarea" margin={{ left: '1rem' }}
                                placeholder="Input the title here" width={'100%'} height={"30px"}
                                value={(this.tempData.contentList[i].content as ButtonData).btnTxt}
                                onChanged={(value) => this.handleContentCaptionChange(value, "b")} ></i-input>
                        </i-hstack>

                        <i-hstack width="100%" gap="5px" verticalAlignment='center'>
                            <i-label caption="Link"></i-label>
                            <i-input id={`BLink_${contentId}`} inputType="textarea" margin={{ left: '1rem' }}
                                placeholder="Input the link here" width={'100%'} height={"30px"}
                                value={(this.tempData.contentList[i].content as ButtonData).btnLink}
                                onChanged={(value) => this.handleButtonLinkChange(value)} ></i-input>
                        </i-hstack>

                    </i-vstack>
                )

            } else {
                console.log("Content type does not exist")
            }
        }
    }

    private renderPreview() {
        this.preview.clearInnerHTML();

        // render preview title
        let text = document.createElement("p")
        text.classList.add(this.tempData.title.titleAlignment)
        text.innerHTML = this.tempData.title.titleContent
        text.style.fontSize = this.tempData.title.titleFontsize
        text.style.color = this.tempData.title.titleFontColor

        this.preview.append(text)

        // render preview title
        for (let i = 0; i < this.tempData.contentList.length; i++) {
            if (this.tempData.contentList[i].type == "paragraph") {
                let text = document.createElement("p")
                text.classList.add((this.tempData.contentList[i].content as ParagraphData).paraAlignment)
                text.innerHTML = (this.tempData.contentList[i].content as ParagraphData).paraContent
                text.style.fontSize = (this.tempData.contentList[i].content as ParagraphData).paraFontsize
                text.style.color = (this.tempData.contentList[i].content as ParagraphData).paraFontColor

                this.preview.append(text)

            } else if (this.tempData.contentList[i].type == "button") {
                let btnData = this.tempData.contentList[i].content as ButtonData
                console.log(this.getAlignmentLabelByValue(btnData.btnAlignment));
                this.preview.append(
                    <i-hstack width="100%" horizontalAlignment={this.getAlignmentLabelByValue(btnData.btnAlignment) as any} margin={{ top: '10px', bottom: '10px' }}>
                        <i-button id={`btnLink_${this.tempData.contentList[i].contentId}`}
                            padding={{ left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }}
                            caption={btnData.btnTxt} font={{ color: btnData.btnTxtColor, size: btnData.btnTxtFontSize }}
                            background={{ color: btnData.btnBGColor }} onClick={(value) => this.handleClickBtn(value)}></i-button>
                    </i-hstack>
                )
            } else {
                console.log("Content type does not exist")
            }
        }
    }

    private getAlignmentChoicesByLabel(alignType: string, defaultIndex: number) {
        let alignment = this.alignmentChoices.find(e => e.label == alignType) || this.alignmentChoices[defaultIndex]
        return alignment;
    }

    private getAlignmentLabelByValue(align: string) {
        console.log(align)
        let alignment = this.alignmentChoices.find(e => e.value == align) || this.alignmentChoices[0]
        console.log(alignment)
        if (alignment.label == 'left') {
            return "start"
        } else if (alignment.label == 'right') {
            return "end"
        } else if  (alignment.label == 'center') {
            return "center"
        } else {
            console.log("Alignment type does not exist")
        }
    }

    private initTitleSetting() {
        this.titleSetting.append(
            <i-vstack width={"100%"} gap="10px">
                <i-hstack width={"100%"} gap={"10px"}>
                    <i-label caption="Color"></i-label>
                    <i-input id="titleColorPicker" value={this.tempData.title.titleFontColor} inputType='color'
                        onChanged={(value) => this.handleTitleColorChange(value)}></i-input>
                </i-hstack>

                <i-hstack width={"100%"} gap={"10px"}>
                    <i-hstack width={"50%"} gap={"10px"}>
                        <i-label caption="Alignment"></i-label>
                        <i-input id="titleAlignmentPicker" selectedItem={this.getAlignmentChoicesByLabel(this.tempData.title.titleAlignment, 2)}
                            items={this.alignmentChoices} inputType="combobox" border={{ radius: '10px' }}
                            onChanged={(value) => this.handleTitleAlignmentChange(value)}></i-input>
                    </i-hstack>
                    <i-hstack width={"50%"} gap={"10px"}>
                        <i-label caption="Font size"></i-label>
                        <i-input id="titleFontSizeInput" value={parseInt(this.tempData.title.titleFontsize.replace("px", ""))} inputType="number"
                            border={{ radius: '10px' }} width="70px"
                            onChanged={(value) => this.handleTitleFontSizeChange(value)}></i-input>
                    </i-hstack>
                </i-hstack>

                <i-label caption="Caption"></i-label>
                <i-input id='titleInput' inputType="textarea" placeholder="Input the title here"
                    value={this.tempData.title.titleContent} border={{ radius: '10px' }}
                    width={'100%'} height={"150px"} onChanged={(value) => this.handleTitleCaptionChange(value)} ></i-input>
            </i-vstack>
        )
    }

    render() {
        return <i-panel id="mainPnl" width="100%">

            <i-hstack width="100%">
                <i-panel id="editPage" width="40%" padding={{ left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' }}
                    border={{ right: { width: '1px', style: "solid", color: "gray" } }}>

                    <i-hstack width="100%" horizontalAlignment='center' margin={{ bottom: '1.5rem' }}>
                        <i-label caption="Title Setting" class="settingTxt"></i-label>
                    </i-hstack>

                    <i-vstack id="titleSetting" width="100%" background={{ color: '#ffe6d5' }} margin={{ top: '10px' }}
                        padding={{ top: '1rem', bottom: "1rem", left: "1rem", right: "1rem" }} border={{ radius: '10px' }}>

                    </i-vstack>

                    <i-vstack id="contentSetting" width="100%">
                        <i-hstack width="100%" horizontalAlignment='center'>
                            <i-label caption="Content Setting" class="settingTxt" margin={{ top: "2rem", bottom: '1.5rem' }}></i-label>
                        </i-hstack>
                        <i-panel id="content" width="100%"></i-panel>
                        <i-label id="noContent" caption="No content" margin={{ bottom: '1rem' }}></i-label>
                        <i-hstack width="100%" justifyContent='center' gap="20px">
                            <i-button caption="Add a paragragh" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }}
                                onClick={this.addParagraph}></i-button>
                            <i-button caption="Add button" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }}
                                onClick={this.addButtons}></i-button>
                        </i-hstack>
                    </i-vstack>

                </i-panel>

                <i-panel id="viewPage" width="60%" padding={{ left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' }}>
                    <i-hstack width="100%" horizontalAlignment='center'>
                        <i-label id={"previewTxt"} caption="Preview" class="settingTxt"></i-label>
                    </i-hstack>
                    <i-vstack id="preview" width="100%" />
                </i-panel>
            </i-hstack>

        </i-panel>
    }
}