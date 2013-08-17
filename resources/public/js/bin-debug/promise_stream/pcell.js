goog.provide('promise_stream.pcell');
goog.require('cljs.core');
goog.require('jayq.core');
promise_stream.pcell.deferred = (function deferred(value){
return jayq.core.resolve.call(null,jayq.core.$deferred.call(null),value);
});
goog.provide('promise_stream.pcell.PCell');

/**
* @constructor
*/
promise_stream.pcell.PCell = (function (deferred_wrapping_cell){
this.deferred_wrapping_cell = deferred_wrapping_cell;
})
promise_stream.pcell.PCell.cljs$lang$type = true;
promise_stream.pcell.PCell.cljs$lang$ctorStr = "promise-stream.pcell/PCell";
promise_stream.pcell.PCell.cljs$lang$ctorPrWriter = (function (this__2885__auto__,writer__2886__auto__,opts__2887__auto__){
return cljs.core._write.call(null,writer__2886__auto__,"promise-stream.pcell/PCell");
});
promise_stream.pcell.closed_container = (function closed_container(v){
return (new promise_stream.pcell.PCell(promise_stream.pcell.deferred.call(null,v)));
});
promise_stream.pcell.open_container = (function open_container(){
return (new promise_stream.pcell.PCell(jayq.core.$deferred.call(null)));
});
promise_stream.pcell.empty_cell = (function empty_cell(){
return promise_stream.pcell.closed_container.call(null,null);
});
promise_stream.pcell.open_cell = (function open_cell(v){
return promise_stream.pcell.closed_container.call(null,cljs.core.cons.call(null,v,promise_stream.pcell.open_container.call(null)));
});
promise_stream.pcell.closed_cell = (function closed_cell(v1,v2){
return promise_stream.pcell.closed_container.call(null,cljs.core.cons.call(null,v1,v2));
});
promise_stream.pcell.done = (function done(pcell,callback){
return jayq.core.done.call(null,pcell.deferred_wrapping_cell,callback);
});
promise_stream.pcell.resolve = (function resolve(pcell,value){
return jayq.core.resolve.call(null,pcell.deferred_wrapping_cell,value);
});
promise_stream.pcell.PCell.prototype.cljs$core$ISeqable$ = true;
promise_stream.pcell.PCell.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
return this$;
});
promise_stream.pcell.PCell.prototype.cljs$core$ISeq$ = true;
promise_stream.pcell.PCell.prototype.cljs$core$ISeq$_first$arity$1 = (function (pcell){
var first_deferred = jayq.core.$deferred.call(null);
promise_stream.pcell.done.call(null,pcell,(function (cell){
return jayq.core.resolve.call(null,first_deferred,cljs.core.first.call(null,cell));
}));
return jayq.core.promise.call(null,first_deferred);
});
promise_stream.pcell.PCell.prototype.cljs$core$ISeq$_rest$arity$1 = (function (pcell){
var rest_deferred = jayq.core.$deferred.call(null);
promise_stream.pcell.done.call(null,pcell,(function (cell){
var tail = cljs.core.rest.call(null,cell);
if(cljs.core.empty_QMARK_.call(null,tail))
{return jayq.core.resolve.call(null,rest_deferred,null);
} else
{return promise_stream.pcell.done.call(null,cljs.core.rest.call(null,cell),(function (rest_cell){
return jayq.core.resolve.call(null,rest_deferred,rest_cell);
}));
}
}));
return (new promise_stream.pcell.PCell(rest_deferred));
});
promise_stream.pcell.dapply = (function dapply(f){
return (function() {
var G__3551 = null;
var G__3551__0 = (function (){
return promise_stream.pcell.deferred.call(null,f.call(null));
});
var G__3551__1 = (function (d){
var new_d = jayq.core.$deferred.call(null);
jayq.core.done.call(null,d,(function (v){
return jayq.core.resolve.call(null,new_d,f.call(null,v));
}));
return new_d;
});
var G__3551__2 = (function (d1,d2){
var new_d = jayq.core.$deferred.call(null);
jayq.core.done.call(null,d1,(function (v1){
return jayq.core.done.call(null,d2,(function (v2){
return jayq.core.resolve.call(null,new_d,f.call(null,v1,v2));
}));
}));
return new_d;
});
G__3551 = function(d1,d2){
switch(arguments.length){
case 0:
return G__3551__0.call(this);
case 1:
return G__3551__1.call(this,d1);
case 2:
return G__3551__2.call(this,d1,d2);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
return G__3551;
})()
});
