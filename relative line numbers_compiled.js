if(!lt.util.load.provided_QMARK_('lt.plugins.relativelinenumbers')) {
goog.provide('lt.plugins.relativelinenumbers');
goog.require('cljs.core');
goog.require('lt.objs.command');
goog.require('lt.objs.command');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor.pool');
goog.require('lt.objs.editor');
goog.require('lt.objs.editor');
goog.require('lt.object');
goog.require('lt.object');
lt.object.object_STAR_.call(null,new cljs.core.Keyword("lt.plugins.relativelinenumbers","preferences","lt.plugins.relativelinenumbers/preferences",784426473),new cljs.core.Keyword(null,"show-current-line","show-current-line",1376606218),true,new cljs.core.Keyword(null,"show-insert-mode","show-insert-mode",830189785),true);
lt.plugins.relativelinenumbers.preferences = lt.object.create.call(null,new cljs.core.Keyword("lt.plugins.relativelinenumbers","preferences","lt.plugins.relativelinenumbers/preferences",784426473));
lt.plugins.relativelinenumbers.state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"pos","pos",1014015430),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"line","line",1017226086),0,new cljs.core.Keyword(null,"ch","ch",1013907415),0], null),new cljs.core.Keyword(null,"first-line-number","first-line-number",2408303383),1,new cljs.core.Keyword(null,"current-formatter","current-formatter",1523482856),new cljs.core.Keyword(null,"relative","relative",4754435646)], null));
/**
* Convert absolute line number to number relative to current line.
*/
lt.plugins.relativelinenumbers.line__GT_relative_line = (function line__GT_relative_line(l){var first_line = new cljs.core.Keyword(null,"first-line-number","first-line-number",2408303383).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state));var cur = (new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"pos","pos",1014015430).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state))) + first_line);if(cljs.core.truth_((function (){var and__6359__auto__ = cljs.core._EQ_.call(null,cur,l);if(and__6359__auto__)
{return new cljs.core.Keyword(null,"show-current-line","show-current-line",1376606218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.preferences));
} else
{return and__6359__auto__;
}
})()))
{return l;
} else
{return Math.abs((cur - l));
}
});
/**
* Set current formatter used (:relative or :default)
*/
lt.plugins.relativelinenumbers.set_formatter_BANG_ = (function set_formatter_BANG_(k){var ed = lt.objs.editor.pool.last_active.call(null);cljs.core.swap_BANG_.call(null,lt.plugins.relativelinenumbers.state,cljs.core.assoc,new cljs.core.Keyword(null,"current-formatter","current-formatter",1523482856),k);
return lt.objs.editor.__GT_cm_ed.call(null,ed).refresh();
});
/**
* Set appropriate formatter when VIM mode changes. When :show-current-line
* preference is true will show absolute line numbers in insert mode.
*/
lt.plugins.relativelinenumbers.vim_mode_change = (function vim_mode_change(p){if(cljs.core.truth_(new cljs.core.Keyword(null,"show-insert-mode","show-insert-mode",830189785).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.preferences))))
{var mode = p.mode;var ed = lt.objs.editor.pool.last_active.call(null);if(cljs.core._EQ_.call(null,mode,"insert"))
{return lt.plugins.relativelinenumbers.set_formatter_BANG_.call(null,new cljs.core.Keyword(null,"default","default",2558708147));
} else
{return lt.plugins.relativelinenumbers.set_formatter_BANG_.call(null,new cljs.core.Keyword(null,"relative","relative",4754435646));
}
} else
{return null;
}
});
/**
* Format a line based on current formatter
*/
lt.plugins.relativelinenumbers.line_formatter = (function line_formatter(line){if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"current-formatter","current-formatter",1523482856).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state)),new cljs.core.Keyword(null,"relative","relative",4754435646)))
{return lt.plugins.relativelinenumbers.line__GT_relative_line.call(null,line);
} else
{return new cljs.core.Keyword(null,"default-formatter","default-formatter",891568048).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state)).call(null,line);
}
});
lt.plugins.relativelinenumbers.__BEH__activate = (function __BEH__activate(this$){var cm = lt.objs.editor.__GT_cm_ed.call(null,this$);cljs.core.swap_BANG_.call(null,lt.plugins.relativelinenumbers.state,cljs.core.assoc,new cljs.core.Keyword(null,"first-line-number","first-line-number",2408303383),lt.objs.editor.option.call(null,this$,"firstLineNumber"));
cljs.core.swap_BANG_.call(null,lt.plugins.relativelinenumbers.state,cljs.core.assoc,new cljs.core.Keyword(null,"default-formatter","default-formatter",891568048),lt.objs.editor.option.call(null,this$,"lineNumberFormatter"));
lt.objs.editor.on.call(null,this$,"vim-mode-change",lt.plugins.relativelinenumbers.vim_mode_change);
return lt.objs.editor.set_options.call(null,this$,new cljs.core.PersistentArrayMap(null, 1, ["lineNumberFormatter",lt.plugins.relativelinenumbers.line_formatter], null));
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.relativelinenumbers","activate","lt.plugins.relativelinenumbers/activate",2519752688),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.relativelinenumbers.__BEH__activate,new cljs.core.Keyword(null,"desc","desc",1016984067),"Relative Line Numbers: Activate",new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"init","init",1017141378),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549));
lt.plugins.relativelinenumbers.__BEH__relative_linenumber_settings = (function __BEH__relative_linenumber_settings(this$,show_current_line,show_insert_mode){var final$ = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"show-current-line","show-current-line",1376606218),show_current_line], null);var final$__$1 = ((!((show_insert_mode == null)))?cljs.core.assoc.call(null,final$,new cljs.core.Keyword(null,"show-insert-mode","show-insert-mode",830189785),show_insert_mode):final$);return lt.object.merge_BANG_.call(null,lt.plugins.relativelinenumbers.preferences,final$__$1);
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.relativelinenumbers","relative-linenumber-settings","lt.plugins.relativelinenumbers/relative-linenumber-settings",1318634415),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.relativelinenumbers.__BEH__relative_linenumber_settings,new cljs.core.Keyword(null,"desc","desc",1016984067),"Editor: Relative line number settings",new cljs.core.Keyword(null,"params","params",4313443576),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Show current line?",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"bool","bool",1016933980)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"label","label",1116631654),"Show line numbers in insert mode",new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"bool","bool",1016933980)], null)], null),new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"object.instant","object.instant",773332388),null], null), null),new cljs.core.Keyword(null,"type","type",1017479852),new cljs.core.Keyword(null,"user","user",1017503549),new cljs.core.Keyword(null,"exclusive","exclusive",2700522000),true);
lt.objs.command.command.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"command","command",1964298941),new cljs.core.Keyword(null,"relativelinenumbers.toggle","relativelinenumbers.toggle",3286897578),new cljs.core.Keyword(null,"desc","desc",1016984067),"Relative Line Numbers: Toggle",new cljs.core.Keyword(null,"exec","exec",1017031683),(function (){var ed = lt.objs.editor.pool.last_active.call(null);var current_formatter = new cljs.core.Keyword(null,"current-formatter","current-formatter",1523482856).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state));if(cljs.core._EQ_.call(null,current_formatter,new cljs.core.Keyword(null,"relative","relative",4754435646)))
{return lt.plugins.relativelinenumbers.set_formatter_BANG_.call(null,new cljs.core.Keyword(null,"default","default",2558708147));
} else
{return lt.plugins.relativelinenumbers.set_formatter_BANG_.call(null,new cljs.core.Keyword(null,"relative","relative",4754435646));
}
})], null));
lt.plugins.relativelinenumbers.__BEH__update_line_numbers = (function __BEH__update_line_numbers(this$){var last_line = new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"pos","pos",1014015430).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state)));cljs.core.swap_BANG_.call(null,lt.plugins.relativelinenumbers.state,cljs.core.assoc,new cljs.core.Keyword(null,"pos","pos",1014015430),lt.objs.editor.__GT_cursor.call(null,this$));
if(cljs.core.not_EQ_.call(null,last_line,new cljs.core.Keyword(null,"line","line",1017226086).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"pos","pos",1014015430).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,lt.plugins.relativelinenumbers.state)))))
{var G__7877 = lt.objs.editor.__GT_cm_ed.call(null,this$);G__7877.refresh();
G__7877.scrollIntoView();
return G__7877;
} else
{return null;
}
});
lt.object.behavior_STAR_.call(null,new cljs.core.Keyword("lt.plugins.relativelinenumbers","update-line-numbers","lt.plugins.relativelinenumbers/update-line-numbers",1150332654),new cljs.core.Keyword(null,"reaction","reaction",4441361819),lt.plugins.relativelinenumbers.__BEH__update_line_numbers,new cljs.core.Keyword(null,"triggers","triggers",2516997421),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"move","move",1017261891),null,new cljs.core.Keyword(null,"active","active",3885920888),null], null), null));
}

//# sourceMappingURL=relative line numbers_compiled.js.map