goog.provide('extracting_processes.core');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('promise_stream.pstream');
goog.require('jayq.core');
goog.require('promise_stream.sources');
goog.require('promise_stream.pstream');
goog.require('clojure.string');
goog.require('jayq.core');
goog.require('promise_stream.pstream');
extracting_processes.core.log = (function log(clj_value){
return console.log(cljs.core.clj__GT_js.call(null,clj_value));
});
extracting_processes.core.log_stream = (function log_stream(stream){
return promise_stream.pstream.mapd_STAR_.call(null,extracting_processes.core.log,stream);
});
extracting_processes.core.IHighlightable = {};
extracting_processes.core._highlight_BANG_ = (function _highlight_BANG_(list,n){
if((function (){var and__3941__auto__ = list;
if(and__3941__auto__)
{return list.extracting_processes$core$IHighlightable$_highlight_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return list.extracting_processes$core$IHighlightable$_highlight_BANG_$arity$2(list,n);
} else
{var x__2942__auto__ = (((list == null))?null:list);
return (function (){var or__3943__auto__ = (extracting_processes.core._highlight_BANG_[goog.typeOf(x__2942__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (extracting_processes.core._highlight_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IHighlightable.-highlight!",list);
}
}
})().call(null,list,n);
}
});
extracting_processes.core._unhighlight_BANG_ = (function _unhighlight_BANG_(list,n){
if((function (){var and__3941__auto__ = list;
if(and__3941__auto__)
{return list.extracting_processes$core$IHighlightable$_unhighlight_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return list.extracting_processes$core$IHighlightable$_unhighlight_BANG_$arity$2(list,n);
} else
{var x__2942__auto__ = (((list == null))?null:list);
return (function (){var or__3943__auto__ = (extracting_processes.core._unhighlight_BANG_[goog.typeOf(x__2942__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (extracting_processes.core._unhighlight_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"IHighlightable.-unhighlight!",list);
}
}
})().call(null,list,n);
}
});
extracting_processes.core.ISelectable = {};
extracting_processes.core._select_BANG_ = (function _select_BANG_(list,n){
if((function (){var and__3941__auto__ = list;
if(and__3941__auto__)
{return list.extracting_processes$core$ISelectable$_select_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return list.extracting_processes$core$ISelectable$_select_BANG_$arity$2(list,n);
} else
{var x__2942__auto__ = (((list == null))?null:list);
return (function (){var or__3943__auto__ = (extracting_processes.core._select_BANG_[goog.typeOf(x__2942__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (extracting_processes.core._select_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISelectable.-select!",list);
}
}
})().call(null,list,n);
}
});
extracting_processes.core._unselect_BANG_ = (function _unselect_BANG_(list,n){
if((function (){var and__3941__auto__ = list;
if(and__3941__auto__)
{return list.extracting_processes$core$ISelectable$_unselect_BANG_$arity$2;
} else
{return and__3941__auto__;
}
})())
{return list.extracting_processes$core$ISelectable$_unselect_BANG_$arity$2(list,n);
} else
{var x__2942__auto__ = (((list == null))?null:list);
return (function (){var or__3943__auto__ = (extracting_processes.core._unselect_BANG_[goog.typeOf(x__2942__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (extracting_processes.core._unselect_BANG_["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"ISelectable.-unselect!",list);
}
}
})().call(null,list,n);
}
});
extracting_processes.core.set_select_column = (function set_select_column(list,n,val){
if(cljs.core.truth_(n))
{return cljs.core.update_in.call(null,list,cljs.core.PersistentVector.fromArray([n], true),(function (p1__3524_SHARP_){
return clojure.string.replace.call(null,p1__3524_SHARP_,/^../,[cljs.core.str(" "),cljs.core.str(val)].join(''));
}));
} else
{return list;
}
});
extracting_processes.core.set_highlight_column = (function set_highlight_column(list,n,val){
return cljs.core.update_in.call(null,list,cljs.core.PersistentVector.fromArray([n], true),(function (p1__3525_SHARP_){
return clojure.string.replace.call(null,p1__3525_SHARP_,/^./,val);
}));
});
extracting_processes.core.set_char_BANG_ = (function set_char_BANG_(s,i,c){
return [cljs.core.str(s.substring(0,i)),cljs.core.str(c),cljs.core.str(s.substring((i + 1)))].join('');
});
(extracting_processes.core.ISelectable["array"] = true);
(extracting_processes.core._select_BANG_["array"] = (function (list,n){
extracting_processes.core.log.call(null,n);
extracting_processes.core.log.call(null,(list[n]));
(list[n] = extracting_processes.core.set_char_BANG_.call(null,(list[n]),1,"*"));
return list;
}));
(extracting_processes.core._unselect_BANG_["array"] = (function (list,n){
(list[n] = extracting_processes.core.set_char_BANG_.call(null,(list[n]),1," "));
return list;
}));
(extracting_processes.core.IHighlightable["array"] = true);
(extracting_processes.core._highlight_BANG_["array"] = (function (list,n){
(list[n] = extracting_processes.core.set_char_BANG_.call(null,(list[n]),0,">"));
return list;
}));
(extracting_processes.core._unhighlight_BANG_["array"] = (function (list,n){
(list[n] = extracting_processes.core.set_char_BANG_.call(null,(list[n]),0," "));
return list;
}));
HTMLUListElement.prototype.extracting_processes$core$ISelectable$ = true;
HTMLUListElement.prototype.extracting_processes$core$ISelectable$_select_BANG_$arity$2 = (function (list,n){
dom.add_class_BANG_.call(null,cljs.core.nth.call(null,dom.by_tag_name.call(null,list,"li"),n),"selected");
return list;
});
HTMLUListElement.prototype.extracting_processes$core$ISelectable$_unselect_BANG_$arity$2 = (function (list,n){
dom.remove_class_BANG_.call(null,cljs.core.nth.call(null,dom.by_tag_name.call(null,list,"li"),n),"selected");
return list;
});
HTMLUListElement.prototype.extracting_processes$core$IHighlightable$ = true;
HTMLUListElement.prototype.extracting_processes$core$IHighlightable$_highlight_BANG_$arity$2 = (function (list,n){
dom.add_class_BANG_.call(null,cljs.core.nth.call(null,dom.by_tag_name.call(null,list,"li"),n),"highlighted");
return list;
});
HTMLUListElement.prototype.extracting_processes$core$IHighlightable$_unhighlight_BANG_$arity$2 = (function (list,n){
dom.remove_class_BANG_.call(null,cljs.core.nth.call(null,dom.by_tag_name.call(null,list,"li"),n),"highlighted");
return list;
});
HTMLUListElement.prototype.cljs$core$ICounted$ = true;
HTMLUListElement.prototype.cljs$core$ICounted$_count$arity$1 = (function (list){
return cljs.core.count.call(null,dom.by_tag_name.call(null,list,"li"));
});
extracting_processes.core.keycode__GT_key = cljs.core.PersistentArrayMap.fromArray([38,"\uFDD0:up",40,"\uFDD0:down",74,"\uFDD0:j",75,"\uFDD0:k",13,"\uFDD0:enter"], true);
extracting_processes.core.key__GT_action = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:up","\uFDD0:highlight/previous","\uFDD0:down","\uFDD0:highlight/next","\uFDD0:j","\uFDD0:highlight/next","\uFDD0:k","\uFDD0:highlight/previous","\uFDD0:enter","\uFDD0:select/current"], true);
extracting_processes.core.highlight_actions = cljs.core.PersistentHashSet.fromArray(["\uFDD0:highlight/next",null,"\uFDD0:highlight/previous",null], true);
extracting_processes.core.select_actions = cljs.core.PersistentHashSet.fromArray(["\uFDD0:select/current",null], true);
extracting_processes.core.highlight_action__GT_offset = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:highlight/previous",cljs.core.dec,"\uFDD0:highlight/next",cljs.core.inc], true);
extracting_processes.core.ex0_ui = ["   Alan Kay","   J.C.R. Licklider","   John McCarthy"];
extracting_processes.core.ex1_ui = ["   Smalltalk","   Lisp","   Prolog","   ML"];
extracting_processes.core.first_state = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:highlight",0,"\uFDD0:selection",null], true);
/**
* Stores current highlight as selection when select events occur. Otherwise
* updates remembered highlight.
*/
extracting_processes.core.remember_selection = (function remember_selection(p__3526,event){
var map__3528 = p__3526;
var map__3528__$1 = ((cljs.core.seq_QMARK_.call(null,map__3528))?cljs.core.apply.call(null,cljs.core.hash_map,map__3528):map__3528);
var mem = map__3528__$1;
var selection = cljs.core.get.call(null,map__3528__$1,"\uFDD0:selection");
var highlight = cljs.core.get.call(null,map__3528__$1,"\uFDD0:highlight");
if(cljs.core._EQ_.call(null,event,"\uFDD0:select/current"))
{return cljs.core.assoc.call(null,mem,"\uFDD0:selection",highlight);
} else
{return cljs.core.assoc.call(null,mem,"\uFDD0:highlight",event);
}
});
extracting_processes.core.render_ui = (function render_ui(ui,p__3530){
var map__3532 = p__3530;
var map__3532__$1 = ((cljs.core.seq_QMARK_.call(null,map__3532))?cljs.core.apply.call(null,cljs.core.hash_map,map__3532):map__3532);
var selection = cljs.core.get.call(null,map__3532__$1,"\uFDD0:selection");
var highlight = cljs.core.get.call(null,map__3532__$1,"\uFDD0:highlight");
if(cljs.core.truth_(selection))
{extracting_processes.core._select_BANG_.call(null,ui,selection);
} else
{}
extracting_processes.core._highlight_BANG_.call(null,ui,highlight);
return clojure.string.join.call(null,"\n",ui);
});
extracting_processes.core.identify_key_actions = (function identify_key_actions(keydowns){
return promise_stream.pstream.mapd_STAR_.call(null,extracting_processes.core.key__GT_action,promise_stream.pstream.filter_STAR_.call(null,cljs.core.comp.call(null,promise_stream.pstream.promise,cljs.core.identity),promise_stream.pstream.mapd_STAR_.call(null,extracting_processes.core.keycode__GT_key,promise_stream.pstream.mapd_STAR_.call(null,(function (p1__3529_SHARP_){
return (p1__3529_SHARP_["which"]);
}),keydowns))));
});
extracting_processes.core.mouseover__GT_highlight = (function mouseover__GT_highlight(mouseover){
return jayq.core.$.call(null,mouseover.target).index();
});
extracting_processes.core.load_example = (function load_example(ui){
var wrap_at = cljs.core.count.call(null,ui);
var keydowns = promise_stream.sources.callback__GT_promise_stream.call(null,jayq.core.on,jayq.core.$.call(null,"div"),"keydown");
var mouseovers = promise_stream.sources.callback__GT_promise_stream.call(null,jayq.core.on,jayq.core.$.call(null,"li"),"mouseover");
var mouseouts = promise_stream.sources.callback__GT_promise_stream.call(null,jayq.core.on,jayq.core.$.call(null,"ul"),"mouseout");
var clicks = promise_stream.sources.callback__GT_promise_stream.call(null,jayq.core.on,jayq.core.$.call(null,"li"),"click");
var key_actions = extracting_processes.core.identify_key_actions.call(null,keydowns);
var key_selects = promise_stream.pstream.filter_STAR_.call(null,cljs.core.comp.call(null,promise_stream.pstream.promise,extracting_processes.core.select_actions),key_actions);
var mouse_selects = promise_stream.pstream.mapd_STAR_.call(null,cljs.core.constantly.call(null,"\uFDD0:select"),clicks);
var selects = promise_stream.pstream.concat_STAR_.call(null,key_selects,mouse_selects);
var highlight_moves = promise_stream.pstream.filter_STAR_.call(null,cljs.core.comp.call(null,promise_stream.pstream.promise,extracting_processes.core.highlight_actions),key_actions);
var mouse_highlight_indexes = promise_stream.pstream.mapd_STAR_.call(null,extracting_processes.core.mouseover__GT_highlight,mouseovers);
var clears = promise_stream.pstream.mapd_STAR_.call(null,cljs.core.constantly.call(null,"\uFDD0:clear"),mouseouts);
var highlight_index_offsets = promise_stream.pstream.mapd_STAR_.call(null,extracting_processes.core.highlight_action__GT_offset,highlight_moves);
var highlight_index_resets = promise_stream.pstream.mapd_STAR_.call(null,cljs.core.constantly,mouse_highlight_indexes);
var highlight_modifyers = promise_stream.pstream.concat_STAR_.call(null,highlight_index_offsets,highlight_index_resets);
var raw_highlight_indexes = promise_stream.pstream.reductions_STAR_.call(null,promise_stream.pstream.fmap.call(null,((function (wrap_at,keydowns,mouseovers,mouseouts,clicks,key_actions,key_selects,mouse_selects,selects,highlight_moves,mouse_highlight_indexes,clears,highlight_index_offsets,highlight_index_resets,highlight_modifyers){
return (function (v,f){
return f.call(null,v);
});})(wrap_at,keydowns,mouseovers,mouseouts,clicks,key_actions,key_selects,mouse_selects,selects,highlight_moves,mouse_highlight_indexes,clears,highlight_index_offsets,highlight_index_resets,highlight_modifyers))
),promise_stream.pstream.promise.call(null,0),highlight_modifyers);
var wrapped_highlight_indexes = promise_stream.pstream.mapd_STAR_.call(null,((function (wrap_at,keydowns,mouseovers,mouseouts,clicks,key_actions,key_selects,mouse_selects,selects,highlight_moves,mouse_highlight_indexes,clears,highlight_index_offsets,highlight_index_resets,highlight_modifyers,raw_highlight_indexes){
return (function (p1__3533_SHARP_){
return cljs.core.mod.call(null,p1__3533_SHARP_,wrap_at);
});})(wrap_at,keydowns,mouseovers,mouseouts,clicks,key_actions,key_selects,mouse_selects,selects,highlight_moves,mouse_highlight_indexes,clears,highlight_index_offsets,highlight_index_resets,highlight_modifyers,raw_highlight_indexes))
,raw_highlight_indexes);
var highlights_and_selects = promise_stream.pstream.concat_STAR_.call(null,wrapped_highlight_indexes,selects);
var ui_states = promise_stream.pstream.reductions_STAR_.call(null,promise_stream.pstream.fmap.call(null,extracting_processes.core.remember_selection),promise_stream.pstream.promise.call(null,extracting_processes.core.first_state),highlights_and_selects);
var uis = promise_stream.pstream.mapd_STAR_.call(null,cljs.core.partial.call(null,extracting_processes.core.render_ui,ui),ui_states);
extracting_processes.core.log_stream.call(null,ui_states);
return uis;
});
promise_stream.pstream.mapd_STAR_.call(null,(function (p1__3534_SHARP_){
return jayq.core.text.call(null,jayq.core.$.call(null,"#ex0"),p1__3534_SHARP_);
}),extracting_processes.core.load_example.call(null,extracting_processes.core.ex0_ui));
jayq.core.text.call(null,jayq.core.$.call(null,"#ex0"),clojure.string.join.call(null,"\n",extracting_processes.core.ex0_ui));
extracting_processes.core.log.call(null,extracting_processes.core._highlight_BANG_.call(null,extracting_processes.core._highlight_BANG_.call(null,extracting_processes.core.ex0_ui,1),0));
