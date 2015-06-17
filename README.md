LightTable plugin for displaying relative line numbers similiar to VIM.

###Installation
0. Make sure you have `[:editor :lt.objs.editor/line-numbers]` in your user behaviours (which is accessible through the command menu as "Settings: User behaviors".) This is how you turn line numbers on in Light Table.
0. By default will display current line (rather than 0) and will display line numbers in insert mode. Set :lt.plugins.relativelinenumbers/relative-linenumber-settings behaviour to modify these defaults.
0. Install the latest release of the plugin manually. (LT's plugin manager only offers the option of installing the previous version, which does not include an important bug fix.) On Linux, this means putting the extracted plugin files in `~/.config/LightTable/plugins`.
0. Restart LT.
