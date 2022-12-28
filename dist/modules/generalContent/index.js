var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@modules/general-content/pageBlock.interface.tsx", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@modules/general-content/generalContent.css.ts", ["require", "exports", "@ijstech/components"], function (require, exports, components_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_1.Styles.Theme.ThemeVars;
    components_1.Styles.cssRule('#mainPnl', {
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
});
define("@modules/general-content", ["require", "exports", "@ijstech/components", "@modules/general-content/generalContent.css.ts"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Theme = components_2.Styles.Theme.ThemeVars;
    let GeneralContent = class GeneralContent extends components_2.Module {
        constructor() {
            super(...arguments);
            this.maxContentId = -1;
            this.alignmentChoices = [
                { value: "textLeft", label: "left" }, { value: "textRight", label: "right" }, { value: "textCenter", label: "center" }
            ];
            this.tag = {};
            this.defaultEdit = true;
        }
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
            };
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
        validate() {
            return true;
        }
        async getData() {
            return this.data;
        }
        async setData(value) {
            this.data = this.deepCopyGeneralContentData(value);
        }
        getTag() {
            return this.tag;
        }
        async setTag(value) {
            this.tag = value;
            this.widthElm.value = value.width;
            this.heightElm.value = value.height;
            this.alignElm.selectedValue = value.align;
            this.autoElm.selectedValue = value.auto;
        }
        async edit() {
            if (this.data != undefined)
                this.tempData = this.deepCopyGeneralContentData(this.data);
            else {
                console.log("data is undefined");
            }
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
            if (this.data != undefined)
                this.tempData = this.deepCopyGeneralContentData(this.data);
            else {
                console.log("data is undefined");
            }
            this.changeScene("viewer");
            this.renderPreview();
        }
        changeScene(sceneName) {
            if (sceneName == "editor") {
                this.editPage.visible = true;
                this.viewPage.visible = true;
                this.editPage.width = "50%";
                this.viewPage.width = "50%";
                this.previewTxt.visible = true;
            }
            else if (sceneName == "viewer") {
                this.editPage.visible = false;
                this.viewPage.visible = true;
                this.editPage.width = "0%";
                this.viewPage.width = "100%";
                this.previewTxt.visible = false;
            }
            else {
                console.log("Scene does not exist");
            }
        }
        deepCopyGeneralContentData(toBeCopied) {
            let newList = {
                title: {
                    titleContent: toBeCopied.title.titleContent,
                    titleFontsize: toBeCopied.title.titleFontsize,
                    titleFontColor: toBeCopied.title.titleFontColor,
                    titleAlignment: toBeCopied.title.titleAlignment,
                    titleBold: toBeCopied.title.titleBold,
                    titleDivider: toBeCopied.title.titleDivider
                },
                contentList: []
            };
            for (let i = 0; i < toBeCopied.contentList.length; i++) {
                if (toBeCopied.contentList[i].type == "paragraph") {
                    newList.contentList.push({
                        contentId: toBeCopied.contentList[i].contentId,
                        type: toBeCopied.contentList[i].type,
                        content: {
                            paraContent: toBeCopied.contentList[i].content.paraContent,
                            paraFontsize: toBeCopied.contentList[i].content.paraFontsize,
                            paraFontColor: toBeCopied.contentList[i].content.paraFontColor,
                            paraAlignment: toBeCopied.contentList[i].content.paraAlignment
                        }
                    });
                }
                else if (toBeCopied.contentList[i].type == "button") {
                    newList.contentList.push({
                        contentId: toBeCopied.contentList[i].contentId,
                        type: toBeCopied.contentList[i].type,
                        content: {
                            btnTxt: toBeCopied.contentList[i].content.btnTxt,
                            btnTxtColor: toBeCopied.contentList[i].content.btnTxtColor,
                            btnTxtFontSize: toBeCopied.contentList[i].content.btnTxtFontSize,
                            btnBGColor: toBeCopied.contentList[i].content.btnBGColor,
                            btnAlignment: toBeCopied.contentList[i].content.btnAlignment,
                            btnLink: toBeCopied.contentList[i].content.btnLink,
                        }
                    });
                }
                else {
                    console.log("Content type does not exist");
                }
            }
            return newList;
        }
        setNoContent() {
            this.noContent.visible = (this.tempData.contentList.length == 0);
        }
        handleTitleCaptionChange(value) {
            this.tempData.title.titleContent = this.titleInput.value;
            this.renderPreview();
        }
        handleTitleColorChange(value) {
            this.tempData.title.titleFontColor = this.titleColorPicker.value;
            this.renderPreview();
        }
        handleTitleAlignmentChange(value) {
            this.tempData.title.titleAlignment = this.titleAlignmentPicker.value.value;
            this.renderPreview();
        }
        handleTitleFontSizeChange(value) {
            if (this.titleFontSizeInput.value > 200)
                return;
            this.tempData.title.titleFontsize = this.titleFontSizeInput.value + 'px';
            this.renderPreview();
        }
        handleContentColorChange(value, type) {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            if (type == "p") {
                this.tempData.contentList[index].content.paraFontColor = value.value;
            }
            else if (type == "b") {
                this.tempData.contentList[index].content.btnTxtColor = value.value;
            }
            this.renderPreview();
        }
        handleContentAlignmentChange(value, type) {
            try {
                console.log("Input box: ", value);
                let index = this.tempData.contentList.findIndex(e => e.contentId == value.parentNode.id.split("_")[1]); // workaround
                if (type == "p") {
                    this.tempData.contentList[index].content.paraAlignment = value.value.value;
                }
                else if (type == "b") {
                    this.tempData.contentList[index].content.btnAlignment = value.value.value;
                }
            }
            catch (e) {
                console.log(e);
            }
            this.renderPreview();
        }
        handleContentFontSizeChange(value, type) {
            if (value.value > 200)
                return;
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            if (type == "p") {
                this.tempData.contentList[index].content.paraFontsize = value.value + 'px';
            }
            else if (type == "b") {
                this.tempData.contentList[index].content.btnTxtFontSize = value.value + 'px';
            }
            this.renderPreview();
        }
        handleContentCaptionChange(value, type) {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            if (type == "p") {
                this.tempData.contentList[index].content.paraContent = value.value;
            }
            else if (type == "b") {
                this.tempData.contentList[index].content.btnTxt = value.value;
            }
            this.renderPreview();
        }
        handleButtonColorChange(value) {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            this.tempData.contentList[index].content.btnBGColor = value.value;
            this.renderPreview();
        }
        handleButtonLinkChange(value) {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            this.tempData.contentList[index].content.btnLink = value.value;
            this.renderPreview();
        }
        removeAContent(value) {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            // remove the VStack
            let vstackToBeRemoved = document.getElementById(`vstack_${this.tempData.contentList[index].contentId}`);
            vstackToBeRemoved.parentNode.removeChild(vstackToBeRemoved);
            // remove the data
            this.tempData.contentList = this.tempData.contentList.filter(e => e.contentId !== value.id.split("_")[1]);
            this.setNoContent();
            this.renderPreview();
            this.renderConfig();
        }
        addParagraph() {
            this.maxContentId = this.maxContentId + 1;
            let newContentId = (this.maxContentId).toString();
            this.tempData.contentList.push({
                content: {
                    paraContent: 'new paragraph',
                    paraFontsize: '15px',
                    paraFontColor: '#000000',
                    paraAlignment: 'textLeft'
                },
                type: "paragraph",
                contentId: newContentId
            });
            this.renderConfig();
            this.renderPreview();
        }
        addButtons() {
            this.maxContentId = this.maxContentId + 1;
            let newContentId = (this.maxContentId).toString();
            this.tempData.contentList.push({
                content: {
                    btnTxt: 'More',
                    btnTxtColor: '#000000',
                    btnTxtFontSize: '13',
                    btnBGColor: "var(--colors-primary-main)",
                    btnAlignment: "textCenter",
                    btnLink: ""
                },
                type: "button",
                contentId: newContentId
            });
            this.renderConfig();
            this.renderPreview();
        }
        handleClickBtn(value) {
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            window.open(this.tempData.contentList[index].content.btnLink);
        }
        renderConfig() {
            this.content.clearInnerHTML();
            this.setNoContent();
            let txtContent = 0, btnContent = 0;
            for (let i = 0; i < this.tempData.contentList.length; i++) {
                if (this.tempData.contentList[i].type == "paragraph") {
                    txtContent++;
                    let contentId = this.tempData.contentList[i].contentId;
                    this.content.append(this.$render("i-vstack", { id: `vstack_${contentId}`, width: "100%", background: { color: '#ffffff' }, margin: { bottom: "20px" } },
                        this.$render("i-hstack", { width: "100%", verticalAlignment: 'center', margin: { top: 20, bottom: 20 }, padding: { left: 15, right: 15 }, justifyContent: "space-between" },
                            this.$render("i-label", { caption: `Text Content ${txtContent}`, font: { size: '14px', bold: true } }),
                            this.$render("i-icon", { id: `removeBtn_${contentId}`, name: 'times', fill: 'black', width: "20px", height: "20px", class: "pointer", onClick: (value) => this.removeAContent(value) })),
                        this.$render("i-panel", { class: "titleDivider" }),
                        this.$render("i-vstack", { width: "100%", padding: { left: 15, right: 15, bottom: 15 } },
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Color", width: "30%" }),
                                this.$render("i-input", { id: `Pcolor_${contentId}`, width: "70%", inputType: 'color', value: this.tempData.contentList[i].content.paraFontColor, onChanged: (value) => this.handleContentColorChange(value, "p") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Alignment", width: "30%" }),
                                this.$render("i-input", { id: `Palign_${contentId}`, width: "70%", items: this.alignmentChoices, inputType: "combobox", icon: { name: "angle-down" }, selectedItem: this.getAlignmentChoicesByLabel((this.tempData.contentList[i].content).paraAlignment, 0), onChanged: (value) => this.handleContentAlignmentChange(value, "p") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Font size", width: "30%" }),
                                this.$render("i-input", { id: `PfontSize_${contentId}`, inputType: "number", width: "70%", class: "shortInput", value: parseInt(this.tempData.contentList[i].content.paraFontsize.replace("px", "")), onChanged: (value) => this.handleContentFontSizeChange(value, "p") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Caption", width: "30%" }),
                                this.$render("i-input", { id: `Pcaption_${contentId}`, inputType: "textarea", placeholder: "Input the title here", class: "caption", width: '70%', height: "150px", value: this.tempData.contentList[i].content.paraContent, onChanged: (value) => this.handleContentCaptionChange(value, "p") })))));
                }
                else if (this.tempData.contentList[i].type == "button") {
                    btnContent++;
                    let contentId = this.tempData.contentList[i].contentId;
                    this.content.append(this.$render("i-vstack", { id: `vstack_${contentId}`, width: "100%", background: { color: '#ffffff' }, margin: { bottom: "20px" } },
                        this.$render("i-hstack", { width: "100%", verticalAlignment: 'center', margin: { top: 20, bottom: 20 }, padding: { left: 15, right: 15 }, justifyContent: "space-between" },
                            this.$render("i-label", { caption: `Button Content ${btnContent}`, font: { size: '14px', bold: true } }),
                            this.$render("i-icon", { id: `removeBtn_${contentId}`, name: 'times', fill: 'black', width: "20px", height: "20px", class: "pointer", onClick: (value) => this.removeAContent(value) })),
                        this.$render("i-panel", { class: "titleDivider" }),
                        this.$render("i-vstack", { width: "100%", padding: { left: 15, right: 15, bottom: 15 } },
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Text color", width: "30%" }),
                                this.$render("i-input", { id: `Bcolor_${contentId}`, inputType: 'color', width: "70%", value: this.tempData.contentList[i].content.btnTxtColor, onChanged: (value) => this.handleContentColorChange(value, "b") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Background color", width: "30%" }),
                                this.$render("i-input", { id: `BBGcolor_${contentId}`, inputType: 'color', width: "70%", value: this.tempData.contentList[i].content.btnBGColor, onChanged: (value) => this.handleButtonColorChange(value) })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Alignment", width: "30%" }),
                                this.$render("i-input", { id: `BAlignment_${contentId}`, items: this.alignmentChoices, inputType: "combobox", icon: { name: "angle-down" }, selectedItem: this.getAlignmentChoicesByLabel((this.tempData.contentList[i].content).btnAlignment, 2), width: "70%", onChanged: (value) => this.handleContentAlignmentChange(value, "b") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Font size", width: "30%" }),
                                this.$render("i-input", { id: `BFontSize_${contentId}`, inputType: "number", width: "70%", class: "shortInput", value: parseInt(this.tempData.contentList[i].content.btnTxtFontSize.replace("px", "")), onChanged: (value) => this.handleContentFontSizeChange(value, "b") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Caption", width: "30%" }),
                                this.$render("i-input", { id: `BCaption_${contentId}`, inputType: "textarea", placeholder: "Input the title here", width: '70%', class: "shortInput", value: this.tempData.contentList[i].content.btnTxt, onChanged: (value) => this.handleContentCaptionChange(value, "b") })),
                            this.$render("i-panel", { class: "listDivider" }),
                            this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                                this.$render("i-label", { caption: "Link", width: "30%" }),
                                this.$render("i-input", { id: `BLink_${contentId}`, inputType: "textarea", placeholder: "Input the link here", width: '70%', class: "shortInput", value: this.tempData.contentList[i].content.btnLink, onChanged: (value) => this.handleButtonLinkChange(value) })))));
                }
                else {
                    console.log("Content type does not exist");
                }
                // adjust config page height
                // console.log(this.editPage.style.height, this.viewPage.style.height);
                // this.editPage.style.height = this.viewPage.style.height;
                // console.log(this.editPage.style.height, this.viewPage.style.height);
            }
        }
        renderPreview() {
            this.preview.clearInnerHTML();
            // render preview title
            let text = document.createElement("p");
            text.classList.add(this.tempData.title.titleAlignment);
            text.innerHTML = this.tempData.title.titleContent;
            text.style.fontSize = this.tempData.title.titleFontsize;
            text.style.color = this.tempData.title.titleFontColor;
            text.style.fontWeight = (this.tempData.title.titleBold) ? "bold" : "normal";
            text.style.marginBottom = "0.5rem";
            text.style.fontFamily = "";
            this.preview.append(text);
            if (this.tempData.title.titleDivider) {
                this.preview.append(this.$render("i-panel", { height: 2, visible: this.tempData.title.titleDivider || false, width: 200, maxWidth: '100%', margin: { bottom: 8, left: 'auto', right: 'auto' }, background: { color: Theme.colors.primary.main } }));
            }
            // render preview title
            for (let i = 0; i < this.tempData.contentList.length; i++) {
                if (this.tempData.contentList[i].type == "paragraph") {
                    let text = document.createElement("p");
                    text.classList.add(this.tempData.contentList[i].content.paraAlignment);
                    text.innerHTML = this.tempData.contentList[i].content.paraContent;
                    text.style.fontSize = this.tempData.contentList[i].content.paraFontsize;
                    text.style.color = this.tempData.contentList[i].content.paraFontColor;
                    this.preview.append(text);
                }
                else if (this.tempData.contentList[i].type == "button") {
                    let btnData = this.tempData.contentList[i].content;
                    this.preview.append(this.$render("i-hstack", { width: "100%", horizontalAlignment: this.getAlignmentLabelByValue(btnData.btnAlignment), margin: { top: '10px', bottom: '10px' } },
                        this.$render("i-button", { id: `btnLink_${this.tempData.contentList[i].contentId}`, padding: { left: '1rem', right: '1rem', top: '0.5rem', bottom: '0.5rem' }, caption: btnData.btnTxt, font: { color: btnData.btnTxtColor, size: btnData.btnTxtFontSize }, background: { color: btnData.btnBGColor }, onClick: (value) => this.handleClickBtn(value) })));
                }
                else {
                    console.log("Content type does not exist");
                }
            }
            // adjust config page height
            // console.log(this.editPage.style.height, this.viewPage.style.height);
            // this.editPage.style.height = this.viewPage.style.height;
            // console.log(this.editPage.style.height, this.viewPage.style.height);
        }
        getAlignmentChoicesByLabel(alignType, defaultIndex) {
            let alignment = this.alignmentChoices.find(e => e.label == alignType) || this.alignmentChoices[defaultIndex];
            return alignment;
        }
        getAlignmentLabelByValue(align) {
            let alignment = this.alignmentChoices.find(e => e.value == align) || this.alignmentChoices[0];
            if (alignment.label == 'left') {
                return "start";
            }
            else if (alignment.label == 'right') {
                return "end";
            }
            else if (alignment.label == 'center') {
                return "center";
            }
            else {
                console.log("Alignment type does not exist");
            }
        }
        handleTitleBoldChange(value) {
            this.tempData.title.titleBold = value.checked;
            this.renderPreview();
        }
        handleTitleDividerChange(value) {
            this.tempData.title.titleDivider = value.checked;
            this.renderPreview();
        }
        initTitleSetting() {
            this.titleSetting.append(this.$render("i-vstack", { width: "100%", background: { color: '#ffffff' } },
                this.$render("i-hstack", { width: "100%", verticalAlignment: 'center', margin: { top: 20, bottom: 20 }, padding: { left: 15, right: 15 } },
                    this.$render("i-label", { caption: "Title Setting", font: { size: '14px', bold: true } })),
                this.$render("i-panel", { class: "titleDivider" }),
                this.$render("i-vstack", { width: "100%", padding: { left: 15, right: 15, bottom: 15 } },
                    this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                        this.$render("i-label", { caption: "Color", width: "30%" }),
                        this.$render("i-input", { id: "titleColorPicker", width: "70%", value: this.tempData.title.titleFontColor, inputType: 'color', onChanged: (value) => this.handleTitleColorChange(value) })),
                    this.$render("i-panel", { class: "listDivider" }),
                    this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                        this.$render("i-label", { caption: "Style", width: "30%" }),
                        this.$render("i-vstack", { width: "70%", horizontalAlignment: 'start', gap: "10px" },
                            this.$render("i-input", { id: "titleBoldInput", inputType: 'checkbox', checked: true, caption: "Bold", onChanged: (value) => this.handleTitleBoldChange(value) }),
                            this.$render("i-input", { id: "titleDividerInput", inputType: 'checkbox', checked: true, caption: "Divider", onChanged: (value) => this.handleTitleDividerChange(value) }))),
                    this.$render("i-panel", { class: "listDivider" }),
                    this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                        this.$render("i-label", { caption: "Alignment", width: "30%" }),
                        this.$render("i-input", { id: "titleAlignmentPicker", width: "70%", selectedItem: this.getAlignmentChoicesByLabel(this.tempData.title.titleAlignment, 2), captionWidth: 0, caption: "", items: this.alignmentChoices, inputType: "combobox", icon: { name: "angle-down" }, onChanged: (value) => this.handleTitleAlignmentChange(value) })),
                    this.$render("i-panel", { class: "listDivider" }),
                    this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                        this.$render("i-label", { caption: "Font size", width: "30%" }),
                        this.$render("i-input", { id: "titleFontSizeInput", class: "shortInput", width: "70%", value: parseInt(this.tempData.title.titleFontsize.replace("px", "")), inputType: "number", onChanged: (value) => this.handleTitleFontSizeChange(value) })),
                    this.$render("i-panel", { class: "listDivider" }),
                    this.$render("i-hstack", { width: "100%", verticalAlignment: 'center' },
                        this.$render("i-label", { caption: "Caption", width: "30%" }),
                        this.$render("i-input", { id: 'titleInput', width: "70%", inputType: "textarea", placeholder: "Input the title here", value: this.tempData.title.titleContent, class: "caption", height: "150px", onChanged: (value) => this.handleTitleCaptionChange(value) })))));
        }
        render() {
            return this.$render("i-panel", { id: "mainPnl", width: "100%" },
                this.$render("i-hstack", { width: "100%" },
                    this.$render("i-panel", { id: "editPage", background: { color: "#f3f3f4" }, width: "50%", class: "scrollable", border: { right: { width: '1px', style: "solid", color: "grey" } } },
                        this.$render("i-vstack", { id: "titleSetting", width: "100%", padding: { top: 15, left: 15, right: 15, bottom: 15 } }),
                        this.$render("i-vstack", { id: "contentSetting", width: "100%", padding: { top: 15, left: 15, right: 15, bottom: 15 } },
                            this.$render("i-panel", { id: "content", width: "100%" }),
                            this.$render("i-label", { id: "noContent", caption: "No content", margin: { bottom: '1rem' } }),
                            this.$render("i-hstack", { width: "100%", justifyContent: 'center', gap: "20px" },
                                this.$render("i-button", { caption: "Add a paragragh", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addParagraph, font: { color: "#000000" } }),
                                this.$render("i-button", { caption: "Add button", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addButtons, font: { color: "#000000" } })))),
                    this.$render("i-panel", { id: "viewPage", width: "50%", padding: { left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' } },
                        this.$render("i-hstack", { width: "100%", horizontalAlignment: 'center' },
                            this.$render("i-label", { id: "previewTxt", caption: "Preview", class: "settingTxt" })),
                        this.$render("i-vstack", { id: "preview", width: "100%" }))));
        }
    };
    GeneralContent = __decorate([
        components_2.customModule,
        components_2.customElements("i-section-general-content")
    ], GeneralContent);
    exports.default = GeneralContent;
});
