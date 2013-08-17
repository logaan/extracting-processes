goog.provide('promise_stream.sources');
goog.require('cljs.core');
goog.require('promise_stream.pcell');
goog.require('promise_stream.pstream');
goog.require('jayq.core');
goog.require('promise_stream.pstream');
goog.require('promise_stream.pcell');
goog.require('jayq.core');
promise_stream.sources.timestamp = (function timestamp(){
return (new Date()).valueOf();
});
promise_stream.sources.metranome = (function metranome(interval){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return window.setInterval((function (){
return promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pcell.deferred.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:time",promise_stream.sources.timestamp.call(null)], true)));
}),interval);
}));
});
promise_stream.sources.event_stream = (function event_stream(element,event_type){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return jayq.core.on.call(null,element,event_type,(function (event){
event.preventDefault();
return promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pcell.deferred.call(null,event));
}));
}));
});
/**
* @param {...*} var_args
*/
promise_stream.sources.callback__GT_promise_stream = (function() { 
var callback__GT_promise_stream__delegate = function (f,args){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return cljs.core.apply.call(null,f,cljs.core.concat.call(null,args,cljs.core.list.call(null,(function (v){
return promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pcell.deferred.call(null,v));
}))));
}));
};
var callback__GT_promise_stream = function (f,var_args){
var args = null;
if (arguments.length > 1) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return callback__GT_promise_stream__delegate.call(this, f, args);
};
callback__GT_promise_stream.cljs$lang$maxFixedArity = 1;
callback__GT_promise_stream.cljs$lang$applyTo = (function (arglist__4400){
var f = cljs.core.first(arglist__4400);
var args = cljs.core.rest(arglist__4400);
return callback__GT_promise_stream__delegate(f, args);
});
callback__GT_promise_stream.cljs$core$IFn$_invoke$arity$variadic = callback__GT_promise_stream__delegate;
return callback__GT_promise_stream;
})()
;
