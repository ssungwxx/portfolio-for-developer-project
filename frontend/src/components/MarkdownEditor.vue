<template>
    <div>
        <div class="markdown">
            <div class="flex">
                <div class="v-input v-text-field theme--light">
                    <div class="v-input__control">
                        <div class="v-input__slot">
                            <div class="v-text-field__slot"><label aria-hidden="true" class="v-label theme--light"
                                                                   style="left: 0px; right: auto; position: absolute;">title</label><input
                                    aria-label="title" type="text"></div>
                        </div>
                        <div class="v-text-field__details">
                            <div class="v-messages theme--light">
                                <div class="v-messages__wrapper"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="markdown-editor"><textarea style="display: none;"></textarea>
                <div class="editor-toolbar"><a title="Bold (Ctrl-B)" tabindex="-1" class="fa fa-bold"></a><a
                        title="Italic (Ctrl-I)" tabindex="-1" class="fa fa-italic"></a><a title="Heading (Ctrl-H)"
                                                                                          tabindex="-1"
                                                                                          class="fa fa-header"></a><i
                        class="separator">|</i><a title="Quote (Ctrl-')" tabindex="-1" class="fa fa-quote-left"></a><a
                        title="Generic List (Ctrl-L)" tabindex="-1" class="fa fa-list-ul"></a><a
                        title="Numbered List (Ctrl-Alt-L)" tabindex="-1" class="fa fa-list-ol"></a><i class="separator">|</i><a
                        title="Create Link (Ctrl-K)" tabindex="-1" class="fa fa-link"></a><a
                        title="Insert Image (Ctrl-Alt-I)" tabindex="-1" class="fa fa-picture-o"></a><i
                        class="separator">|</i><a title="Toggle Preview (Ctrl-P)" tabindex="-1"
                                                  class="fa fa-eye no-disable"></a><a title="Toggle Side by Side (F9)"
                                                                                      tabindex="-1"
                                                                                      class="fa fa-columns no-disable no-mobile"></a><a
                        title="Toggle Fullscreen (F11)" tabindex="-1" class="fa fa-arrows-alt no-disable no-mobile"></a><i
                        class="separator">|</i><a title="Markdown Guide" tabindex="-1" class="fa fa-question-circle"
                                                  href="https://simplemde.com/markdown-guide" target="_blank"></a></div>
                <div class="CodeMirror cm-s-paper CodeMirror-wrap">
                    <div style="overflow: hidden; position: relative; width: 3px; height: 0px; top: 15px; left: 283px;">
                        <textarea autocorrect="off" autocapitalize="off" spellcheck="false"
                                  style="position: absolute; bottom: -1em; padding: 0px; width: 1000px; height: 1em; outline: none;"
                                  tabindex="0"></textarea></div>
                    <div class="CodeMirror-vscrollbar" tabindex="-1" cm-not-content="true">
                        <div style="min-width: 1px; height: 0px;"></div>
                    </div>
                    <div class="CodeMirror-hscrollbar" tabindex="-1" cm-not-content="true">
                        <div style="height: 100%; min-height: 1px; width: 0px;"></div>
                    </div>
                    <div class="CodeMirror-scrollbar-filler" cm-not-content="true"></div>
                    <div class="CodeMirror-gutter-filler" cm-not-content="true"></div>
                    <div class="CodeMirror-scroll" tabindex="-1">
                        <div class="CodeMirror-sizer"
                             style="margin-left: 0px; margin-bottom: -17px; border-right-width: 13px; min-height: 29px; padding-right: 0px; padding-bottom: 0px;">
                            <div style="position: relative; top: 0px;">
                                <div class="CodeMirror-lines" role="presentation">
                                    <div role="presentation" style="position: relative; outline: none;">
                                        <div class="CodeMirror-measure"></div>
                                        <div class="CodeMirror-measure"></div>
                                        <div style="position: relative; z-index: 1;"></div>
                                        <div class="CodeMirror-cursors">
                                            <div class="CodeMirror-cursor" style="left: 272px; top: 0px; height: 21px;">
                                                &nbsp;
                                            </div>
                                        </div>
                                        <div class="CodeMirror-code" role="presentation" style="text-rendering: auto;">
                                            <pre class=" CodeMirror-line " role="presentation"><span role="presentation"
                                                                                                     style="padding-right: 0.1px;"><span
                                                    cm-text="">&#8203;</span></span></pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="position: absolute; height: 13px; width: 1px; border-bottom: 0px solid transparent; top: 29px;"></div>
                        <div class="CodeMirror-gutters" style="display: none; height: 42px;"></div>
                    </div>
                    <div class="editor-preview "></div>
                </div>
                <div class="editor-preview-side "></div>
                <div class="editor-statusbar"><span class="autosave"></span><span class="lines">1</span><span
                        class="words">0</span><span class="cursor">0:0</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MarkdownEditor",
        data() {
            return {

            }
        },

    }
</script>

<style>

</style>