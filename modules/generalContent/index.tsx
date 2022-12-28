import { Module, customElements, Styles, Container, customModule, application, Input, RadioGroup, Panel, VStack, IComboItem, Label } from '@ijstech/components';
import { PageBlock } from "./pageBlock.interface";
import './generalContent.css';

const Theme = Styles.Theme.ThemeVars;

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
        titleAlignment: string,
        titleBold: boolean,
        titleDivider: boolean,
        // titleFontFamily: string
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
    private titleBoldInput: Input;

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
                titleAlignment: 'textCenter',
                titleBold: true,
                titleDivider: true
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
            this.editPage.width = "50%";
            this.viewPage.width = "50%";
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
                titleBold: toBeCopied.title.titleBold,
                titleDivider: toBeCopied.title.titleDivider
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
            console.log("Input box: ", value);
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
        this.renderConfig();
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

        let txtContent = 0, btnContent = 0;

        for (let i = 0; i < this.tempData.contentList.length; i++) {

            if (this.tempData.contentList[i].type == "paragraph") {
                txtContent++;
                let contentId = this.tempData.contentList[i].contentId
                this.content.append(
                    <i-vstack id={`vstack_${contentId}`} width="100%"
                        background={{ color: '#ffffff' }} margin={{ bottom: "20px" }}>

                        <i-hstack width="100%" verticalAlignment='center'
                            margin={{ top: 20, bottom: 20 }} padding={{ left: 15, right: 15 }}
                            justifyContent="space-between">
                            <i-label caption={`Text Content ${txtContent}`}
                                font={{ size: '14px', bold: true }}></i-label>

                            <i-icon id={`removeBtn_${contentId}`} name='times' fill='black'
                                width="20px" height="20px" class="pointer"
                                onClick={(value) => this.removeAContent(value)}></i-icon>
                        </i-hstack>

                        <i-panel class="titleDivider"></i-panel>

                        <i-vstack width="100%" padding={{ left: 15, right: 15, bottom: 15 }}>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Color" width="30%" ></i-label>
                                <i-input id={`Pcolor_${contentId}`} width="70%" inputType='color' value={(this.tempData.contentList[i].content as ParagraphData).paraFontColor}
                                    onChanged={(value) => this.handleContentColorChange(value, "p")}></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Alignment" width="30%" ></i-label>
                                <i-input id={`Palign_${contentId}`} width="70%"
                                    items={this.alignmentChoices} inputType="combobox" icon={{ name: "angle-down" }}
                                    selectedItem={this.getAlignmentChoicesByLabel(((this.tempData.contentList[i].content) as ParagraphData).paraAlignment, 0)}
                                    onChanged={(value) => this.handleContentAlignmentChange(value, "p")}></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Font size" width="30%" ></i-label>
                                <i-input id={`PfontSize_${contentId}`} inputType="number" width="70%" class="shortInput"
                                    value={parseInt((this.tempData.contentList[i].content as ParagraphData).paraFontsize.replace("px", ""))}
                                    onChanged={(value) => this.handleContentFontSizeChange(value, "p")}></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Caption" width="30%"></i-label>
                                <i-input id={`Pcaption_${contentId}`} inputType="textarea" placeholder="Input the title here" class="caption"
                                    width={'70%'} height={"150px"} value={(this.tempData.contentList[i].content as ParagraphData).paraContent}
                                    onChanged={(value) => this.handleContentCaptionChange(value, "p")} ></i-input>
                            </i-hstack>
                        </i-vstack>
                    </i-vstack>
                )

            } else if (this.tempData.contentList[i].type == "button") {
                btnContent++;
                let contentId = this.tempData.contentList[i].contentId
                this.content.append(
                    <i-vstack id={`vstack_${contentId}`} width="100%"
                        background={{ color: '#ffffff' }} margin={{ bottom: "20px" }}>

                        <i-hstack width="100%" verticalAlignment='center'
                            margin={{ top: 20, bottom: 20 }} padding={{ left: 15, right: 15 }}
                            justifyContent="space-between">
                            <i-label caption={`Button Content ${btnContent}`}
                                font={{ size: '14px', bold: true }}></i-label>

                            <i-icon id={`removeBtn_${contentId}`} name='times' fill='black'
                                width="20px" height="20px" class="pointer"
                                onClick={(value) => this.removeAContent(value)}></i-icon>
                        </i-hstack>

                        <i-panel class="titleDivider"></i-panel>

                        <i-vstack width="100%" padding={{ left: 15, right: 15, bottom: 15 }}>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Text color" width="30%" ></i-label>
                                <i-input id={`Bcolor_${contentId}`} inputType='color' width="70%"
                                    value={(this.tempData.contentList[i].content as ButtonData).btnTxtColor}
                                    onChanged={(value) => this.handleContentColorChange(value, "b")}></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Background color" width="30%"></i-label>
                                <i-input id={`BBGcolor_${contentId}`} inputType='color' width="70%"
                                    value={(this.tempData.contentList[i].content as ButtonData).btnBGColor}
                                    onChanged={(value) => this.handleButtonColorChange(value)}></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Alignment" width="30%"></i-label>
                                <i-input id={`BAlignment_${contentId}`} items={this.alignmentChoices} inputType="combobox" icon={{ name: "angle-down" }}
                                    selectedItem={this.getAlignmentChoicesByLabel(((this.tempData.contentList[i].content) as ButtonData).btnAlignment, 2)}
                                    width="70%"
                                    onChanged={(value) => this.handleContentAlignmentChange(value, "b")} ></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Font size" width="30%"></i-label>
                                <i-input id={`BFontSize_${contentId}`} inputType="number" width="70%" class="shortInput"
                                    value={parseInt((this.tempData.contentList[i].content as ButtonData).btnTxtFontSize.replace("px", ""))}
                                    onChanged={(value) => this.handleContentFontSizeChange(value, "b")}></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Caption" width="30%"></i-label>
                                <i-input id={`BCaption_${contentId}`} inputType="textarea"
                                    placeholder="Input the title here" width={'70%'} class="shortInput"
                                    value={(this.tempData.contentList[i].content as ButtonData).btnTxt}
                                    onChanged={(value) => this.handleContentCaptionChange(value, "b")} ></i-input>
                            </i-hstack>

                            <i-panel class="listDivider"></i-panel>

                            <i-hstack width={"100%"} verticalAlignment='center'>
                                <i-label caption="Link" width="30%"></i-label>
                                <i-input id={`BLink_${contentId}`} inputType="textarea"
                                    placeholder="Input the link here" width={'70%'} class="shortInput"
                                    value={(this.tempData.contentList[i].content as ButtonData).btnLink}
                                    onChanged={(value) => this.handleButtonLinkChange(value)} ></i-input>
                            </i-hstack>
                        </i-vstack>
                    </i-vstack>
                )

            } else {
                console.log("Content type does not exist")
            }

            // adjust config page height
            // console.log(this.editPage.style.height, this.viewPage.style.height);
            // this.editPage.style.height = this.viewPage.style.height;
            // console.log(this.editPage.style.height, this.viewPage.style.height);
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
        text.style.fontWeight = (this.tempData.title.titleBold) ? "bold" : "normal";
        text.style.marginBottom = "0.5rem";
        text.style.fontFamily = "";

        this.preview.append(text)

        if (this.tempData.title.titleDivider) {
            this.preview.append(
                <i-panel height={2} visible={this.tempData.title.titleDivider || false} width={200} maxWidth='100%'
                    margin={{ bottom: 8, left: 'auto', right: 'auto' }} background={{ color: Theme.colors.primary.main }}></i-panel>
            )
        }

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

        // adjust config page height
        // console.log(this.editPage.style.height, this.viewPage.style.height);
        // this.editPage.style.height = this.viewPage.style.height;
        // console.log(this.editPage.style.height, this.viewPage.style.height);
    }

    private getAlignmentChoicesByLabel(alignType: string, defaultIndex: number) {
        let alignment = this.alignmentChoices.find(e => e.label == alignType) || this.alignmentChoices[defaultIndex]
        return alignment;
    }

    private getAlignmentLabelByValue(align: string) {
        let alignment = this.alignmentChoices.find(e => e.value == align) || this.alignmentChoices[0]
        if (alignment.label == 'left') {
            return "start"
        } else if (alignment.label == 'right') {
            return "end"
        } else if (alignment.label == 'center') {
            return "center"
        } else {
            console.log("Alignment type does not exist")
        }
    }

    private handleTitleBoldChange(value: any) {
        this.tempData.title.titleBold = value.checked;
        this.renderPreview();
    }

    private handleTitleDividerChange(value: any) {
        this.tempData.title.titleDivider = value.checked;
        this.renderPreview();
    }

    private initTitleSetting() {
        this.titleSetting.append(
            <i-vstack width={"100%"} background={{ color: '#ffffff' }}>

                <i-hstack width="100%" verticalAlignment='center'
                    margin={{ top: 20, bottom: 20 }} padding={{ left: 15, right: 15 }}>
                    <i-label caption="Title Setting" font={{ size: '14px', bold: true }}></i-label>
                </i-hstack>

                <i-panel class="titleDivider"></i-panel>

                <i-vstack width="100%" padding={{ left: 15, right: 15, bottom: 15 }}>

                    <i-hstack width={"100%"} verticalAlignment='center'>
                        <i-label caption="Color" width="30%" ></i-label>
                        <i-input id="titleColorPicker" width="70%" value={this.tempData.title.titleFontColor} inputType='color'
                            onChanged={(value) => this.handleTitleColorChange(value)}></i-input>
                    </i-hstack>

                    <i-panel class="listDivider"></i-panel>

                    <i-hstack width={"100%"} verticalAlignment='center'>
                        <i-label caption="Style" width="30%" ></i-label>
                        <i-vstack width="70%" horizontalAlignment='start' gap="10px">
                            <i-input id="titleBoldInput" inputType='checkbox' checked={true} caption="Bold"
                                onChanged={(value) => this.handleTitleBoldChange(value)}></i-input>

                            <i-input id="titleDividerInput" inputType='checkbox' checked={true} caption="Divider"
                                onChanged={(value) => this.handleTitleDividerChange(value)}></i-input>
                        </i-vstack>
                    </i-hstack>

                    <i-panel class="listDivider"></i-panel>

                    <i-hstack width={"100%"} verticalAlignment='center'>
                        <i-label caption="Alignment" width="30%"></i-label>
                        <i-input id="titleAlignmentPicker" width="70%" selectedItem={this.getAlignmentChoicesByLabel(this.tempData.title.titleAlignment, 2)}
                            captionWidth={0} caption=""
                            items={this.alignmentChoices} inputType="combobox" icon={{ name: "angle-down" }}
                            onChanged={(value) => this.handleTitleAlignmentChange(value)}></i-input>
                    </i-hstack>

                    <i-panel class="listDivider"></i-panel>

                    <i-hstack width={"100%"} verticalAlignment='center'>
                        <i-label caption="Font size" width="30%"></i-label>
                        <i-input id="titleFontSizeInput" class="shortInput" width="70%" value={parseInt(this.tempData.title.titleFontsize.replace("px", ""))}
                            inputType="number"
                            onChanged={(value) => this.handleTitleFontSizeChange(value)}></i-input>
                    </i-hstack>

                    <i-panel class="listDivider"></i-panel>

                    <i-hstack width={"100%"} verticalAlignment='center'>
                        <i-label caption="Caption" width="30%"></i-label>
                        <i-input id='titleInput' width="70%" inputType="textarea" placeholder="Input the title here"
                            value={this.tempData.title.titleContent} class="caption"
                            height={"150px"} onChanged={(value) => this.handleTitleCaptionChange(value)} ></i-input>
                    </i-hstack>

                </i-vstack>

            </i-vstack>
        )
    }

    render() {
        return <i-panel id="mainPnl" width="100%">

            <i-hstack width="100%">

                <i-panel id="editPage" background={{ color: "#f3f3f4" }} width="50%" class="scrollable"
                    border={{ right: { width: '1px', style: "solid", color: "grey" } }}>

                    <i-vstack id="titleSetting" width="100%" padding={{ top: 15, left: 15, right: 15, bottom: 15 }} />

                    <i-vstack id="contentSetting" width="100%" padding={{ top: 15, left: 15, right: 15, bottom: 15 }}>

                        <i-panel id="content" width="100%"></i-panel>
                        <i-label id="noContent" caption="No content" margin={{ bottom: '1rem' }}></i-label>

                        <i-hstack width="100%" justifyContent='center' gap="20px">
                            <i-button caption="Add a paragragh" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }}
                                onClick={this.addParagraph} font={{ color: "#000000" }}></i-button>
                            <i-button caption="Add button" padding={{ left: '10px', top: '5px', right: '10px', bottom: '5px' }}
                                onClick={this.addButtons} font={{ color: "#000000" }}></i-button>
                        </i-hstack>

                    </i-vstack>

                </i-panel>

                <i-panel id="viewPage" width="50%" padding={{ left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' }}>
                    <i-hstack width="100%" horizontalAlignment='center'>
                        <i-label id={"previewTxt"} caption="Preview" class="settingTxt"></i-label>
                    </i-hstack>
                    <i-vstack id="preview" width="100%" />
                </i-panel>

            </i-hstack>

        </i-panel>
    }
}