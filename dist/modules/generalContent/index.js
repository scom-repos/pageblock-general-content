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
        $nest: {}
    });
});
define("@modules/general-content", ["require", "exports", "@ijstech/components", "@modules/general-content/generalContent.css.ts"], function (require, exports, components_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let GeneralContent = class GeneralContent extends components_2.Module {
        constructor() {
            super(...arguments);
            this.alignmentChoices = [
                { value: "start", label: "left" }, { value: "end", label: "right" }, { value: "center", label: "center" }
            ];
            this.tag = {};
            this.defaultEdit = true;
        }
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
            };
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
        addParagraph() {
            this.tempData.contentList.push({
                content: {
                    paraContent: '',
                    paraFontsize: '15px',
                    paraFontColor: '#000000',
                    paraAlignment: 'start'
                },
                type: "paragraph"
            });
        }
        addButtons() {
            this.tempData.contentList.push({
                content: {
                    btnTxt: 'More',
                    btnTxtColor: '#000000',
                    btnTxtFontSize: '13',
                    btnBGColor: "#ff6600",
                    btnAlignment: "center"
                },
                type: "button"
            });
        }
        handleTitleCaptionChange() {
            this.tempData.title.titleContent = this.titleInput.value;
            this.renderUI();
        }
        handleTitleColorChange() {
            this.tempData.title.titleFontColor = this.titleColorPicker.value;
            this.renderUI();
        }
        handleTitleAlignmentChange() {
            this.tempData.title.titleAlignment = this.titleAlignmentPicker.value;
            this.renderUI();
        }
        handleTitleFontSizeChange() {
            this.tempData.title.titleFontsize = this.titleFontSizeInput.value + 'px';
            this.renderUI();
        }
        renderUI() {
            this.preview.clearInnerHTML();
            // render title
            this.preview.append(this.$render("i-hstack", { width: "100%", horizontalAlignment: this.tempData.title.titleAlignment },
                this.$render("i-label", { font: { size: this.tempData.title.titleFontsize, color: this.tempData.title.titleFontColor }, caption: this.tempData.title.titleContent })));
            // render content
            for (let i = 0; i < this.tempData.contentList.length; i++) {
                if (this.tempData.contentList[i].type == "paragraph") {
                    this.preview.append(this.$render("i-hstack", { width: "100%", horizontalAlignment: this.tempData.contentList[i].content.paraAlignment },
                        this.$render("i-label", { font: { size: this.tempData.title.titleFontsize, color: this.tempData.title.titleFontColor }, caption: this.tempData.title.titleContent, wordBreak: "break-all", overflowWrap: "break-word" })));
                }
                else if (this.tempData.contentList[i].type == "button") {
                    let btnData = this.tempData.contentList[i].content;
                    this.preview.append(this.$render("i-hstack", { width: "100%", horizontalAlignment: btnData.btnAlignment },
                        this.$render("i-button", { padding: { left: '1.5rem', right: '1.5rem', top: '1rem', bottom: '1rem' }, caption: btnData.btnTxt, font: { color: btnData.btnTxtColor, size: btnData.btnTxtFontSize }, background: { color: btnData.btnBGColor } })));
                }
                else {
                    console.log("Content type does not exist");
                }
            }
        }
        render() {
            return this.$render("i-panel", { id: "mainPnl", width: "100%" },
                this.$render("i-hstack", { width: "100%" },
                    this.$render("i-panel", { id: "editPage", width: "40%", padding: { left: '2rem', top: '2rem', right: '2rem', bottom: '2rem' } },
                        this.$render("i-label", { caption: "Content page setting" }),
                        this.$render("i-vstack", { id: "titleSetting", width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Title" }),
                            this.$render("i-hstack", { width: "100%" },
                                this.$render("i-label", { caption: "Color" }),
                                this.$render("i-input", { id: "titleColorPicker", inputType: 'color', onChanged: this.handleTitleColorChange })),
                            this.$render("i-hstack", { width: "100%" },
                                this.$render("i-label", { caption: "Alignment" }),
                                this.$render("i-input", { id: "titleAlignmentPicker", items: this.alignmentChoices, inputType: "combobox", onChanged: this.handleTitleAlignmentChange })),
                            this.$render("i-hstack", { width: "100%" },
                                this.$render("i-label", { caption: "Font size" }),
                                this.$render("i-input", { id: "titleFontSizeInput", inputType: "number", onChanged: this.handleTitleFontSizeChange })),
                            this.$render("i-label", { caption: "Caption" }),
                            this.$render("i-input", { id: 'titleInput', inputType: "textarea", placeholder: "Input the title here", width: '100%', height: "200px", onChanged: this.handleTitleCaptionChange })),
                        this.$render("i-vstack", { id: "contentSetting", width: "100%", gap: "10px" },
                            this.$render("i-label", { caption: "Content" }),
                            this.$render("i-panel", { id: "content", width: "100%" }),
                            this.$render("i-hstack", { width: "100%", justifyContent: 'center', gap: "20px" },
                                this.$render("i-button", { caption: "Add a paragragh", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addParagraph }),
                                this.$render("i-button", { caption: "Add button", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addButtons })))),
                    this.$render("i-panel", { id: "viewPage", width: "60%" },
                        this.$render("i-label", { caption: "Content preview" }),
                        this.$render("i-vstack", { id: "preview", width: "100%" }))));
        }
    };
    GeneralContent = __decorate([
        components_2.customModule,
        components_2.customElements("i-section-general-content")
    ], GeneralContent);
    exports.default = GeneralContent;
});
