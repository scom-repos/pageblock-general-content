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
            }
        }
    });
});
define("@modules/general-content", ["require", "exports", "@ijstech/components", "@modules/general-content/generalContent.css.ts"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let GeneralContent = class GeneralContent extends components_2.Module {
        constructor() {
            super(...arguments);
            this.maxContentId = -1;
            this.alignmentChoices = [
                { value: "textLeft", label: "left" }, { value: "textRight", label: "right" },
                { value: "textCenter", label: "center" }, { value: "textJustify", label: "justify" }
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
            console.log("initData");
            this.tempData = {
                title: {
                    titleContent: 'New title',
                    titleFontsize: '25px',
                    titleFontColor: '#000000',
                    titleAlignment: 'start'
                },
                contentList: []
            };
            console.log(this.tempData);
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
            console.log("edit");
            console.log(this.tempData);
            if (this.data != undefined)
                this.tempData = this.deepCopyGeneralContentData(this.data);
            else {
                console.log("data is undefined");
            }
            this.editPage.visible = true;
            this.viewPage.visible = true;
            this.editPage.width = "40%";
            this.viewPage.width = "60%";
            this.renderPreview();
            this.renderConfig();
        }
        async confirm() {
            this.setData(this.tempData);
            this.editPage.visible = false;
            this.viewPage.visible = true;
            this.editPage.width = "0%";
            this.viewPage.width = "100%";
            this.renderPreview();
            console.log(this.data);
        }
        async discard() {
            if (this.data != undefined)
                this.tempData = this.deepCopyGeneralContentData(this.data);
            else {
                console.log("data is undefined");
            }
            this.editPage.visible = false;
            this.viewPage.visible = true;
            this.editPage.width = "0%";
            this.viewPage.width = "100%";
            this.renderPreview();
        }
        deepCopyGeneralContentData(toBeCopied) {
            console.log("deepCopyGeneralContentData, toBeCopied: ", toBeCopied);
            let newList = {
                title: {
                    titleContent: toBeCopied.title.titleContent,
                    titleFontsize: toBeCopied.title.titleFontsize,
                    titleFontColor: toBeCopied.title.titleFontColor,
                    titleAlignment: toBeCopied.title.titleAlignment,
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
        handleTitleCaptionChange() {
            this.tempData.title.titleContent = this.titleInput.value;
            this.renderPreview();
        }
        handleTitleColorChange() {
            this.tempData.title.titleFontColor = this.titleColorPicker.value;
            this.renderPreview();
        }
        handleTitleAlignmentChange() {
            this.tempData.title.titleAlignment = this.titleAlignmentPicker.value.value;
            this.renderPreview();
        }
        handleTitleFontSizeChange() {
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
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.parentNode.id.split("_")[1]); // workaround
            if (type == "p") {
                this.tempData.contentList[index].content.paraAlignment = value.value.value;
            }
            else if (type == "b") {
                this.tempData.contentList[index].content.btnAlignment = value.value.value;
            }
            this.renderPreview();
        }
        handleContentFontSizeChange(value, type) {
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
            console.log("before remove: ", this.tempData.contentList);
            let index = this.tempData.contentList.findIndex(e => e.contentId == value.id.split("_")[1]);
            console.log("rm index:", index);
            console.log("rm id:", value.id);
            // remove the VStack
            let vstackToBeRemoved = document.getElementById(`vstack_${this.tempData.contentList[index].contentId}`);
            vstackToBeRemoved.parentNode.removeChild(vstackToBeRemoved);
            // remove the data
            this.tempData.contentList = this.tempData.contentList.filter(e => e.contentId !== value.id.split("_")[1]);
            this.renderPreview();
            console.log("after remove: ", this.tempData.contentList);
        }
        addParagraph() {
            console.log("before add: ", this.tempData.contentList);
            this.maxContentId = this.maxContentId + 1;
            let newContentId = (this.maxContentId).toString();
            this.tempData.contentList.push({
                content: {
                    paraContent: 'new paragraph',
                    paraFontsize: '15px',
                    paraFontColor: '#000000',
                    paraAlignment: 'start'
                },
                type: "paragraph",
                contentId: newContentId
            });
            this.renderConfig();
            this.renderPreview();
            console.log("after add: ", this.tempData.contentList);
        }
        addButtons() {
            this.maxContentId = this.maxContentId + 1;
            let newContentId = (this.maxContentId).toString();
            this.tempData.contentList.push({
                content: {
                    btnTxt: 'More',
                    btnTxtColor: '#000000',
                    btnTxtFontSize: '13',
                    btnBGColor: "#ff6600",
                    btnAlignment: "center",
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
            for (let i = 0; i < this.tempData.contentList.length; i++) {
                if (this.tempData.contentList[i].type == "paragraph") {
                    let contentId = this.tempData.contentList[i].contentId;
                    this.content.append(this.$render("i-vstack", { id: `vstack_${contentId}`, class: "configVstack", width: "100%", background: { color: '#cfcfcf' }, margin: { top: '10px' }, border: { radius: '10px' }, padding: { top: '0.5rem', bottom: "0.5rem", left: "0.5rem", right: "0.5rem" }, gap: "10px" },
                        this.$render("i-hstack", { width: "100%", justifyContent: 'space-between', verticalAlignment: 'center' },
                            this.$render("i-label", { caption: `Content ${contentId}` }),
                            this.$render("i-button", { id: `removeBtn_${contentId}`, icon: { name: "cross" }, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, onClick: (value) => this.removeAContent(value) })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Color" }),
                            this.$render("i-input", { id: `Pcolor_${contentId}`, inputType: 'color', value: this.tempData.contentList[i].content.paraFontColor, onChanged: (value) => this.handleContentColorChange(value, "p") })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Alignment" }),
                            this.$render("i-input", { id: `Palign_${contentId}`, items: this.alignmentChoices, inputType: "combobox", onChanged: (value) => this.handleContentAlignmentChange(value, "p") })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Font size" }),
                            this.$render("i-input", { id: `PfontSize_${contentId}`, inputType: "number", width: "70px", value: parseInt(this.tempData.contentList[i].content.paraFontsize) + 1, onChanged: (value) => this.handleContentFontSizeChange(value, "p") })),
                        this.$render("i-label", { caption: "Caption" }),
                        this.$render("i-input", { id: `Pcaption_${contentId}`, inputType: "textarea", placeholder: "Input the title here", width: '100%', height: "150px", value: this.tempData.contentList[i].content.paraContent, onChanged: (value) => this.handleContentCaptionChange(value, "p") })));
                }
                else if (this.tempData.contentList[i].type == "button") {
                    let contentId = this.tempData.contentList[i].contentId;
                    this.content.append(this.$render("i-vstack", { id: `vstack_${contentId}`, class: "configVstack", width: "100%", background: { color: '#cfcfcf' }, margin: { top: '10px' }, border: { radius: '10px' }, padding: { top: '0.5rem', bottom: "0.5rem", left: "0.5rem", right: "0.5rem" }, gap: "10px" },
                        this.$render("i-hstack", { width: "100%", justifyContent: 'space-between', verticalAlignment: 'center' },
                            this.$render("i-label", { caption: `Content ${contentId}` }),
                            this.$render("i-button", { id: `removeBtn_${contentId}`, icon: { name: "cross" }, padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' }, onClick: (value) => this.removeAContent(value) })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Text color" }),
                            this.$render("i-input", { id: `Bcolor_${contentId}`, inputType: 'color', value: this.tempData.contentList[i].content.btnTxtColor, onChanged: (value) => this.handleContentColorChange(value, "b") })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Background color" }),
                            this.$render("i-input", { id: `BBGcolor_${contentId}`, inputType: 'color', value: this.tempData.contentList[i].content.btnBGColor, onChanged: (value) => this.handleButtonColorChange(value) })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Alignment" }),
                            this.$render("i-input", { id: `BAlignment_${contentId}`, value: this.alignmentChoices[0], items: this.alignmentChoices, inputType: "combobox", onChanged: (value) => this.handleContentAlignmentChange(value, "b") })),
                        this.$render("i-hstack", { width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Font size" }),
                            this.$render("i-input", { id: `BFontSize_${contentId}`, inputType: "number", width: "70px", value: parseInt(this.tempData.contentList[i].content.btnTxtFontSize.replace("px", "")), onChanged: (value) => this.handleContentFontSizeChange(value, "b") })),
                        this.$render("i-hstack", { width: "100%", gap: "5px", verticalAlignment: 'center' },
                            this.$render("i-label", { caption: "Caption" }),
                            this.$render("i-input", { id: `BCaption_${contentId}`, inputType: "textarea", placeholder: "Input the title here", width: '100%', height: "30px", value: this.tempData.contentList[i].content.btnTxt, onChanged: (value) => this.handleContentCaptionChange(value, "b") })),
                        this.$render("i-hstack", { width: "100%", gap: "5px", verticalAlignment: 'center' },
                            this.$render("i-label", { caption: "Link" }),
                            this.$render("i-input", { id: `BLink_${contentId}`, inputType: "textarea", placeholder: "Input the link here", width: '100%', height: "30px", value: this.tempData.contentList[i].content.btnLink, onChanged: (value) => this.handleButtonLinkChange(value) }))));
                }
                else {
                    console.log("Content type does not exist");
                }
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
            this.preview.append(text);
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
                    this.preview.append(this.$render("i-hstack", { width: "100%", horizontalAlignment: btnData.btnAlignment },
                        this.$render("i-button", { id: `btnLink_${this.tempData.contentList[i].contentId}`, padding: { left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }, caption: btnData.btnTxt, font: { color: btnData.btnTxtColor, size: btnData.btnTxtFontSize }, background: { color: btnData.btnBGColor }, onClick: (value) => this.handleClickBtn(value) })));
                }
                else {
                    console.log("Content type does not exist");
                }
            }
        }
        initTitleSetting() {
            this.titleSetting.append(this.$render("i-vstack", { width: "100%", gap: "10px" },
                this.$render("i-label", { caption: "Title" }),
                this.$render("i-hstack", { width: "100%", gap: "10px" },
                    this.$render("i-label", { caption: "Color" }),
                    this.$render("i-input", { id: "titleColorPicker", value: this.tempData.title.titleFontColor, inputType: 'color', onChanged: this.handleTitleColorChange })),
                this.$render("i-hstack", { width: "100%", gap: "10px" },
                    this.$render("i-label", { caption: "Alignment" }),
                    this.$render("i-input", { id: "titleAlignmentPicker", value: this.alignmentChoices[0], items: this.alignmentChoices, inputType: "combobox", onChanged: this.handleTitleAlignmentChange })),
                this.$render("i-hstack", { width: "100%", gap: "10px" },
                    this.$render("i-label", { caption: "Font size" }),
                    this.$render("i-input", { id: "titleFontSizeInput", value: this.tempData.title.titleFontsize, inputType: "number", onChanged: this.handleTitleFontSizeChange })),
                this.$render("i-label", { caption: "Caption" }),
                this.$render("i-input", { id: 'titleInput', inputType: "textarea", placeholder: "Input the title here", value: this.tempData.title.titleContent, width: '100%', height: "150px", onChanged: this.handleTitleCaptionChange })));
        }
        render() {
            return this.$render("i-panel", { id: "mainPnl", width: "100%" },
                this.$render("i-hstack", { width: "100%" },
                    this.$render("i-panel", { id: "editPage", width: "40%", padding: { left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' }, border: { right: { width: '1px', style: "solid", color: "gray" } } },
                        this.$render("i-label", { caption: "Content page setting" }),
                        this.$render("i-vstack", { id: "titleSetting", width: "100%", background: { color: '#cfcfcf' }, margin: { top: '10px' }, padding: { top: '0.5rem', bottom: "0.5rem", left: "0.5rem", right: "0.5rem" }, border: { radius: '10px' } }),
                        this.$render("i-vstack", { id: "contentSetting", width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Content", margin: { top: '1rem' } }),
                            this.$render("i-panel", { id: "content", width: "100%" }),
                            this.$render("i-hstack", { width: "100%", justifyContent: 'center', gap: "20px" },
                                this.$render("i-button", { caption: "Add a paragragh", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addParagraph }),
                                this.$render("i-button", { caption: "Add button", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addButtons })))),
                    this.$render("i-panel", { id: "viewPage", width: "60%", padding: { left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' } },
                        this.$render("i-label", { id: "previewTxt", caption: "Content preview" }),
                        this.$render("i-vstack", { id: "preview", width: "100%" }))));
        }
    };
    GeneralContent = __decorate([
        components_2.customModule,
        components_2.customElements("i-section-general-content")
    ], GeneralContent);
    exports.default = GeneralContent;
});
