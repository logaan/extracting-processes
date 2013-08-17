goog.provide('promise_stream.pstream');
goog.require('cljs.core');
goog.require('jayq.core');
goog.require('promise_stream.pcell');
promise_stream.pstream.promise = promise_stream.pcell.deferred;
promise_stream.pstream.fmap = promise_stream.pcell.dapply;
/**
* Returns a read only promise stream containing args. Mapping directly over a
* closed pstream will cause a stack overflow if it contains more than 1k values.
* @param {...*} var_args
*/
promise_stream.pstream.closed_pstream = (function() { 
var closed_pstream__delegate = function (args){
return cljs.core.reduce.call(null,(function (p1__3536_SHARP_,p2__3535_SHARP_){
return promise_stream.pcell.closed_cell.call(null,p2__3535_SHARP_,p1__3536_SHARP_);
}),promise_stream.pcell.empty_cell.call(null),cljs.core.reverse.call(null,args));
};
var closed_pstream = function (var_args){
var args = null;
if (arguments.length > 0) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return closed_pstream__delegate.call(this, args);
};
closed_pstream.cljs$lang$maxFixedArity = 0;
closed_pstream.cljs$lang$applyTo = (function (arglist__3537){
var args = cljs.core.seq(arglist__3537);
return closed_pstream__delegate(args);
});
closed_pstream.cljs$core$IFn$_invoke$arity$variadic = closed_pstream__delegate;
return closed_pstream;
})()
;
/**
* Not intended to be used directly. Instead use IReduce's -reduce.
*/
promise_stream.pstream.reduce_STAR_ = (function reduce_STAR_(deferred,coll,f,daccumulator){
var dresult = f.call(null,daccumulator,cljs.core.first.call(null,coll));
var dtail = cljs.core.rest.call(null,coll);
return promise_stream.pcell.done.call(null,dtail,(function (tail){
if(cljs.core.empty_QMARK_.call(null,tail))
{return jayq.core.done.call(null,dresult,(function (result){
return jayq.core.resolve.call(null,deferred,result);
}));
} else
{return reduce_STAR_.call(null,deferred,dtail,f,dresult);
}
}));
});
promise_stream.pcell.PCell.prototype.cljs$core$IReduce$ = true;
promise_stream.pcell.PCell.prototype.cljs$core$IReduce$_reduce$arity$2 = (function (coll,f){
return cljs.core._reduce.call(null,cljs.core.rest.call(null,coll),f,cljs.core.first.call(null,coll));
});
promise_stream.pcell.PCell.prototype.cljs$core$IReduce$_reduce$arity$3 = (function (coll,f,start){
var response = jayq.core.$deferred.call(null);
promise_stream.pstream.reduce_STAR_.call(null,response,coll,f,start);
return response;
});
/**
* @param {...*} var_args
*/
promise_stream.pstream.open_pstream = (function() { 
var open_pstream__delegate = function (values){
var tail = promise_stream.pcell.open_container.call(null);
var pstream = cljs.core.reduce.call(null,((function (tail){
return (function (p1__3539_SHARP_,p2__3538_SHARP_){
return promise_stream.pcell.closed_cell.call(null,p2__3538_SHARP_,p1__3539_SHARP_);
});})(tail))
,tail,values);
return cljs.core.list.call(null,pstream,cljs.core.atom.call(null,tail));
};
var open_pstream = function (var_args){
var values = null;
if (arguments.length > 0) {
  values = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return open_pstream__delegate.call(this, values);
};
open_pstream.cljs$lang$maxFixedArity = 0;
open_pstream.cljs$lang$applyTo = (function (arglist__3540){
var values = cljs.core.seq(arglist__3540);
return open_pstream__delegate(values);
});
open_pstream.cljs$core$IFn$_invoke$arity$variadic = open_pstream__delegate;
return open_pstream;
})()
;
promise_stream.pstream.append_BANG_ = (function append_BANG_(writer,dvalue){
var current_tail = cljs.core.deref.call(null,writer);
var new_tail = promise_stream.pcell.open_container.call(null);
jayq.core.done.call(null,dvalue,(function (value){
var contents = cljs.core.cons.call(null,value,new_tail);
return promise_stream.pcell.resolve.call(null,current_tail,contents);
}));
cljs.core.reset_BANG_.call(null,writer,new_tail);
return writer;
});
promise_stream.pstream.close_BANG_ = (function close_BANG_(writer){
return promise_stream.pcell.resolve.call(null,cljs.core.deref.call(null,writer),null);
});
/**
* vf will be called with every value. ef will be called at the end of the
* stream.
*/
promise_stream.pstream.traverse = (function() {
var traverse = null;
var traverse__3 = (function (coll,vf,ef){
return promise_stream.pcell.done.call(null,coll,(function (cell){
if(cljs.core.empty_QMARK_.call(null,cell))
{return ef.call(null);
} else
{vf.call(null,cljs.core.first.call(null,cell));
return traverse.call(null,cljs.core.rest.call(null,cell),vf,ef);
}
}));
});
var traverse__4 = (function (coll1,coll2,vf,ef){
return promise_stream.pcell.done.call(null,coll1,(function (cell1){
return promise_stream.pcell.done.call(null,coll2,(function (cell2){
if((function (){var or__3943__auto__ = cljs.core.empty_QMARK_.call(null,cell1);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return cljs.core.empty_QMARK_.call(null,cell2);
}
})())
{return ef.call(null);
} else
{vf.call(null,cljs.core.first.call(null,cell1),cljs.core.first.call(null,cell2));
return traverse.call(null,cljs.core.rest.call(null,coll1),cljs.core.rest.call(null,coll2),vf,ef);
}
}));
}));
});
traverse = function(coll1,coll2,vf,ef){
switch(arguments.length){
case 3:
return traverse__3.call(this,coll1,coll2,vf);
case 4:
return traverse__4.call(this,coll1,coll2,vf,ef);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
traverse.cljs$core$IFn$_invoke$arity$3 = traverse__3;
traverse.cljs$core$IFn$_invoke$arity$4 = traverse__4;
return traverse;
})()
;
promise_stream.pstream.with_open_pstream = (function with_open_pstream(f){
var vec__3542 = promise_stream.pstream.open_pstream.call(null);
var reader = cljs.core.nth.call(null,vec__3542,0,null);
var writer = cljs.core.nth.call(null,vec__3542,1,null);
f.call(null,writer);
return reader;
});
promise_stream.pstream.modifying_appender = (function modifying_appender(writer,f){
return (function (v){
return promise_stream.pstream.append_BANG_.call(null,writer,f.call(null,v));
});
});
promise_stream.pstream.closer = (function closer(writer){
return (function (){
return promise_stream.pstream.close_BANG_.call(null,writer);
});
});
promise_stream.pstream.map_STAR_ = (function map_STAR_(f,coll){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return promise_stream.pstream.traverse.call(null,coll,promise_stream.pstream.modifying_appender.call(null,writer,f),promise_stream.pstream.closer.call(null,writer));
}));
});
promise_stream.pstream.mapd_STAR_ = (function mapd_STAR_(f,coll){
return promise_stream.pstream.map_STAR_.call(null,cljs.core.comp.call(null,promise_stream.pcell.deferred,f),coll);
});
promise_stream.pstream.close_if_complete = (function close_if_complete(completed_colls,total_colls,writer){
return (function (){
cljs.core.swap_BANG_.call(null,completed_colls,cljs.core.inc);
if(cljs.core._EQ_.call(null,cljs.core.deref.call(null,total_colls),cljs.core.deref.call(null,completed_colls)))
{return promise_stream.pstream.close_BANG_.call(null,writer);
} else
{return null;
}
});
});
promise_stream.pstream.co_operative_close = (function co_operative_close(total_colls_future,writer,callback){
var total_colls = cljs.core.atom.call(null,null);
var completed_colls = cljs.core.atom.call(null,0);
var close_function = promise_stream.pstream.close_if_complete.call(null,completed_colls,total_colls,writer);
jayq.core.done.call(null,total_colls_future,(function (p1__3543_SHARP_){
return cljs.core.reset_BANG_.call(null,total_colls,p1__3543_SHARP_);
}));
return callback.call(null,close_function);
});
/**
* @param {...*} var_args
*/
promise_stream.pstream.concat_STAR_ = (function() { 
var concat_STAR___delegate = function (colls){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return promise_stream.pstream.co_operative_close.call(null,promise_stream.pcell.deferred.call(null,cljs.core.count.call(null,colls)),writer,(function (close){
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (coll){
return promise_stream.pstream.traverse.call(null,coll,promise_stream.pstream.modifying_appender.call(null,writer,promise_stream.pcell.deferred),close);
}),colls));
}));
}));
};
var concat_STAR_ = function (var_args){
var colls = null;
if (arguments.length > 0) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return concat_STAR___delegate.call(this, colls);
};
concat_STAR_.cljs$lang$maxFixedArity = 0;
concat_STAR_.cljs$lang$applyTo = (function (arglist__3544){
var colls = cljs.core.seq(arglist__3544);
return concat_STAR___delegate(colls);
});
concat_STAR_.cljs$core$IFn$_invoke$arity$variadic = concat_STAR___delegate;
return concat_STAR_;
})()
;
promise_stream.pstream.count_STAR_ = (function count_STAR_(coll){
return cljs.core.reduce.call(null,promise_stream.pcell.dapply.call(null,(function (tally,v){
return (tally + 1);
})),promise_stream.pcell.deferred.call(null,0),coll);
});
promise_stream.pstream.mapcat_STAR_ = (function mapcat_STAR_(f,coll){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return promise_stream.pstream.co_operative_close.call(null,promise_stream.pstream.count_STAR_.call(null,coll),writer,(function (close){
var stream_of_streams = promise_stream.pstream.map_STAR_.call(null,cljs.core.comp.call(null,promise_stream.pcell.deferred,f),coll);
return promise_stream.pstream.map_STAR_.call(null,(function (inner_stream){
return promise_stream.pstream.traverse.call(null,inner_stream,promise_stream.pstream.modifying_appender.call(null,writer,promise_stream.pcell.deferred),close);
}),stream_of_streams);
}));
}));
});
promise_stream.pstream.pair_adder = (function pair_adder(writer){
return (function (v1,v2){
return promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pstream.promise.call(null,cljs.core.list.call(null,v1,v2)));
});
});
promise_stream.pstream.zip_STAR_ = (function zip_STAR_(coll1,coll2){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return promise_stream.pstream.traverse.call(null,coll1,coll2,promise_stream.pstream.pair_adder.call(null,writer),promise_stream.pstream.closer.call(null,writer));
}));
});
promise_stream.pstream.conditional_adder = (function conditional_adder(pred,writer){
return (function (v){
return jayq.core.done.call(null,pred.call(null,v),(function (passes_QMARK_){
if(cljs.core.truth_(passes_QMARK_))
{return promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pstream.promise.call(null,v));
} else
{return null;
}
}));
});
});
/**
* returns a new pstream of values from coll for which pred returns truthy. pred
* must take a concrete value and return a promise. coll is a pstream.
*/
promise_stream.pstream.filter_STAR_ = (function filter_STAR_(pred,coll){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return promise_stream.pstream.traverse.call(null,coll,promise_stream.pstream.conditional_adder.call(null,pred,writer),promise_stream.pstream.closer.call(null,writer));
}));
});
/**
* Returns a pstream containing coll, followed by (rest coll) then (rest (rest
* coll)) etc.
*/
promise_stream.pstream.rests_STAR_ = (function() {
var rests_STAR_ = null;
var rests_STAR___1 = (function (coll){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pstream.promise.call(null,coll));
return rests_STAR_.call(null,writer,coll);
}));
});
var rests_STAR___2 = (function (writer,coll){
return promise_stream.pcell.done.call(null,coll,(function (cell){
if(cljs.core.empty_QMARK_.call(null,cell))
{return promise_stream.pstream.close_BANG_.call(null,writer);
} else
{var tail = cljs.core.rest.call(null,cell);
promise_stream.pstream.append_BANG_.call(null,writer,promise_stream.pstream.promise.call(null,tail));
return rests_STAR_.call(null,writer,tail);
}
}));
});
rests_STAR_ = function(writer,coll){
switch(arguments.length){
case 1:
return rests_STAR___1.call(this,writer);
case 2:
return rests_STAR___2.call(this,writer,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
rests_STAR_.cljs$core$IFn$_invoke$arity$1 = rests_STAR___1;
rests_STAR_.cljs$core$IFn$_invoke$arity$2 = rests_STAR___2;
return rests_STAR_;
})()
;
promise_stream.pstream.resolves_within_QMARK_ = (function resolves_within_QMARK_(timeout,pstream){
var result = jayq.core.$deferred.call(null);
setTimeout((function (){
return jayq.core.resolve.call(null,result,false);
}),timeout);
promise_stream.pcell.done.call(null,pstream,(function (){
return jayq.core.resolve.call(null,result,true);
}));
return result;
});
promise_stream.pstream.after_resolver = (function after_resolver(timeout){
return (function (p__3547){
var vec__3548 = p__3547;
var v = cljs.core.nth.call(null,vec__3548,0,null);
var tail = cljs.core.nth.call(null,vec__3548,1,null);
return promise_stream.pstream.fmap.call(null,cljs.core.not).call(null,promise_stream.pstream.resolves_within_QMARK_.call(null,timeout,tail));
});
});
promise_stream.pstream.throttle_STAR_ = (function throttle_STAR_(timeout,coll){
return promise_stream.pstream.mapd_STAR_.call(null,cljs.core.first,promise_stream.pstream.filter_STAR_.call(null,promise_stream.pstream.after_resolver.call(null,timeout),promise_stream.pstream.zip_STAR_.call(null,coll,cljs.core.rest.call(null,promise_stream.pstream.rests_STAR_.call(null,coll)))));
});
/**
* Calls f with two promises and expects f to return a promise.
*/
promise_stream.pstream.reductions_STAR_ = (function() {
var reductions_STAR_ = null;
var reductions_STAR___2 = (function (f,coll){
return reductions_STAR_.call(null,f,cljs.core.first.call(null,coll),cljs.core.rest.call(null,coll));
});
var reductions_STAR___3 = (function (f,start,coll){
return promise_stream.pstream.with_open_pstream.call(null,(function (writer){
return reductions_STAR_.call(null,writer,f,start,coll);
}));
});
var reductions_STAR___4 = (function (writer,f,daccumulator,coll){
var dresult = f.call(null,daccumulator,cljs.core.first.call(null,coll));
var dtail = cljs.core.rest.call(null,coll);
promise_stream.pstream.append_BANG_.call(null,writer,dresult);
return promise_stream.pcell.done.call(null,dtail,(function (tail){
if(cljs.core.empty_QMARK_.call(null,tail))
{return promise_stream.pstream.close_BANG_.call(null,writer);
} else
{return reductions_STAR_.call(null,writer,f,dresult,dtail);
}
}));
});
reductions_STAR_ = function(writer,f,daccumulator,coll){
switch(arguments.length){
case 2:
return reductions_STAR___2.call(this,writer,f);
case 3:
return reductions_STAR___3.call(this,writer,f,daccumulator);
case 4:
return reductions_STAR___4.call(this,writer,f,daccumulator,coll);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
reductions_STAR_.cljs$core$IFn$_invoke$arity$2 = reductions_STAR___2;
reductions_STAR_.cljs$core$IFn$_invoke$arity$3 = reductions_STAR___3;
reductions_STAR_.cljs$core$IFn$_invoke$arity$4 = reductions_STAR___4;
return reductions_STAR_;
})()
;
promise_stream.pstream.dorun_STAR_ = (function dorun_STAR_(pstream){
cljs.core.reduce.call(null,(function (_,___$1){
return jayq.core.$deferred.call(null);
}),pstream);
return null;
});
promise_stream.pstream.doall_STAR_ = (function doall_STAR_(pstream){
return cljs.core.reduce.call(null,promise_stream.pstream.fmap.call(null,cljs.core.conj),promise_stream.pstream.promise.call(null,cljs.core.PersistentVector.EMPTY),pstream);
});
promise_stream.pstream.pstream_m = cljs.core.PersistentArrayMap.fromArray(["\uFDD0:return",promise_stream.pstream.closed_pstream,"\uFDD0:bind",(function pstream_m(p1__3550_SHARP_,p2__3549_SHARP_){
return promise_stream.pstream.mapcat_STAR_.call(null,p2__3549_SHARP_,p1__3550_SHARP_);
}),"\uFDD0:zero",cljs.core.identity], true);
