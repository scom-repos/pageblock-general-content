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
            '.changePageBtn:hover': {
                backgroundColor: 'black'
            },
            '.removeImg': {
                visibility: 'visible',
                zIndex: 10
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
            this.tag = {};
            this.defaultEdit = true;
        }
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
            this.viewPage.visible = false;
            this.editPage.width = "70%";
            this.viewPage.width = "30%";
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
        }
        addButtons() {
        }
        setTitle() {
        }
        render() {
            return this.$render("i-panel", { width: "100%" },
                this.$render("i-hstack", { width: "100%" },
                    this.$render("i-panel", { id: "editPage", width: "30%" },
                        this.$render("i-label", { caption: "Content page setting" }),
                        this.$render("i-vstack", { id: "titleSetting", width: "100%" },
                            this.$render("i-label", { caption: "Title" }),
                            this.$render("i-input", { id: 'titleInput', inputType: "textarea", placeholder: "Input the title here", width: '100%', onChanged: this.setTitle })),
                        this.$render("i-vstack", { id: "contentSetting", width: "100%" },
                            this.$render("i-label", { caption: "Content" }),
                            this.$render("i-hstack", { width: "100%", justifyContent: 'space-between' },
                                this.$render("i-button", { caption: "Add a paragragh", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addParagraph }),
                                this.$render("i-button", { caption: "Add buttons", padding: { left: '10px', top: '5px', right: '10px', bottom: '5px' }, onClick: this.addButtons })))),
                    this.$render("i-panel", { id: "viewPage", width: "70%" },
                        this.$render("i-label", { caption: "Content preview" }))));
        }
    };
    GeneralContent = __decorate([
        components_2.customModule,
        components_2.customElements("i-section-general-content")
    ], GeneralContent);
    exports.default = GeneralContent;
});
