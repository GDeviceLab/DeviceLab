// Copyright (c) 2013 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
"undefined"==typeof WeakMap&&!function(){var a=Object.defineProperty,b=Date.now()%1e9,c=function(){this.name="__st"+(1e9*Math.random()>>>0)+(b++ +"__")};c.prototype={set:function(b,c){var d=b[this.name];d&&d[0]===b?d[1]=c:a(b,this.name,{value:[b,c],writable:!0})},get:function(a){var b;return(b=a[this.name])&&b[0]===a?b[1]:void 0},"delete":function(a){this.set(a,void 0)}},window.WeakMap=c}(),function(a){a=a||{},a.external=a.external||{};var b={shadow:function(a){return a?a.shadowRoot||a.webkitShadowRoot:void 0},canTarget:function(a){return a&&Boolean(a.elementFromPoint)},targetingShadow:function(a){var b=this.shadow(a);return this.canTarget(b)?b:void 0},olderShadow:function(a){var b=a.olderShadowRoot;if(!b){var c=a.querySelector("shadow");c&&(b=c.olderShadowRoot)}return b},allShadows:function(a){for(var b=[],c=this.shadow(a);c;)b.push(c),c=this.olderShadow(c);return b},searchRoot:function(a,b,c){if(a){var d,e,f=a.elementFromPoint(b,c);for(e=this.targetingShadow(f);e;){if(d=e.elementFromPoint(b,c)){var g=this.targetingShadow(d);return this.searchRoot(g,b,c)||d}e=this.olderShadow(e)}return f}},owner:function(a){for(var b=a;b.parentNode;)b=b.parentNode;return b},findTarget:function(a){var b=a.clientX,c=a.clientY,d=this.owner(a.target);return d.elementFromPoint(b,c)||(d=document),this.searchRoot(d,b,c)}};a.targetFinding=b,a.findTarget=b.findTarget.bind(b),window.PointerEventsPolyfill=a}(window.PointerEventsPolyfill),function(){function a(a){return"body ^^ "+b(a)}function b(a){return'[touch-action="'+a+'"]'}function c(a){return"{ -ms-touch-action: "+a+"; touch-action: "+a+"; touch-action-delay: none; }"}var d=["none","auto","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["pan-x pan-y","pan-y pan-x"]}],e="";d.forEach(function(d){String(d)===d?(e+=b(d)+c(d)+"\n",e+=a(d)+c(d)+"\n"):(e+=d.selectors.map(b)+c(d.rule)+"\n",e+=d.selectors.map(a)+c(d.rule)+"\n")});var f=document.createElement("style");f.textContent=e,document.head.appendChild(f)}(),function(a){function b(a,e){e=e||{};var f=e.buttons;if(void 0===f)switch(e.which){case 1:f=1;break;case 2:f=4;break;case 3:f=2;break;default:f=0}var i;if(c)i=new MouseEvent(a,e);else{i=document.createEvent("MouseEvent");for(var j,k={},l=0;l<g.length;l++)j=g[l],k[j]=e[j]||h[l];i.initMouseEvent(a,k.bubbles,k.cancelable,k.view,k.detail,k.screenX,k.screenY,k.clientX,k.clientY,k.ctrlKey,k.altKey,k.shiftKey,k.metaKey,k.button,k.relatedTarget)}i.__proto__=b.prototype,d||Object.defineProperty(i,"buttons",{get:function(){return f},enumerable:!0});var m=0;return m=e.pressure?e.pressure:f?.5:0,Object.defineProperties(i,{pointerId:{value:e.pointerId||0,enumerable:!0},width:{value:e.width||0,enumerable:!0},height:{value:e.height||0,enumerable:!0},pressure:{value:m,enumerable:!0},tiltX:{value:e.tiltX||0,enumerable:!0},tiltY:{value:e.tiltY||0,enumerable:!0},pointerType:{value:e.pointerType||"",enumerable:!0},hwTimestamp:{value:e.hwTimestamp||0,enumerable:!0},isPrimary:{value:e.isPrimary||!1,enumerable:!0}}),i}var c=!1,d=!1;try{var e=new MouseEvent("click",{buttons:1});c=!0,d=1===e.buttons}catch(f){}var g=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget"],h=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null];b.prototype=Object.create(MouseEvent.prototype),a.PointerEvent||(a.PointerEvent=b)}(window),function(a){function b(){if(c){var a=new Map;return a.pointers=d,a}this.keys=[],this.values=[]}var c=window.Map&&window.Map.prototype.forEach,d=function(){return this.size};b.prototype={set:function(a,b){var c=this.keys.indexOf(a);c>-1?this.values[c]=b:(this.keys.push(a),this.values.push(b))},has:function(a){return this.keys.indexOf(a)>-1},"delete":function(a){var b=this.keys.indexOf(a);b>-1&&(this.keys.splice(b,1),this.values.splice(b,1))},get:function(a){var b=this.keys.indexOf(a);return this.values[b]},clear:function(){this.keys.length=0,this.values.length=0},forEach:function(a,b){this.values.forEach(function(c,d){a.call(b,c,this.keys[d],this)},this)},pointers:function(){return this.keys.length}},a.PointerMap=b}(window.PointerEventsPolyfill),function(a){var b=["bubbles","cancelable","view","detail","screenX","screenY","clientX","clientY","ctrlKey","altKey","shiftKey","metaKey","button","relatedTarget","buttons","pointerId","width","height","pressure","tiltX","tiltY","pointerType","hwTimestamp","isPrimary","type","target","currentTarget","which"],c=[!1,!1,null,null,0,0,0,0,!1,!1,!1,!1,0,null,void 0,0,0,0,0,0,0,"",0,!1,"",null,null,0],d={targets:new WeakMap,handledEvents:new WeakMap,pointermap:new a.PointerMap,eventMap:{},eventSources:{},eventSourceList:[],registerSource:function(a,b){var c=b,d=c.events;d&&(d.forEach(function(a){c[a]&&(this.eventMap[a]=c[a].bind(c))},this),this.eventSources[a]=c,this.eventSourceList.push(c))},register:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.register.call(b,a)},unregister:function(a){for(var b,c=this.eventSourceList.length,d=0;c>d&&(b=this.eventSourceList[d]);d++)b.unregister.call(b,a)},contains:a.external.contains||function(a,b){return a.contains(b)},down:function(a){this.fireEvent("pointerdown",a)},move:function(a){this.fireEvent("pointermove",a)},up:function(a){this.fireEvent("pointerup",a)},enter:function(a){a.bubbles=!1,this.fireEvent("pointerenter",a)},leave:function(a){a.bubbles=!1,this.fireEvent("pointerleave",a)},over:function(a){a.bubbles=!0,this.fireEvent("pointerover",a)},out:function(a){a.bubbles=!0,this.fireEvent("pointerout",a)},cancel:function(a){this.fireEvent("pointercancel",a)},leaveOut:function(a){this.contains(a.target,a.relatedTarget)||this.leave(a),this.out(a)},enterOver:function(a){this.contains(a.target,a.relatedTarget)||this.enter(a),this.over(a)},eventHandler:function(a){if(!this.handledEvents.get(a)){var b=a.type,c=this.eventMap&&this.eventMap[b];c&&c(a),this.handledEvents.set(a,!0)}},listen:function(a,b){b.forEach(function(b){this.addEvent(a,b)},this)},unlisten:function(a,b){b.forEach(function(b){this.removeEvent(a,b)},this)},addEvent:a.external.addEvent||function(a,b){a.addEventListener(b,this.boundHandler)},removeEvent:a.external.removeEvent||function(a,b){a.removeEventListener(b,this.boundHandler)},makeEvent:function(a,b){this.captureInfo&&(b.relatedTarget=null);var c=new PointerEvent(a,b);return b.preventDefault&&(c.preventDefault=b.preventDefault),this.targets.set(c,this.targets.get(b)||b.target),c},fireEvent:function(a,b){var c=this.makeEvent(a,b);return this.dispatchEvent(c)},cloneEvent:function(a){for(var d,e={},f=0;f<b.length;f++)d=b[f],e[d]=a[d]||c[f];return a.preventDefault&&(e.preventDefault=function(){a.preventDefault()}),e},getTarget:function(a){return this.captureInfo&&this.captureInfo.id===a.pointerId?this.captureInfo.target:this.targets.get(a)},setCapture:function(a,b){this.captureInfo&&this.releaseCapture(this.captureInfo.id),this.captureInfo={id:a,target:b};var c=new PointerEvent("gotpointercapture",{bubbles:!0});this.implicitRelease=this.releaseCapture.bind(this,a),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),this.targets.set(c,b),this.asyncDispatchEvent(c)},releaseCapture:function(a){if(this.captureInfo&&this.captureInfo.id===a){var b=new PointerEvent("lostpointercapture",{bubbles:!0}),c=this.captureInfo.target;this.captureInfo=null,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),this.targets.set(b,c),this.asyncDispatchEvent(b)}},dispatchEvent:a.external.dispatchEvent||function(a){var b=this.getTarget(a);return b?b.dispatchEvent(a):void 0},asyncDispatchEvent:function(a){setTimeout(this.dispatchEvent.bind(this,a),0)}};d.boundHandler=d.eventHandler.bind(d),a.dispatcher=d,a.register=d.register.bind(d),a.unregister=d.unregister.bind(d)}(window.PointerEventsPolyfill),function(a){function b(a,b,c,d){this.addCallback=a.bind(d),this.removeCallback=b.bind(d),this.changedCallback=c.bind(d),g&&(this.observer=new g(this.mutationWatcher.bind(this)))}var c=Array.prototype.forEach.call.bind(Array.prototype.forEach),d=Array.prototype.map.call.bind(Array.prototype.map),e=Array.prototype.slice.call.bind(Array.prototype.slice),f=Array.prototype.filter.call.bind(Array.prototype.filter),g=window.MutationObserver||window.WebKitMutationObserver,h="[touch-action]",i={subtree:!0,childList:!0,attributes:!0,attributeOldValue:!0,attributeFilter:["touch-action"]};b.prototype={watchSubtree:function(b){a.targetFinding.canTarget(b)&&this.observer.observe(b,i)},enableOnSubtree:function(a){this.watchSubtree(a),a===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(a)},installNewSubtree:function(a){c(this.findElements(a),this.addElement,this)},findElements:function(a){return a.querySelectorAll?a.querySelectorAll(h):[]},removeElement:function(a){this.removeCallback(a)},addElement:function(a){this.addCallback(a)},elementChanged:function(a,b){this.changedCallback(a,b)},concatLists:function(a,b){return a.concat(e(b))},installOnLoad:function(){document.addEventListener("DOMContentLoaded",this.installNewSubtree.bind(this,document))},isElement:function(a){return a.nodeType===Node.ELEMENT_NODE},flattenMutationTree:function(a){var b=d(a,this.findElements,this);return b.push(f(a,this.isElement)),b.reduce(this.concatLists,[])},mutationWatcher:function(a){a.forEach(this.mutationHandler,this)},mutationHandler:function(a){if("childList"===a.type){var b=this.flattenMutationTree(a.addedNodes);b.forEach(this.addElement,this);var c=this.flattenMutationTree(a.removedNodes);c.forEach(this.removeElement,this)}else"attributes"===a.type&&this.elementChanged(a.target,a.oldValue)}},g||(b.prototype.watchSubtree=function(){console.warn("PointerEventsPolyfill: MutationObservers not found, touch-action will not be dynamically detected")}),a.Installer=b}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher,c=b.pointermap,d=25,e={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},lastTouches:[],isEventSimulatedFromTouch:function(a){for(var b,c=this.lastTouches,e=a.clientX,f=a.clientY,g=0,h=c.length;h>g&&(b=c[g]);g++){var i=Math.abs(e-b.x),j=Math.abs(f-b.y);if(d>=i&&d>=j)return!0}},prepareEvent:function(a){var c=b.cloneEvent(a),d=c.preventDefault;return c.preventDefault=function(){a.preventDefault(),d()},c.pointerId=this.POINTER_ID,c.isPrimary=!0,c.pointerType=this.POINTER_TYPE,c},mousedown:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.has(this.POINTER_ID);d&&this.cancel(a);var e=this.prepareEvent(a);c.set(this.POINTER_ID,a),b.down(e)}},mousemove:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.move(c)}},mouseup:function(a){if(!this.isEventSimulatedFromTouch(a)){var d=c.get(this.POINTER_ID);if(d&&d.button===a.button){var e=this.prepareEvent(a);b.up(e),this.cleanupMouse()}}},mouseover:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.enterOver(c)}},mouseout:function(a){if(!this.isEventSimulatedFromTouch(a)){var c=this.prepareEvent(a);b.leaveOut(c)}},cancel:function(a){var c=this.prepareEvent(a);b.cancel(c),this.cleanupMouse()},cleanupMouse:function(){c["delete"](this.POINTER_ID)}};a.mouseEvents=e}(window.PointerEventsPolyfill),function(a){var b,c=a.dispatcher,d=a.findTarget,e=a.targetFinding.allShadows.bind(a.targetFinding),f=c.pointermap,g=Array.prototype.map.call.bind(Array.prototype.map),h=2500,i=200,j="touch-action",k=!1,l={scrollType:new WeakMap,events:["touchstart","touchmove","touchend","touchcancel"],register:function(a){k?c.listen(a,this.events):b.enableOnSubtree(a)},unregister:function(a){k&&c.unlisten(a,this.events)},elementAdded:function(a){var b=a.getAttribute(j),d=this.touchActionToScrollType(b);d&&(this.scrollType.set(a,d),c.listen(a,this.events),e(a).forEach(function(a){this.scrollType.set(a,d),c.listen(a,this.events)},this))},elementRemoved:function(a){this.scrollType["delete"](a),c.unlisten(a,this.events),e(a).forEach(function(a){this.scrollType["delete"](a),c.unlisten(a,this.events)},this)},elementChanged:function(a,b){var c=a.getAttribute(j),d=this.touchActionToScrollType(c),f=this.touchActionToScrollType(b);d&&f?(this.scrollType.set(a,d),e(a).forEach(function(a){this.scrollType.set(a,d)},this)):f?this.elementRemoved(a):d&&this.elementAdded(a)},scrollTypes:{EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|auto$/},touchActionToScrollType:function(a){var b=a,c=this.scrollTypes;return"none"===b?"none":b===c.XSCROLLER?"X":b===c.YSCROLLER?"Y":c.SCROLLER.exec(b)?"XY":void 0},POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(a){return this.firstTouch===a.identifier},setPrimaryTouch:function(a){(0===f.pointers()||1===f.pointers()&&f.has(1))&&(this.firstTouch=a.identifier,this.firstXY={X:a.clientX,Y:a.clientY},this.scrolling=!1,this.cancelResetClickCount())},removePrimaryPointer:function(a){a.isPrimary&&(this.firstTouch=null,this.firstXY=null,this.resetClickCount())},clickCount:0,resetId:null,resetClickCount:function(){var a=function(){this.clickCount=0,this.resetId=null}.bind(this);this.resetId=setTimeout(a,i)},cancelResetClickCount:function(){this.resetId&&clearTimeout(this.resetId)},touchToPointer:function(a){var b=c.cloneEvent(a);return b.pointerId=a.identifier+2,b.target=d(b),b.bubbles=!0,b.cancelable=!0,b.detail=this.clickCount,b.button=0,b.buttons=1,b.width=a.webkitRadiusX||a.radiusX||0,b.height=a.webkitRadiusY||a.radiusY||0,b.pressure=a.webkitForce||a.force||.5,b.isPrimary=this.isPrimaryTouch(a),b.pointerType=this.POINTER_TYPE,b},processTouches:function(a,b){var c=a.changedTouches,d=g(c,this.touchToPointer,this);d.forEach(function(b){b.preventDefault=function(){this.scrolling=!1,this.firstXY=null,a.preventDefault()}},this),d.forEach(b,this)},shouldScroll:function(a){if(this.firstXY){var b,c=this.scrollType.get(a.currentTarget);if("none"===c)b=!1;else if("XY"===c)b=!0;else{var d=a.changedTouches[0],e=c,f="Y"===c?"X":"Y",g=Math.abs(d["client"+e]-this.firstXY[e]),h=Math.abs(d["client"+f]-this.firstXY[f]);b=g>=h}return this.firstXY=null,b}},findTouch:function(a,b){for(var c,d=0,e=a.length;e>d&&(c=a[d]);d++)if(c.identifier===b)return!0},vacuumTouches:function(a){var b=a.touches;if(f.pointers()>=b.length){var c=[];f.forEach(function(a,d){if(1!==d&&!this.findTouch(b,d-2)){var e=a.out;c.push(this.touchToPointer(e))}},this),c.forEach(this.cancelOut,this)}},touchstart:function(a){this.vacuumTouches(a),this.setPrimaryTouch(a.changedTouches[0]),this.dedupSynthMouse(a),this.scrolling||(this.clickCount++,this.processTouches(a,this.overDown))},overDown:function(a){f.set(a.pointerId,{target:a.target,out:a,outTarget:a.target});c.over(a),c.down(a)},touchmove:function(a){this.scrolling||(this.shouldScroll(a)?(this.scrolling=!0,this.touchcancel(a)):(a.preventDefault(),this.processTouches(a,this.moveOverOut)))},moveOverOut:function(a){var b=a,d=f.get(b.pointerId);if(d){var e=d.out,g=d.outTarget;c.move(b),e&&g!==b.target&&(e.relatedTarget=b.target,b.relatedTarget=g,e.target=g,b.target?(c.leaveOut(e),c.enterOver(b)):(b.target=g,b.relatedTarget=null,this.cancelOut(b))),d.out=b,d.outTarget=b.target}},touchend:function(a){this.dedupSynthMouse(a),this.processTouches(a,this.upOut)},upOut:function(a){this.scrolling||(c.up(a),c.out(a)),this.cleanUpPointer(a)},touchcancel:function(a){this.processTouches(a,this.cancelOut)},cancelOut:function(a){c.cancel(a),c.out(a),this.cleanUpPointer(a)},cleanUpPointer:function(a){f["delete"](a.pointerId),this.removePrimaryPointer(a)},dedupSynthMouse:function(b){var c=a.mouseEvents.lastTouches,d=b.changedTouches[0];if(this.isPrimaryTouch(d)){var e={x:d.clientX,y:d.clientY};c.push(e);var f=function(a,b){var c=a.indexOf(b);c>-1&&a.splice(c,1)}.bind(null,c,e);setTimeout(f,h)}}};k||(b=new a.Installer(l.elementAdded,l.elementRemoved,l.elementChanged,l)),a.touchEvents=l}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher,c=b.pointermap,d=window.MSPointerEvent&&"number"==typeof window.MSPointerEvent.MSPOINTER_TYPE_MOUSE,e={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],register:function(a){b.listen(a,this.events)},unregister:function(a){b.unlisten(a,this.events)},POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(a){var c=a;return d&&(c=b.cloneEvent(a),c.pointerType=this.POINTER_TYPES[a.pointerType]),c},cleanup:function(a){c["delete"](a)},MSPointerDown:function(a){c.set(a.pointerId,a);var d=this.prepareEvent(a);b.down(d)},MSPointerMove:function(a){var c=this.prepareEvent(a);b.move(c)},MSPointerUp:function(a){var c=this.prepareEvent(a);b.up(c),this.cleanup(a.pointerId)},MSPointerOut:function(a){var c=this.prepareEvent(a);b.leaveOut(c)},MSPointerOver:function(a){var c=this.prepareEvent(a);b.enterOver(c)},MSPointerCancel:function(a){var c=this.prepareEvent(a);b.cancel(c),this.cleanup(a.pointerId)},MSLostPointerCapture:function(a){var c=b.makeEvent("lostpointercapture",a);b.dispatchEvent(c)},MSGotPointerCapture:function(a){var c=b.makeEvent("gotpointercapture",a);b.dispatchEvent(c)}};a.msEvents=e}(window.PointerEventsPolyfill),function(a){var b=a.dispatcher;if(void 0===window.navigator.pointerEnabled){if(Object.defineProperty(window.navigator,"pointerEnabled",{value:!0,enumerable:!0}),window.navigator.msPointerEnabled){var c=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:c,enumerable:!0}),b.registerSource("ms",a.msEvents)}else b.registerSource("mouse",a.mouseEvents),void 0!==window.ontouchstart&&b.registerSource("touch",a.touchEvents);b.register(document)}}(window.PointerEventsPolyfill),function(a){function b(a){if(!e.pointermap.has(a))throw new Error("InvalidPointerId")}var c,d,e=a.dispatcher,f=window.navigator;f.msPointerEnabled?(c=function(a){b(a),this.msSetPointerCapture(a)},d=function(a){b(a),this.msReleasePointerCapture(a)}):(c=function(a){b(a),e.setCapture(a,this)},d=function(a){b(a),e.releaseCapture(a,this)}),window.Element&&!Element.prototype.setPointerCapture&&Object.defineProperties(Element.prototype,{setPointerCapture:{value:c},releasePointerCapture:{value:d}})}(window.PointerEventsPolyfill);
/*
* Snap.js
*
* Copyright 2013, Jacob Kelley - http://jakiestfu.com/
* Released under the MIT Licence
* http://opensource.org/licenses/MIT
*
* Github:  http://github.com/jakiestfu/Snap.js/
* Version: 1.9.2
*/
/*jslint browser: true*/
/*global define, module, ender*/
(function(win, doc) {
'use strict';
var Snap = Snap || function(userOpts) {
var settings = {
element: null,
dragger: null,
disable: 'none',
addBodyClasses: true,
hyperextensible: true,
resistance: 0.5,
flickThreshold: 50,
transitionSpeed: 0.3,
easing: 'ease',
maxPosition: 266,
minPosition: -266,
tapToClose: true,
touchToDrag: true,
slideIntent: 40, // degrees
minDragDistance: 5
},
cache = {
simpleStates: {
opening: null,
towards: null,
hyperExtending: null,
halfway: null,
flick: null,
translation: {
absolute: 0,
relative: 0,
sinceDirectionChange: 0,
percentage: 0
}
}
},
eventList = {},
utils = {
hasTouch: (doc.ontouchstart === null),
eventType: function(action) {
var eventTypes = {
down: (utils.hasTouch ? 'touchstart' : 'mousedown'),
move: (utils.hasTouch ? 'touchmove' : 'mousemove'),
up: (utils.hasTouch ? 'touchend' : 'mouseup'),
out: (utils.hasTouch ? 'touchcancel' : 'mouseout')
};
return eventTypes[action];
},
page: function(t, e){
return (utils.hasTouch && e.touches.length && e.touches[0]) ? e.touches[0]['page'+t] : e['page'+t];
},
klass: {
has: function(el, name){
return (el.className).indexOf(name) !== -1;
},
add: function(el, name){
if(!utils.klass.has(el, name) && settings.addBodyClasses){
el.className += " "+name;
}
},
remove: function(el, name){
if(settings.addBodyClasses){
el.className = (el.className).replace(name, "").replace(/^\s+|\s+$/g, '');
}
}
},
dispatchEvent: function(type) {
if (typeof eventList[type] === 'function') {
return eventList[type].call();
}
},
vendor: function(){
var tmp = doc.createElement("div"),
prefixes = 'webkit Moz O ms'.split(' '),
i;
for (i in prefixes) {
if (typeof tmp.style[prefixes[i] + 'Transition'] !== 'undefined') {
return prefixes[i];
}
}
},
transitionCallback: function(){
return (cache.vendor==='Moz' || cache.vendor==='ms') ? 'transitionend' : cache.vendor+'TransitionEnd';
},
canTransform: function(){
return typeof settings.element.style[cache.vendor+'Transform'] !== 'undefined';
},
deepExtend: function(destination, source) {
var property;
for (property in source) {
if (source[property] && source[property].constructor && source[property].constructor === Object) {
destination[property] = destination[property] || {};
utils.deepExtend(destination[property], source[property]);
} else {
destination[property] = source[property];
}
}
return destination;
},
angleOfDrag: function(x, y) {
var degrees, theta;
// Calc Theta
theta = Math.atan2(-(cache.startDragY - y), (cache.startDragX - x));
if (theta < 0) {
theta += 2 * Math.PI;
}
// Calc Degrees
degrees = Math.floor(theta * (180 / Math.PI) - 180);
if (degrees < 0 && degrees > -180) {
degrees = 360 - Math.abs(degrees);
}
return Math.abs(degrees);
},
events: {
addEvent: function addEvent(element, eventName, func) {
if (element.addEventListener) {
return element.addEventListener(eventName, func, false);
} else if (element.attachEvent) {
return element.attachEvent("on" + eventName, func);
}
},
removeEvent: function addEvent(element, eventName, func) {
if (element.addEventListener) {
return element.removeEventListener(eventName, func, false);
} else if (element.attachEvent) {
return element.detachEvent("on" + eventName, func);
}
},
prevent: function(e) {
if (e.preventDefault) {
e.preventDefault();
} else {
e.returnValue = false;
}
}
},
parentUntil: function(el, attr) {
var isStr = typeof attr === 'string';
while (el.parentNode) {
if (isStr && el.getAttribute && el.getAttribute(attr)){
return el;
} else if(!isStr && el === attr){
return el;
}
el = el.parentNode;
}
return null;
}
},
action = {
translate: {
get: {
matrix: function(index) {

if( !utils.canTransform() ){
return parseInt(settings.element.style.left, 10);
} else {
var matrix = win.getComputedStyle(settings.element)[cache.vendor+'Transform'].match(/\((.*)\)/),
ieOffset = 8;
if (matrix) {
matrix = matrix[1].split(',');
if(matrix.length===16){
index+=ieOffset;
}
return parseInt(matrix[index], 10);
}
return 0;
}
}
},
easeCallback: function(){
settings.element.style[cache.vendor+'Transition'] = '';
cache.translation = action.translate.get.matrix(4);
cache.easing = false;
clearInterval(cache.animatingInterval);

if(cache.easingTo===0){
utils.klass.remove(doc.body, 'snapjs-right');
utils.klass.remove(doc.body, 'snapjs-left');
}

utils.dispatchEvent('animated');
utils.events.removeEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
},
easeTo: function(n) {

if( !utils.canTransform() ){
cache.translation = n;
action.translate.x(n);
} else {
cache.easing = true;
cache.easingTo = n;

settings.element.style[cache.vendor+'Transition'] = 'all ' + settings.transitionSpeed + 's ' + settings.easing;

cache.animatingInterval = setInterval(function() {
utils.dispatchEvent('animating');
}, 1);

utils.events.addEvent(settings.element, utils.transitionCallback(), action.translate.easeCallback);
action.translate.x(n);
}
if(n===0){
settings.element.style[cache.vendor+'Transform'] = '';
}
},
x: function(n) {
if( (settings.disable==='left' && n>0) ||
(settings.disable==='right' && n<0)
){ return; }

if( !settings.hyperextensible ){
if( n===settings.maxPosition || n>settings.maxPosition ){
n=settings.maxPosition;
} else if( n===settings.minPosition || n<settings.minPosition ){
n=settings.minPosition;
}
}

n = parseInt(n, 10);
if(isNaN(n)){
n = 0;
}

if( utils.canTransform() ){
var theTranslate = 'translate3d(' + n + 'px, 0,0)';
settings.element.style[cache.vendor+'Transform'] = theTranslate;
} else {
settings.element.style.width = (win.innerWidth || doc.documentElement.clientWidth)+'px';

settings.element.style.left = n+'px';
settings.element.style.right = '';
}
}
},
drag: {
listen: function() {
cache.translation = 0;
cache.easing = false;
utils.events.addEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
utils.events.addEvent(settings.element, utils.eventType('move'), action.drag.dragging);
utils.events.addEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
},
stopListening: function() {
utils.events.removeEvent(settings.element, utils.eventType('down'), action.drag.startDrag);
utils.events.removeEvent(settings.element, utils.eventType('move'), action.drag.dragging);
utils.events.removeEvent(settings.element, utils.eventType('up'), action.drag.endDrag);
},
startDrag: function(e) {
// No drag on ignored elements
var target = e.target ? e.target : e.srcElement,
ignoreParent = utils.parentUntil(target, 'data-snap-ignore');

if (ignoreParent) {
utils.dispatchEvent('ignore');
return;
}


if(settings.dragger){
var dragParent = utils.parentUntil(target, settings.dragger);

// Only use dragger if we're in a closed state
if( !dragParent &&
(cache.translation !== settings.minPosition &&
cache.translation !== settings.maxPosition
)){
return;
}
}

utils.dispatchEvent('start');
settings.element.style[cache.vendor+'Transition'] = '';
cache.isDragging = true;
cache.hasIntent = null;
cache.intentChecked = false;
cache.startDragX = utils.page('X', e);
cache.startDragY = utils.page('Y', e);
cache.dragWatchers = {
current: 0,
last: 0,
hold: 0,
state: ''
};
cache.simpleStates = {
opening: null,
towards: null,
hyperExtending: null,
halfway: null,
flick: null,
translation: {
absolute: 0,
relative: 0,
sinceDirectionChange: 0,
percentage: 0
}
};
},
dragging: function(e) {
if (cache.isDragging && settings.touchToDrag) {

var thePageX = utils.page('X', e),
thePageY = utils.page('Y', e),
translated = cache.translation,
absoluteTranslation = action.translate.get.matrix(4),
whileDragX = thePageX - cache.startDragX,
openingLeft = absoluteTranslation > 0,
translateTo = whileDragX,
diff;

// Shown no intent already
if((cache.intentChecked && !cache.hasIntent)){
return;
}

if(settings.addBodyClasses){
if((absoluteTranslation)>0){
utils.klass.add(doc.body, 'snapjs-left');
utils.klass.remove(doc.body, 'snapjs-right');
} else if((absoluteTranslation)<0){
utils.klass.add(doc.body, 'snapjs-right');
utils.klass.remove(doc.body, 'snapjs-left');
}
}

if (cache.hasIntent === false || cache.hasIntent === null) {
var deg = utils.angleOfDrag(thePageX, thePageY),
inRightRange = (deg >= 0 && deg <= settings.slideIntent) || (deg <= 360 && deg > (360 - settings.slideIntent)),
inLeftRange = (deg >= 180 && deg <= (180 + settings.slideIntent)) || (deg <= 180 && deg >= (180 - settings.slideIntent));
if (!inLeftRange && !inRightRange) {
cache.hasIntent = false;
} else {
cache.hasIntent = true;
}
cache.intentChecked = true;
}

if (
(settings.minDragDistance>=Math.abs(thePageX-cache.startDragX)) || // Has user met minimum drag distance?
(cache.hasIntent === false)
) {
return;
}

utils.events.prevent(e);
utils.dispatchEvent('drag');

cache.dragWatchers.current = thePageX;
// Determine which direction we are going
if (cache.dragWatchers.last > thePageX) {
if (cache.dragWatchers.state !== 'left') {
cache.dragWatchers.state = 'left';
cache.dragWatchers.hold = thePageX;
}
cache.dragWatchers.last = thePageX;
} else if (cache.dragWatchers.last < thePageX) {
if (cache.dragWatchers.state !== 'right') {
cache.dragWatchers.state = 'right';
cache.dragWatchers.hold = thePageX;
}
cache.dragWatchers.last = thePageX;
}
if (openingLeft) {
// Pulling too far to the right
if (settings.maxPosition < absoluteTranslation) {
diff = (absoluteTranslation - settings.maxPosition) * settings.resistance;
translateTo = whileDragX - diff;
}
cache.simpleStates = {
opening: 'left',
towards: cache.dragWatchers.state,
hyperExtending: settings.maxPosition < absoluteTranslation,
halfway: absoluteTranslation > (settings.maxPosition / 2),
flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
translation: {
absolute: absoluteTranslation,
relative: whileDragX,
sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
percentage: (absoluteTranslation/settings.maxPosition)*100
}
};
} else {
// Pulling too far to the left
if (settings.minPosition > absoluteTranslation) {
diff = (absoluteTranslation - settings.minPosition) * settings.resistance;
translateTo = whileDragX - diff;
}
cache.simpleStates = {
opening: 'right',
towards: cache.dragWatchers.state,
hyperExtending: settings.minPosition > absoluteTranslation,
halfway: absoluteTranslation < (settings.minPosition / 2),
flick: Math.abs(cache.dragWatchers.current - cache.dragWatchers.hold) > settings.flickThreshold,
translation: {
absolute: absoluteTranslation,
relative: whileDragX,
sinceDirectionChange: (cache.dragWatchers.current - cache.dragWatchers.hold),
percentage: (absoluteTranslation/settings.minPosition)*100
}
};
}
action.translate.x(translateTo + translated);
}
},
endDrag: function(e) {
if (cache.isDragging) {
utils.dispatchEvent('end');
var translated = action.translate.get.matrix(4);

// Tap Close
if (cache.dragWatchers.current === 0 && translated !== 0 && settings.tapToClose) {
utils.dispatchEvent('close');
utils.events.prevent(e);
action.translate.easeTo(0);
cache.isDragging = false;
cache.startDragX = 0;
return;
}

// Revealing Left
if (cache.simpleStates.opening === 'left') {
// Halfway, Flicking, or Too Far Out
if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
if (cache.simpleStates.flick && cache.simpleStates.towards === 'left') { // Flicking Closed
action.translate.easeTo(0);
} else if (
(cache.simpleStates.flick && cache.simpleStates.towards === 'right') || // Flicking Open OR
(cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
) {
action.translate.easeTo(settings.maxPosition); // Open Left
}
} else {
action.translate.easeTo(0); // Close Left
}
// Revealing Right
} else if (cache.simpleStates.opening === 'right') {
// Halfway, Flicking, or Too Far Out
if ((cache.simpleStates.halfway || cache.simpleStates.hyperExtending || cache.simpleStates.flick)) {
if (cache.simpleStates.flick && cache.simpleStates.towards === 'right') { // Flicking Closed
action.translate.easeTo(0);
} else if (
(cache.simpleStates.flick && cache.simpleStates.towards === 'left') || // Flicking Open OR
(cache.simpleStates.halfway || cache.simpleStates.hyperExtending) // At least halfway open OR hyperextending
) {
action.translate.easeTo(settings.minPosition); // Open Right
}
} else {
action.translate.easeTo(0); // Close Right
}
}
cache.isDragging = false;
cache.startDragX = utils.page('X', e);
}
}
}
},
init = function(opts) {
if (opts.element) {
utils.deepExtend(settings, opts);
cache.vendor = utils.vendor();
action.drag.listen();
}
};
/*
* Public
*/
this.open = function(side) {
utils.dispatchEvent('open');
utils.klass.remove(doc.body, 'snapjs-expand-left');
utils.klass.remove(doc.body, 'snapjs-expand-right');

if (side === 'left') {
cache.simpleStates.opening = 'left';
cache.simpleStates.towards = 'right';
utils.klass.add(doc.body, 'snapjs-left');
utils.klass.remove(doc.body, 'snapjs-right');
action.translate.easeTo(settings.maxPosition);
} else if (side === 'right') {
cache.simpleStates.opening = 'right';
cache.simpleStates.towards = 'left';
utils.klass.remove(doc.body, 'snapjs-left');
utils.klass.add(doc.body, 'snapjs-right');
action.translate.easeTo(settings.minPosition);
}
};
this.close = function() {
utils.dispatchEvent('close');
action.translate.easeTo(0);
};
this.expand = function(side){
var to = win.innerWidth || doc.documentElement.clientWidth;

if(side==='left'){
utils.dispatchEvent('expandLeft');
utils.klass.add(doc.body, 'snapjs-expand-left');
utils.klass.remove(doc.body, 'snapjs-expand-right');
} else {
utils.dispatchEvent('expandRight');
utils.klass.add(doc.body, 'snapjs-expand-right');
utils.klass.remove(doc.body, 'snapjs-expand-left');
to *= -1;
}
action.translate.easeTo(to);
};

this.on = function(evt, fn) {
eventList[evt] = fn;
return this;
};
this.off = function(evt) {
if (eventList[evt]) {
eventList[evt] = false;
}
};

this.enable = function() {
utils.dispatchEvent('enable');
action.drag.listen();
};
this.disable = function() {
utils.dispatchEvent('disable');
action.drag.stopListening();
};

this.settings = function(opts){
utils.deepExtend(settings, opts);
};

this.state = function() {
var state,
fromLeft = action.translate.get.matrix(4);
if (fromLeft === settings.maxPosition) {
state = 'left';
} else if (fromLeft === settings.minPosition) {
state = 'right';
} else {
state = 'closed';
}
return {
state: state,
info: cache.simpleStates
};
};
init(userOpts);
};
if ((typeof module !== 'undefined') && module.exports) {
module.exports = Snap;
}
if (typeof ender === 'undefined') {
this.Snap = Snap;
}
if ((typeof define === "function") && define.amd) {
define("snap", [], function() {
return Snap;
});
}
}).call(this, window, document);
(function(s,t,u){var v=(s.SVGAngle||t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")?"SVG":"VML"),picker,slide,hueOffset=15,svgNS='http://www.w3.org/2000/svg';var w=['<div class="picker-wrapper">','<div class="picker"></div>','<div class="picker-indicator"></div>','</div>','<div class="slide-wrapper">','<div class="slide"></div>','<div class="slide-indicator"></div>','</div>'].join('');function mousePosition(a){if(s.event&&s.event.contentOverflow!==u){return{x:s.event.offsetX,y:s.event.offsetY}}if(a.offsetX!==u&&a.offsetY!==u){return{x:a.offsetX,y:a.offsetY}}var b=a.target.parentNode.parentNode;return{x:a.layerX-b.offsetLeft,y:a.layerY-b.offsetTop}}function $(a,b,c){a=t.createElementNS(svgNS,a);for(var d in b)a.setAttribute(d,b[d]);if(Object.prototype.toString.call(c)!='[object Array]')c=[c];var i=0,len=(c[0]&&c.length)||0;for(;i<len;i++)a.appendChild(c[i]);return a}if(v=='SVG'){slide=$('svg',{xmlns:'http://www.w3.org/2000/svg',version:'1.1',width:'100%',height:'100%'},[$('defs',{},$('linearGradient',{id:'gradient-hsv',x1:'0%',y1:'100%',x2:'0%',y2:'0%'},[$('stop',{offset:'0%','stop-color':'#FF0000','stop-opacity':'1'}),$('stop',{offset:'13%','stop-color':'#FF00FF','stop-opacity':'1'}),$('stop',{offset:'25%','stop-color':'#8000FF','stop-opacity':'1'}),$('stop',{offset:'38%','stop-color':'#0040FF','stop-opacity':'1'}),$('stop',{offset:'50%','stop-color':'#00FFFF','stop-opacity':'1'}),$('stop',{offset:'63%','stop-color':'#00FF40','stop-opacity':'1'}),$('stop',{offset:'75%','stop-color':'#0BED00','stop-opacity':'1'}),$('stop',{offset:'88%','stop-color':'#FFFF00','stop-opacity':'1'}),$('stop',{offset:'100%','stop-color':'#FF0000','stop-opacity':'1'})])),$('rect',{x:'0',y:'0',width:'100%',height:'100%',fill:'url(#gradient-hsv)'})]);picker=$('svg',{xmlns:'http://www.w3.org/2000/svg',version:'1.1',width:'100%',height:'100%'},[$('defs',{},[$('linearGradient',{id:'gradient-black',x1:'0%',y1:'100%',x2:'0%',y2:'0%'},[$('stop',{offset:'0%','stop-color':'#000000','stop-opacity':'1'}),$('stop',{offset:'100%','stop-color':'#CC9A81','stop-opacity':'0'})]),$('linearGradient',{id:'gradient-white',x1:'0%',y1:'100%',x2:'100%',y2:'100%'},[$('stop',{offset:'0%','stop-color':'#FFFFFF','stop-opacity':'1'}),$('stop',{offset:'100%','stop-color':'#CC9A81','stop-opacity':'0'})])]),$('rect',{x:'0',y:'0',width:'100%',height:'100%',fill:'url(#gradient-white)'}),$('rect',{x:'0',y:'0',width:'100%',height:'100%',fill:'url(#gradient-black)'})])}else if(v=='VML'){slide=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>','</v:rect>','</DIV>'].join('');picker=['<DIV style="position: relative; width: 100%; height: 100%">','<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>','</v:rect>','<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">','<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>','</v:rect>','</DIV>'].join('');if(!t.namespaces['v'])t.namespaces.add('v','urn:schemas-microsoft-com:vml','#default#VML')}function hsv2rgb(a){var R,G,B,X,C;var h=(a.h%360)/60;C=a.v*a.s;X=C*(1-Math.abs(h%2-1));R=G=B=a.v-C;h=~~h;R+=[C,X,0,0,X,C][h];G+=[X,C,C,X,0,0][h];B+=[0,0,X,C,C,X][h];var r=Math.floor(R*255);var g=Math.floor(G*255);var b=Math.floor(B*255);return{r:r,g:g,b:b,hex:"#"+(16777216|b|(g<<8)|(r<<16)).toString(16).slice(1)}}function rgb2hsv(a){var r=a.r;var g=a.g;var b=a.b;if(a.r>1||a.g>1||a.b>1){r/=255;g/=255;b/=255}var H,S,V,C;V=Math.max(r,g,b);C=V-Math.min(r,g,b);H=(C==0?null:V==r?(g-b)/C+(g<b?6:0):V==g?(b-r)/C+2:(r-g)/C+4);H=(H%6)*60;S=C==0?0:C/V;return{h:H,s:S,v:V}}function slideListener(d,e,f){return function(a){a=a||s.event;var b=mousePosition(a);d.h=b.y/e.offsetHeight*360+hueOffset;d.s=d.v=1;var c=hsv2rgb({h:d.h,s:1,v:1});f.style.backgroundColor=c.hex;d.callback&&d.callback(c.hex,{h:d.h-hueOffset,s:d.s,v:d.v},{r:c.r,g:c.g,b:c.b},u,b)}};function pickerListener(d,e){return function(a){a=a||s.event;var b=mousePosition(a),width=e.offsetWidth,height=e.offsetHeight;d.s=b.x/width;d.v=(height-b.y)/height;var c=hsv2rgb(d);d.callback&&d.callback(c.hex,{h:d.h-hueOffset,s:d.s,v:d.v},{r:c.r,g:c.g,b:c.b},b)}};var x=0;function ColorPicker(f,g,h){if(!(this instanceof ColorPicker))return new ColorPicker(f,g,h);this.h=0;this.s=1;this.v=1;if(!h){var i=f;i.innerHTML=w;this.slideElement=i.getElementsByClassName('slide')[0];this.pickerElement=i.getElementsByClassName('picker')[0];var j=i.getElementsByClassName('slide-indicator')[0];var k=i.getElementsByClassName('picker-indicator')[0];ColorPicker.fixIndicators(j,k);this.callback=function(a,b,c,d,e){ColorPicker.positionIndicators(j,k,e,d);g(a,b,c)}}else{this.callback=h;this.pickerElement=g;this.slideElement=f}if(v=='SVG'){var l=slide.cloneNode(true);var m=picker.cloneNode(true);var n=l.getElementById('gradient-hsv');var o=l.getElementsByTagName('rect')[0];n.id='gradient-hsv-'+x;o.setAttribute('fill','url(#'+n.id+')');var p=[m.getElementById('gradient-black'),m.getElementById('gradient-white')];var q=m.getElementsByTagName('rect');p[0].id='gradient-black-'+x;p[1].id='gradient-white-'+x;q[0].setAttribute('fill','url(#'+p[1].id+')');q[1].setAttribute('fill','url(#'+p[0].id+')');this.slideElement.appendChild(l);this.pickerElement.appendChild(m);x++}else{this.slideElement.innerHTML=slide;this.pickerElement.innerHTML=picker}addEventListener(this.slideElement,'click',slideListener(this,this.slideElement,this.pickerElement));addEventListener(this.pickerElement,'click',pickerListener(this,this.pickerElement));enableDragging(this,this.slideElement,slideListener(this,this.slideElement,this.pickerElement));enableDragging(this,this.pickerElement,pickerListener(this,this.pickerElement))};function addEventListener(a,b,c){if(a.attachEvent){a.attachEvent('on'+b,c)}else if(a.addEventListener){a.addEventListener(b,c,false)}}function enableDragging(b,c,d){var e=false;addEventListener(c,'mousedown',function(a){e=true});addEventListener(c,'mouseup',function(a){e=false});addEventListener(c,'mouseout',function(a){e=false});addEventListener(c,'mousemove',function(a){if(e){d(a)}})}ColorPicker.hsv2rgb=function(a){var b=hsv2rgb(a);delete b.hex;return b};ColorPicker.hsv2hex=function(a){return hsv2rgb(a).hex};ColorPicker.rgb2hsv=rgb2hsv;ColorPicker.rgb2hex=function(a){return hsv2rgb(rgb2hsv(a)).hex};ColorPicker.hex2hsv=function(a){return rgb2hsv(ColorPicker.hex2rgb(a))};ColorPicker.hex2rgb=function(a){return{r:parseInt(a.substr(1,2),16),g:parseInt(a.substr(3,2),16),b:parseInt(a.substr(5,2),16)}};function setColor(a,b,d,e){a.h=b.h%360;a.s=b.s;a.v=b.v;var c=hsv2rgb(a);var f={y:(a.h*a.slideElement.offsetHeight)/360,x:0};var g=a.pickerElement.offsetHeight;var h={x:a.s*a.pickerElement.offsetWidth,y:g-a.v*g};a.pickerElement.style.backgroundColor=hsv2rgb({h:a.h,s:1,v:1}).hex;a.callback&&a.callback(e||c.hex,{h:a.h,s:a.s,v:a.v},d||{r:c.r,g:c.g,b:c.b},h,f);return a};ColorPicker.prototype.setHsv=function(a){return setColor(this,a)};ColorPicker.prototype.setRgb=function(a){return setColor(this,rgb2hsv(a),a)};ColorPicker.prototype.setHex=function(a){return setColor(this,ColorPicker.hex2hsv(a),u,a)};ColorPicker.positionIndicators=function(a,b,c,d){if(c){b.style.left='auto';b.style.right='0px';b.style.top='0px';a.style.top=(c.y-a.offsetHeight/2)+'px'}if(d){b.style.top=(d.y-b.offsetHeight/2)+'px';b.style.left=(d.x-b.offsetWidth/2)+'px'}};ColorPicker.fixIndicators=function(a,b){b.style.pointerEvents='none';a.style.pointerEvents='none'};s.ColorPicker=ColorPicker})(window,window.document);
/*
AngularJS v1.3.0-beta.5
(c) 2010-2014 Google, Inc. http://angularjs.org
License: MIT
*/
(function(O,U,s){'use strict';function v(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.3.0-beta.5/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function db(b){if(null==b||Da(b))return!1;
var a=b.length;return 1===b.nodeType&&a?!0:t(b)||M(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(P(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(db(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Tb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function ad(b,
a,c){for(var d=Tb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Ub(b){return function(a,c){b(c,a)}}function eb(){for(var b=ka.length,a;b;){b--;a=ka[b].charCodeAt(0);if(57==a)return ka[b]="A",ka.join("");if(90==a)ka[b]="0";else return ka[b]=String.fromCharCode(a+1),ka.join("")}ka.unshift("0");return ka.join("")}function Vb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function A(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Vb(b,a);return b}function Y(b){return parseInt(b,
10)}function Wb(b,a){return A(new (A(function(){},{prototype:b})),a)}function C(){}function Ea(b){return b}function aa(b){return function(){return b}}function D(b){return"undefined"===typeof b}function B(b){return"undefined"!==typeof b}function X(b){return null!=b&&"object"===typeof b}function t(b){return"string"===typeof b}function Ab(b){return"number"===typeof b}function ra(b){return"[object Date]"===ya.call(b)}function M(b){return"[object Array]"===ya.call(b)}function P(b){return"function"===typeof b}
function fb(b){return"[object RegExp]"===ya.call(b)}function Da(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function bd(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function cd(b,a,c){var d=[];q(b,function(b,g,f){d.push(a.call(c,b,g,f))});return d}function gb(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Fa(b,a){var c=gb(b,a);0<=c&&b.splice(c,1);return a}function ba(b,a){if(Da(b)||b&&b.$evalAsync&&b.$watch)throw Oa("cpws");
if(a){if(b===a)throw Oa("cpi");if(M(b))for(var c=a.length=0;c<b.length;c++)a.push(ba(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ba(b[d]);Vb(a,c)}}else(a=b)&&(M(b)?a=ba(b,[]):ra(b)?a=new Date(b.getTime()):fb(b)?a=RegExp(b.source):X(b)&&(a=ba(b,{})));return a}function Xb(b,a){a=a||{};for(var c in b)!b.hasOwnProperty(c)||"$"===c.charAt(0)&&"$"===c.charAt(1)||(a[c]=b[c]);return a}function za(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;
var c=typeof b,d;if(c==typeof a&&"object"==c)if(M(b)){if(!M(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!za(b[d],a[d]))return!1;return!0}}else{if(ra(b))return ra(a)&&b.getTime()==a.getTime();if(fb(b)&&fb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||Da(b)||Da(a)||M(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!P(b[d])){if(!za(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==s&&!P(a[d]))return!1;
return!0}return!1}function Yb(){return U.securityPolicy&&U.securityPolicy.isActive||U.querySelector&&!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"))}function hb(b,a){var c=2<arguments.length?sa.call(arguments,2):[];return!P(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(sa.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function dd(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=
s:Da(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function ta(b,a){return"undefined"===typeof b?s:JSON.stringify(b,dd,a?"  ":null)}function Zb(b){return t(b)?JSON.parse(b):b}function Pa(b){"function"===typeof b?b=!0:b&&0!==b.length?(b=I(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=y(b).clone();try{b.empty()}catch(a){}var c=y("<div>").append(b).html();try{return 3===b[0].nodeType?I(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
function(a,b){return"<"+I(b)})}catch(d){return I(c)}}function $b(b){try{return decodeURIComponent(b)}catch(a){}}function ac(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=$b(c[0]),B(d)&&(b=B(c[1])?$b(c[1]):!0,a[d]?M(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function bc(b){var a=[];q(b,function(b,d){M(b)?q(b,function(b){a.push(Aa(d,!0)+(!0===b?"":"="+Aa(b,!0)))}):a.push(Aa(d,!0)+(!0===b?"":"="+Aa(b,!0)))});return a.length?a.join("&"):""}function Bb(b){return Aa(b,
!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function Aa(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function ed(b,a){function c(a){a&&d.push(a)}var d=[b],e,g,f=["ng:app","ng-app","x-ng-app","data-ng-app"],h=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(f,function(a){f[a]=!0;c(U.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+
a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=h.exec(" "+a.className+" ");b?(e=a,g=(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&f[b.name]&&(e=a,g=b.value)})}});e&&a(e,g?[g]:[])}function cc(b,a){var c=function(){b=y(b);if(b.injector()){var c=b[0]===U?"document":ha(b);throw Oa("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=dc(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",
function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;if(O&&!d.test(O.name))return c();O.name=O.name.replace(d,"");Qa.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function ib(b,a){a=a||"_";return b.replace(fd,function(b,d){return(d?a:"")+b.toLowerCase()})}function Cb(b,a,c){if(!b)throw Oa("areq",a||"?",c||"required");return b}function Ra(b,a,c){c&&M(b)&&(b=b[b.length-1]);Cb(P(b),a,"not a function, got "+(b&&"object"==typeof b?
b.constructor.name||"Object":typeof b));return b}function Ba(b,a){if("hasOwnProperty"===b)throw Oa("badname",a);}function ec(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,g=a.length,f=0;f<g;f++)d=a[f],b&&(b=(e=b)[d]);return!c&&P(b)?hb(e,b):b}function Db(b){var a=b[0];b=b[b.length-1];if(a===b)return y(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return y(c)}function gd(b){var a=v("$injector"),c=v("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||v;return b.module||
(b.module=function(){var b={};return function(e,g,f){if("hasOwnProperty"===e)throw c("badname","module");g&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!g)throw a("nomod",e);var c=[],d=[],l=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:g,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide",
"constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:l,run:function(a){d.push(a);return this}};f&&l(f);return n}())}}())}function hd(b){A(b,{bootstrap:cc,copy:ba,extend:A,equals:za,element:y,forEach:q,injector:dc,noop:C,bind:hb,toJson:ta,fromJson:Zb,identity:Ea,isUndefined:D,isDefined:B,isString:t,isFunction:P,isObject:X,isNumber:Ab,isElement:bd,isArray:M,
version:id,isDate:ra,lowercase:I,uppercase:Ga,callbacks:{counter:0},$$minErr:v,$$csp:Yb});Sa=gd(O);try{Sa("ngLocale")}catch(a){Sa("ngLocale",[]).provider("$locale",jd)}Sa("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:kd});a.provider("$compile",fc).directive({a:ld,input:gc,textarea:gc,form:md,script:nd,select:od,style:pd,option:qd,ngBind:rd,ngBindHtml:sd,ngBindTemplate:td,ngClass:ud,ngClassEven:vd,ngClassOdd:wd,ngCloak:xd,ngController:yd,ngForm:zd,ngHide:Ad,ngIf:Bd,ngInclude:Cd,
ngInit:Dd,ngNonBindable:Ed,ngPluralize:Fd,ngRepeat:Gd,ngShow:Hd,ngStyle:Id,ngSwitch:Jd,ngSwitchWhen:Kd,ngSwitchDefault:Ld,ngOptions:Md,ngTransclude:Nd,ngModel:Od,ngList:Pd,ngChange:Qd,required:hc,ngRequired:hc,ngValue:Rd}).directive({ngInclude:Sd}).directive(Eb).directive(ic);a.provider({$anchorScroll:Td,$animate:Ud,$browser:Vd,$cacheFactory:Wd,$controller:Xd,$document:Yd,$exceptionHandler:Zd,$filter:jc,$interpolate:$d,$interval:ae,$http:be,$httpBackend:ce,$location:de,$log:ee,$parse:fe,$rootScope:ge,
$q:he,$sce:ie,$sceDelegate:je,$sniffer:ke,$templateCache:le,$timeout:me,$window:ne,$$rAF:oe,$$asyncCallback:pe})}])}function Ta(b){return b.replace(qe,function(a,b,d,e){return e?d.toUpperCase():d}).replace(re,"Moz$1")}function Fb(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],m=a,k,l,n,p,r,u;if(!d||null!=b)for(;e.length;)for(k=e.shift(),l=0,n=k.length;l<n;l++)for(p=y(k[l]),m?p.triggerHandler("$destroy"):m=!m,r=0,p=(u=p.children()).length;r<p;r++)e.push(Ha(u[r]));return g.apply(this,arguments)}
var g=Ha.fn[b],g=g.$original||g;e.$original=g;Ha.fn[b]=e}function se(b,a){var c,d,e=a.createDocumentFragment(),g=[];if(Gb.test(b)){c=c||e.appendChild(a.createElement("div"));d=(te.exec(b)||["",""])[1].toLowerCase();d=ea[d]||ea._default;c.innerHTML=d[1]+b.replace(ue,"<$1></$2>")+d[2];for(d=d[0];d--;)c=c.lastChild;g=g.concat(sa.call(c.childNodes,void 0));c=e.firstChild;c.textContent=""}else g.push(a.createTextNode(b));e.textContent="";e.innerHTML="";q(g,function(a){e.appendChild(a)});return e}function N(b){if(b instanceof
N)return b;t(b)&&(b=ca(b));if(!(this instanceof N)){if(t(b)&&"<"!=b.charAt(0))throw Hb("nosel");return new N(b)}if(t(b)){var a;a=U;var c;b=(c=ve.exec(b))?[a.createElement(c[1])]:(c=se(b,a))?c.childNodes:[]}kc(this,b)}function Ib(b){return b.cloneNode(!0)}function Ia(b){lc(b);var a=0;for(b=b.childNodes||[];a<b.length;a++)Ia(b[a])}function mc(b,a,c,d){if(B(d))throw Hb("offargs");var e=la(b,"events");la(b,"handle")&&(D(a)?q(e,function(a,c){Ua(b,c,a);delete e[c]}):q(a.split(" "),function(a){D(c)?(Ua(b,
a,e[a]),delete e[a]):Fa(e[a]||[],c)}))}function lc(b,a){var c=b[jb],d=Va[c];d&&(a?delete Va[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),mc(b)),delete Va[c],b[jb]=s))}function la(b,a,c){var d=b[jb],d=Va[d||-1];if(B(c))d||(b[jb]=d=++we,d=Va[d]={}),d[a]=c;else return d&&d[a]}function nc(b,a,c){var d=la(b,"data"),e=B(c),g=!e&&B(a),f=g&&!X(a);d||f||la(b,"data",d={});if(e)d[a]=c;else if(g){if(f)return d&&d[a];A(d,a)}else return d}function Jb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||
"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function kb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",ca((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+ca(a)+" "," ")))})}function lb(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=ca(a);-1===c.indexOf(" "+a+" ")&&(c+=a+" ")});b.setAttribute("class",ca(c))}}function kc(b,a){if(a){a=a.nodeName||!B(a.length)||
Da(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function oc(b,a){return mb(b,"$"+(a||"ngController")+"Controller")}function mb(b,a,c){b=y(b);9==b[0].nodeType&&(b=b.find("html"));for(a=M(a)?a:[a];b.length;){for(var d=b[0],e=0,g=a.length;e<g;e++)if((c=b.data(a[e]))!==s)return c;b=y(d.parentNode||11===d.nodeType&&d.host)}}function pc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ia(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}function qc(b,a){var c=nb[a.toLowerCase()];return c&&rc[b.nodeName]&&
c}function xe(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||U);if(D(c.defaultPrevented)){var g=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;g.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};var f=Xb(a[e||c.type]||[]);q(f,function(a){a.call(b,c)});8>=T?(c.preventDefault=
null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ja(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===s&&(c=b.$$hashKey=eb()):c=b;return a+":"+c}function Wa(b){q(b,this.put,this)}function sc(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(ye,""),c=c.match(ze),q(c[1].split(Ae),function(b){b.replace(Be,function(b,
c,d){a.push(d)})})),b.$inject=a):M(b)?(c=b.length-1,Ra(b[c],"fn"),a=b.slice(0,c)):Ra(b,"fn",!0);return a}function dc(b){function a(a){return function(b,c){if(X(b))q(b,Ub(a));else return a(b,c)}}function c(a,b){Ba(a,"service");if(P(b)||M(b))b=n.instantiate(b);if(!b.$get)throw Xa("pget",a);return l[a+h]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,g,h;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(t(a))for(c=Sa(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,
g=0,h=d.length;g<h;g++){var f=d[g],m=n.get(f[0]);m[f[1]].apply(m,f[2])}else P(a)?b.push(n.invoke(a)):M(a)?b.push(n.invoke(a)):Ra(a,"module")}catch(l){throw M(a)&&(a=a[a.length-1]),l.message&&(l.stack&&-1==l.stack.indexOf(l.message))&&(l=l.message+"\n"+l.stack),Xa("modulerr",a,l.stack||l.message||l);}}});return b}function g(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===f)throw Xa("cdep",m.join(" <- "));return a[d]}try{return m.unshift(d),a[d]=f,a[d]=b(d)}catch(e){throw a[d]===f&&delete a[d],
e;}finally{m.shift()}}function d(a,b,e){var g=[],h=sc(a),f,m,k;m=0;for(f=h.length;m<f;m++){k=h[m];if("string"!==typeof k)throw Xa("itkn",k);g.push(e&&e.hasOwnProperty(k)?e[k]:c(k))}a.$inject||(a=a[f]);return a.apply(b,g)}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(M(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return X(e)||P(e)?e:c},get:c,annotate:sc,has:function(b){return l.hasOwnProperty(b+h)||a.hasOwnProperty(b)}}}var f={},h="Provider",m=[],k=new Wa,l={$provide:{provider:a(c),
factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,aa(b))}),constant:a(function(a,b){Ba(a,"constant");l[a]=b;p[a]=b}),decorator:function(a,b){var c=n.get(a+h),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},n=l.$injector=g(l,function(){throw Xa("unpr",m.join(" <- "));}),p={},r=p.$injector=g(p,function(a){a=n.get(a+h);return r.invoke(a.$get,a)});q(e(b),function(a){r.invoke(a||
C)});return r}function Td(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==I(a.nodeName)||(b=a)});return b}function g(){var b=c.hash(),d;b?(d=f.getElementById(b))?d.scrollIntoView():(d=e(f.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var f=a.document;b&&d.$watch(function(){return c.hash()},function(){d.$evalAsync(g)});return g}]}function pe(){this.$get=
["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function Ce(b,a,c,d){function e(a){try{a.apply(null,sa.call(arguments,1))}finally{if(u--,0===u)for(;z.length;)try{z.pop()()}catch(b){c.error(b)}}}function g(a,b){(function S(){q(K,function(a){a()});w=b(S,a)})()}function f(){x=null;H!=h.url()&&(H=h.url(),q(ma,function(a){a(h.url())}))}var h=this,m=a[0],k=b.location,l=b.history,n=b.setTimeout,p=b.clearTimeout,r={};h.isMock=!1;var u=0,z=[];h.$$completeOutstandingRequest=
e;h.$$incOutstandingRequestCount=function(){u++};h.notifyWhenNoOutstandingRequests=function(a){q(K,function(a){a()});0===u?a():z.push(a)};var K=[],w;h.addPollFn=function(a){D(w)&&g(100,n);K.push(a);return a};var H=k.href,G=a.find("base"),x=null;h.url=function(a,c){k!==b.location&&(k=b.location);l!==b.history&&(l=b.history);if(a){if(H!=a)return H=a,d.history?c?l.replaceState(null,"",a):(l.pushState(null,"",a),G.attr("href",G.attr("href"))):(x=a,c?k.replace(a):k.href=a),h}else return x||k.href.replace(/%27/g,
"'")};var ma=[],L=!1;h.onUrlChange=function(a){if(!L){if(d.history)y(b).on("popstate",f);if(d.hashchange)y(b).on("hashchange",f);else h.addPollFn(f);L=!0}ma.push(a);return a};h.baseHref=function(){var a=G.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var Q={},da="",E=h.baseHref();h.cookies=function(a,b){var d,e,g,h;if(a)b===s?m.cookie=escape(a)+"=;path="+E+";expires=Thu, 01 Jan 1970 00:00:00 GMT":t(b)&&(d=(m.cookie=escape(a)+"="+escape(b)+";path="+E).length+1,4096<d&&c.warn("Cookie '"+
a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(m.cookie!==da)for(da=m.cookie,d=da.split("; "),Q={},g=0;g<d.length;g++)e=d[g],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),Q[a]===s&&(Q[a]=unescape(e.substring(h+1))));return Q}};h.defer=function(a,b){var c;u++;c=n(function(){delete r[c];e(a)},b||0);r[c]=!0;return c};h.defer.cancel=function(a){return r[a]?(delete r[a],p(a),e(C),!0):!1}}function Vd(){this.$get=["$window","$log","$sniffer","$document",
function(b,a,c,d){return new Ce(b,d,a,c)}]}function Wd(){this.$get=function(){function b(b,d){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,g(a.n,a.p),g(a,n),n=a,n.n=null)}function g(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw v("$cacheFactory")("iid",b);var f=0,h=A({},d,{id:b}),m={},k=d&&d.capacity||Number.MAX_VALUE,l={},n=null,p=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=l[a]||(l[a]={key:a});e(c)}if(!D(b))return a in m||f++,m[a]=b,f>k&&this.remove(p.key),b},get:function(a){if(k<
Number.MAX_VALUE){var b=l[a];if(!b)return;e(b)}return m[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=l[a];if(!b)return;b==n&&(n=b.p);b==p&&(p=b.n);g(b.n,b.p);delete l[a]}delete m[a];f--},removeAll:function(){m={};f=0;l={};n=p=null},destroy:function(){l=h=m=null;delete a[b]},info:function(){return A({},h,{size:f})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};return b}}function le(){this.$get=["$cacheFactory",function(b){return b("templates")}]}
function fc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,g=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,f=/^(on[a-z]+|formaction)$/;this.directive=function m(a,e){Ba(a,"directive");t(a)?(Cb(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];q(c[a],function(c,g){try{var f=b.invoke(c);P(f)?f={compile:aa(f)}:!f.compile&&f.link&&(f.compile=aa(f.link));f.priority=f.priority||0;f.index=g;f.name=f.name||a;f.require=f.require||
f.controller&&f.name;f.restrict=f.restrict||"A";e.push(f)}catch(m){d(m)}});return e}])),c[a].push(e)):q(a,Ub(m));return this};this.aHrefSanitizationWhitelist=function(b){return B(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate","$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope",
"$document","$sce","$animate","$$sanitizeUri",function(a,b,l,n,p,r,u,z,K,w,H,G){function x(a,b,c,d,e){a instanceof y||(a=y(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var g=L(a,b,a,c,d,e);ma(a,"ng-scope");return function(b,c,d){Cb(b,"scope");var e=c?Ka.clone.call(a):a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var f=e.length;d<f;d++){var m=e[d].nodeType;1!==m&&9!==m||e.eq(d).data("$scope",b)}c&&c(e,b);g&&g(b,e,e);return e}}
function ma(a,b){try{a.addClass(b)}catch(c){}}function L(a,b,c,d,e,g){function f(a,c,d,e){var g,k,l,n,r,p,u;g=c.length;var J=Array(g);for(r=0;r<g;r++)J[r]=c[r];u=r=0;for(p=m.length;r<p;u++)k=J[u],c=m[r++],g=m[r++],l=y(k),c?(c.scope?(n=a.$new(),l.data("$scope",n)):n=a,(l=c.transclude)||!e&&b?c(g,n,k,d,Q(a,l||b)):c(g,n,k,d,e)):g&&g(a,k.childNodes,s,e)}for(var m=[],k,l,n,r,p=0;p<a.length;p++)k=new Kb,l=da(a[p],[],k,0===p?d:s,e),(g=l.length?ia(l,a[p],k,b,c,null,[],[],g):null)&&g.scope&&ma(y(a[p]),"ng-scope"),
k=g&&g.terminal||!(n=a[p].childNodes)||!n.length?null:L(n,g?g.transclude:b),m.push(g,k),r=r||g||k,g=null;return r?f:null}function Q(a,b){return function(c,d,e){var g=!1;c||(c=a.$new(),g=c.$$transcluded=!0);d=b(c,d,e);if(g)d.on("$destroy",hb(c,c.$destroy));return d}}function da(a,b,c,d,f){var m=c.$attr,k;switch(a.nodeType){case 1:S(b,na(La(a).toLowerCase()),"E",d,f);var l,n,r;k=a.attributes;for(var p=0,u=k&&k.length;p<u;p++){var z=!1,K=!1;l=k[p];if(!T||8<=T||l.specified){n=l.name;r=na(n);W.test(r)&&
(n=ib(r.substr(6),"-"));var H=r.replace(/(Start|End)$/,"");r===H+"Start"&&(z=n,K=n.substr(0,n.length-5)+"end",n=n.substr(0,n.length-6));r=na(n.toLowerCase());m[r]=n;c[r]=l=ca(l.value);qc(a,r)&&(c[r]=!0);N(a,b,l,r);S(b,r,"A",d,f,z,K)}}a=a.className;if(t(a)&&""!==a)for(;k=g.exec(a);)r=na(k[2]),S(b,r,"C",d,f)&&(c[r]=ca(k[3])),a=a.substr(k.index+k[0].length);break;case 3:v(b,a.nodeValue);break;case 8:try{if(k=e.exec(a.nodeValue))r=na(k[1]),S(b,r,"M",d,f)&&(c[r]=ca(k[2]))}catch(x){}}b.sort(D);return b}
function E(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function R(a,b,c){return function(d,e,g,f,k){e=E(e[0],b,c);return a(d,e,g,f,k)}}function ia(a,c,d,e,g,f,m,n,p){function z(a,b,c,d){if(a){c&&(a=R(a,c,d));a.require=F.require;if(Q===F||F.$$isolateScope)a=uc(a,{isolateScope:!0});m.push(a)}if(b){c&&(b=R(b,c,d));b.require=F.require;
if(Q===F||F.$$isolateScope)b=uc(b,{isolateScope:!0});n.push(b)}}function K(a,b,c){var d,e="data",g=!1;if(t(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),g=g||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+a+"Controller");if(!d&&!g)throw ja("ctreq",a,v);}else M(a)&&(d=[],q(a,function(a){d.push(K(a,b,c))}));return d}function H(a,e,g,f,p){function z(a,b){var c;2>arguments.length&&(b=a,a=s);A&&(c=da);return p(a,b,c)}var J,x,w,G,R,E,da={},ob;J=c===g?d:Xb(d,new Kb(y(g),
d.$attr));x=J.$$element;if(Q){var S=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=y(g);E=e.$new(!0);ia&&ia===Q.$$originalDirective?f.data("$isolateScope",E):f.data("$isolateScopeNoTemplate",E);ma(f,"ng-isolate-scope");q(Q.scope,function(a,c){var d=a.match(S)||[],g=d[3]||c,f="?"==d[2],d=d[1],m,l,n,p;E.$$isolateBindings[c]=d+g;switch(d){case "@":J.$observe(g,function(a){E[c]=a});J.$$observers[g].$$scope=e;J[g]&&(E[c]=b(J[g])(e));break;case "=":if(f&&!J[g])break;l=r(J[g]);p=l.literal?za:function(a,b){return a===
b};n=l.assign||function(){m=E[c]=l(e);throw ja("nonassign",J[g],Q.name);};m=E[c]=l(e);E.$watch(function(){var a=l(e);p(a,E[c])||(p(a,m)?n(e,a=E[c]):E[c]=a);return m=a},null,l.literal);break;case "&":l=r(J[g]);E[c]=function(a){return l(e,a)};break;default:throw ja("iscp",Q.name,c,a);}})}ob=p&&z;L&&q(L,function(a){var b={$scope:a===Q||a.$$isolateScope?E:e,$element:x,$attrs:J,$transclude:ob},c;R=a.controller;"@"==R&&(R=J[a.name]);c=u(R,b);da[a.name]=c;A||x.data("$"+a.name+"Controller",c);a.controllerAs&&
(b.$scope[a.controllerAs]=c)});f=0;for(w=m.length;f<w;f++)try{G=m[f],G(G.isolateScope?E:e,x,J,G.require&&K(G.require,x,da),ob)}catch(F){l(F,ha(x))}f=e;Q&&(Q.template||null===Q.templateUrl)&&(f=E);a&&a(f,g.childNodes,s,p);for(f=n.length-1;0<=f;f--)try{G=n[f],G(G.isolateScope?E:e,x,J,G.require&&K(G.require,x,da),ob)}catch(B){l(B,ha(x))}}p=p||{};for(var w=-Number.MAX_VALUE,G,L=p.controllerDirectives,Q=p.newIsolateScopeDirective,ia=p.templateDirective,S=p.nonTlbTranscludeDirective,D=!1,A=p.hasElementTranscludeDirective,
Z=d.$$element=y(c),F,v,V,Ya=e,O,N=0,oa=a.length;N<oa;N++){F=a[N];var T=F.$$start,W=F.$$end;T&&(Z=E(c,T,W));V=s;if(w>F.priority)break;if(V=F.scope)G=G||F,F.templateUrl||(I("new/isolated scope",Q,F,Z),X(V)&&(Q=F));v=F.name;!F.templateUrl&&F.controller&&(V=F.controller,L=L||{},I("'"+v+"' controller",L[v],F,Z),L[v]=F);if(V=F.transclude)D=!0,F.$$tlb||(I("transclusion",S,F,Z),S=F),"element"==V?(A=!0,w=F.priority,V=E(c,T,W),Z=d.$$element=y(U.createComment(" "+v+": "+d[v]+" ")),c=Z[0],pb(g,y(sa.call(V,0)),
c),Ya=x(V,e,w,f&&f.name,{nonTlbTranscludeDirective:S})):(V=y(Ib(c)).contents(),Z.empty(),Ya=x(V,e));if(F.template)if(I("template",ia,F,Z),ia=F,V=P(F.template)?F.template(Z,d):F.template,V=Y(V),F.replace){f=F;V=Gb.test(V)?y(V):[];c=V[0];if(1!=V.length||1!==c.nodeType)throw ja("tplrt",v,"");pb(g,Z,c);oa={$attr:{}};V=da(c,[],oa);var $=a.splice(N+1,a.length-(N+1));Q&&tc(V);a=a.concat(V).concat($);B(d,oa);oa=a.length}else Z.html(V);if(F.templateUrl)I("template",ia,F,Z),ia=F,F.replace&&(f=F),H=C(a.splice(N,
a.length-N),Z,d,g,Ya,m,n,{controllerDirectives:L,newIsolateScopeDirective:Q,templateDirective:ia,nonTlbTranscludeDirective:S}),oa=a.length;else if(F.compile)try{O=F.compile(Z,d,Ya),P(O)?z(null,O,T,W):O&&z(O.pre,O.post,T,W)}catch(aa){l(aa,ha(Z))}F.terminal&&(H.terminal=!0,w=Math.max(w,F.priority))}H.scope=G&&!0===G.scope;H.transclude=D&&Ya;p.hasElementTranscludeDirective=A;return H}function tc(a){for(var b=0,c=a.length;b<c;b++)a[b]=Wb(a[b],{$$isolateScope:!0})}function S(b,e,g,f,k,n,r){if(e===k)return null;
k=null;if(c.hasOwnProperty(e)){var p;e=a.get(e+d);for(var u=0,z=e.length;u<z;u++)try{p=e[u],(f===s||f>p.priority)&&-1!=p.restrict.indexOf(g)&&(n&&(p=Wb(p,{$$start:n,$$end:r})),b.push(p),k=p)}catch(K){l(K)}}return k}function B(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,g){"class"==g?(ma(e,b),a["class"]=(a["class"]?a["class"]+" ":"")+b):"style"==g?(e.attr("style",e.attr("style")+";"+b),a.style=
(a.style?a.style+";":"")+b):"$"==g.charAt(0)||a.hasOwnProperty(g)||(a[g]=b,d[g]=c[g])})}function C(a,b,c,d,e,g,f,k){var m=[],l,r,u=b[0],z=a.shift(),K=A({},z,{templateUrl:null,transclude:null,replace:null,$$originalDirective:z}),x=P(z.templateUrl)?z.templateUrl(b,c):z.templateUrl;b.empty();n.get(w.getTrustedResourceUrl(x),{cache:p}).success(function(n){var p,H;n=Y(n);if(z.replace){n=Gb.test(n)?y(n):[];p=n[0];if(1!=n.length||1!==p.nodeType)throw ja("tplrt",z.name,x);n={$attr:{}};pb(d,b,p);var w=da(p,
[],n);X(z.scope)&&tc(w);a=w.concat(a);B(c,n)}else p=u,b.html(n);a.unshift(K);l=ia(a,p,c,e,b,z,g,f,k);q(d,function(a,c){a==p&&(d[c]=b[0])});for(r=L(b[0].childNodes,e);m.length;){n=m.shift();H=m.shift();var G=m.shift(),R=m.shift(),w=b[0];if(H!==u){var E=H.className;k.hasElementTranscludeDirective&&z.replace||(w=Ib(p));pb(G,y(H),w);ma(y(w),E)}H=l.transclude?Q(n,l.transclude):R;l(r,n,w,d,H)}m=null}).error(function(a,b,c,d){throw ja("tpload",d.url);});return function(a,b,c,d,e){m?(m.push(b),m.push(c),
m.push(d),m.push(e)):l(r,b,c,d,e)}}function D(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function I(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ha(d));}function v(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:aa(function(a,b){var c=b.parent(),e=c.data("$binding")||[];e.push(d);ma(c.data("$binding",e),"ng-binding");a.$watch(d,function(a){b[0].nodeValue=a})})})}function O(a,b){if("srcdoc"==b)return w.HTML;var c=La(a);if("xlinkHref"==b||
"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return w.RESOURCE_URL}function N(a,c,d,e){var g=b(d,!0);if(g){if("multiple"===e&&"SELECT"===La(a))throw ja("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,m){d=m.$$observers||(m.$$observers={});if(f.test(e))throw ja("nodomevents");if(g=b(m[e],!0,O(a,e)))m[e]=g(c),(d[e]||(d[e]=[])).$$inter=!0,(m.$$observers&&m.$$observers[e].$$scope||c).$watch(g,function(a,b){"class"===e&&a!=b?m.$updateClass(a,b):m.$set(e,a)})}}}})}}
function pb(a,b,c){var d=b[0],e=b.length,g=d.parentNode,f,m;if(a)for(f=0,m=a.length;f<m;f++)if(a[f]==d){a[f++]=c;m=f+e-1;for(var k=a.length;f<k;f++,m++)m<k?a[f]=a[m]:delete a[f];a.length-=e-1;break}g&&g.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);c[y.expando]=d[y.expando];d=1;for(e=b.length;d<e;d++)g=b[d],y(g).remove(),a.appendChild(g),delete b[d];b[0]=c;b.length=1}function uc(a,b){return A(function(){return a.apply(null,arguments)},a,b)}var Kb=function(a,b){this.$$element=a;this.$attr=
b||{}};Kb.prototype={$normalize:na,$addClass:function(a){a&&0<a.length&&H.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&H.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=vc(a,b),d=vc(b,a);0===c.length?H.removeClass(this.$$element,d):0===d.length?H.addClass(this.$$element,c):H.setClass(this.$$element,c,d)},$set:function(a,b,c,d){var e=qc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=d:(d=this.$attr[a])||(this.$attr[a]=d=ib(a,
"-"));e=La(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=G(b,"src"===a);!1!==c&&(null===b||b===s?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){l(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);z.$evalAsync(function(){e.$$inter||b(c[a])});return function(){Fa(e,b)}}};var Z=b.startSymbol(),oa=b.endSymbol(),Y="{{"==Z||"}}"==oa?Ea:function(a){return a.replace(/\{\{/g,
Z).replace(/}}/g,oa)},W=/^ngAttr[A-Z]/;return x}]}function na(b){return Ta(b.replace(De,""))}function vc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),g=0;a:for(;g<d.length;g++){for(var f=d[g],h=0;h<e.length;h++)if(f==e[h])continue a;c+=(0<c.length?" ":"")+f}return c}function Xd(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){Ba(a,"controller");X(a)?A(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,g){var f,h,m;t(e)&&(f=e.match(a),h=f[1],m=f[3],e=
b.hasOwnProperty(h)?b[h]:ec(g.$scope,h,!0)||ec(d,h,!0),Ra(e,h,!0));f=c.instantiate(e,g);if(m){if(!g||"object"!=typeof g.$scope)throw v("$controller")("noscp",h||e.name,m);g.$scope[m]=f}return f}}]}function Yd(){this.$get=["$window",function(b){return y(b.document)}]}function Zd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function wc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=b.indexOf(":");c=I(ca(b.substr(0,e)));d=ca(b.substr(e+1));c&&(a[c]=
a[c]?a[c]+(", "+d):d)});return a}function xc(b){var a=X(b)?b:s;return function(c){a||(a=wc(b));return c?a[I(c)]||null:a}}function yc(b,a,c){if(P(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function be(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){t(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Zb(d)));return d}],transformRequest:[function(a){return X(a)&&"[object File]"!==ya.call(a)&&
"[object Blob]"!==ya.call(a)?ta(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ba(d),put:ba(d),patch:ba(d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},g=this.interceptors=[],f=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,p){function r(a){function c(a){var b=A({},a,{data:yc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?b:n.reject(b)}var d={method:"get",
transformRequest:e.transformRequest,transformResponse:e.transformResponse},g=function(a){function b(a){var c;q(a,function(b,d){P(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=A({},a.headers),g,f,c=A({},c.common,c[I(a.method)]);b(c);b(d);a:for(g in c){a=I(g);for(f in d)if(I(f)===a)continue a;d[g]=c[g]}return d}(a);A(d,a);d.headers=g;d.method=Ga(d.method);(a=Lb(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:s)&&(g[d.xsrfHeaderName||e.xsrfHeaderName]=a);var f=[function(a){g=a.headers;
var b=yc(a.data,xc(g),a.transformRequest);D(a.data)&&q(g,function(a,b){"content-type"===I(b)&&delete g[b]});D(a.withCredentials)&&!D(e.withCredentials)&&(a.withCredentials=e.withCredentials);return u(a,b,g).then(c,c)},s],h=n.when(d);for(q(w,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),h=h.then(a,k)}h.success=function(a){h.then(function(b){a(b.data,b.status,b.headers,
d)});return h};h.error=function(a){h.then(null,function(b){a(b.data,b.status,b.headers,d)});return h};return h}function u(b,c,g){function f(a,b,c,e){w&&(200<=a&&300>a?w.put(s,[a,b,wc(c),e]):w.remove(s));m(b,a,c,e);d.$$phase||d.$apply()}function m(a,c,d,e){c=Math.max(c,0);(200<=c&&300>c?p.resolve:p.reject)({data:a,status:c,headers:xc(d),config:b,statusText:e})}function k(){var a=gb(r.pendingRequests,b);-1!==a&&r.pendingRequests.splice(a,1)}var p=n.defer(),u=p.promise,w,q,s=z(b.url,b.params);r.pendingRequests.push(b);
u.then(k,k);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==b.method)&&(w=X(b.cache)?b.cache:X(e.cache)?e.cache:K);if(w)if(q=w.get(s),B(q)){if(q.then)return q.then(k,k),q;M(q)?m(q[1],q[0],ba(q[2]),q[3]):m(q,200,{},"OK")}else w.put(s,u);D(q)&&a(b.method,s,c,f,g,b.timeout,b.withCredentials,b.responseType);return u}function z(a,b){if(!b)return a;var c=[];ad(b,function(a,b){null===a||D(a)||(M(a)||(a=[a]),q(a,function(a){X(a)&&(a=ta(a));c.push(Aa(b)+"="+Aa(a))}))});0<c.length&&(a+=(-1==a.indexOf("?")?"?":"&")+
c.join("&"));return a}var K=c("$http"),w=[];q(g,function(a){w.unshift(t(a)?p.get(a):p.invoke(a))});q(f,function(a,b){var c=t(a)?p.get(a):p.invoke(a);w.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});r.pendingRequests=[];(function(a){q(arguments,function(a){r[a]=function(b,c){return r(A(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){r[a]=function(b,c,d){return r(A(d||{},{method:a,url:b,data:c}))}})})("post",
"put");r.defaults=e;return r}]}function Ee(b){if(8>=T&&(!b.match(/^(get|post|head|put|delete|options)$/i)||!O.XMLHttpRequest))return new O.ActiveXObject("Microsoft.XMLHTTP");if(O.XMLHttpRequest)return new O.XMLHttpRequest;throw v("$httpBackend")("noxhr");}function ce(){this.$get=["$browser","$window","$document",function(b,a,c){return Fe(b,Ee,b.defer,a.angular.callbacks,c[0])}]}function Fe(b,a,c,d,e){function g(a,b,c){var g=e.createElement("script"),f=null;g.type="text/javascript";g.src=a;g.async=
!0;f=function(a){Ua(g,"load",f);Ua(g,"error",f);e.body.removeChild(g);g=null;var h=-1,u="unknown";a&&("load"!==a.type||d[b].called||(a={type:"error"}),u=a.type,h="error"===a.type?404:200);c&&c(h,u)};qb(g,"load",f);qb(g,"error",f);e.body.appendChild(g);return f}var f=-1;return function(e,m,k,l,n,p,r,u){function z(){w=f;G&&G();x&&x.abort()}function K(a,d,e,g,f){L&&c.cancel(L);G=x=null;0===d&&(d=e?200:"file"==ua(m).protocol?404:0);a(1223===d?204:d,e,g,f||"");b.$$completeOutstandingRequest(C)}var w;b.$$incOutstandingRequestCount();
m=m||b.url();if("jsonp"==I(e)){var H="_"+(d.counter++).toString(36);d[H]=function(a){d[H].data=a;d[H].called=!0};var G=g(m.replace("JSON_CALLBACK","angular.callbacks."+H),H,function(a,b){K(l,a,d[H].data,"",b);d[H]=C})}else{var x=a(e);x.open(e,m,!0);q(n,function(a,b){B(a)&&x.setRequestHeader(b,a)});x.onreadystatechange=function(){if(x&&4==x.readyState){var a=null,b=null;w!==f&&(a=x.getAllResponseHeaders(),b="response"in x?x.response:x.responseText);K(l,w||x.status,b,a,x.statusText||"")}};r&&(x.withCredentials=
!0);if(u)try{x.responseType=u}catch(s){if("json"!==u)throw s;}x.send(k||null)}if(0<p)var L=c(z,p);else p&&p.then&&p.then(z)}}function $d(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function g(g,k,l){for(var n,p,r=0,u=[],z=g.length,K=!1,w=[];r<z;)-1!=(n=g.indexOf(b,r))&&-1!=(p=g.indexOf(a,n+f))?(r!=n&&u.push(g.substring(r,n)),u.push(r=c(K=g.substring(n+f,p))),
r.exp=K,r=p+h,K=!0):(r!=z&&u.push(g.substring(r)),r=z);(z=u.length)||(u.push(""),z=1);if(l&&1<u.length)throw zc("noconcat",g);if(!k||K)return w.length=z,r=function(a){try{for(var b=0,c=z,f;b<c;b++)"function"==typeof(f=u[b])&&(f=f(a),f=l?e.getTrusted(l,f):e.valueOf(f),null===f||D(f)?f="":"string"!=typeof f&&(f=ta(f))),w[b]=f;return w.join("")}catch(h){a=zc("interr",g,h.toString()),d(a)}},r.exp=g,r.parts=u,r}var f=b.length,h=a.length;g.startSymbol=function(){return b};g.endSymbol=function(){return a};
return g}]}function ae(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,f,h,m){var k=a.setInterval,l=a.clearInterval,n=c.defer(),p=n.promise,r=0,u=B(m)&&!m;h=B(h)?h:0;p.then(null,null,d);p.$$intervalId=k(function(){n.notify(r++);0<h&&r>=h&&(n.resolve(r),l(p.$$intervalId),delete e[p.$$intervalId]);u||b.$apply()},f);e[p.$$intervalId]=n;return p}var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],
!0):!1};return d}]}function jd(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function Ac(b){b=b.split("/");for(var a=b.length;a--;)b[a]=Bb(b[a]);return b.join("/")}function Bc(b,a,c){b=ua(b,c);a.$$protocol=
b.protocol;a.$$host=b.hostname;a.$$port=Y(b.port)||Ge[b.protocol]||null}function Cc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=ua(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=ac(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function pa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Za(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Mb(b){return b.substr(0,
Za(b).lastIndexOf("/")+1)}function Dc(b,a){this.$$html5=!0;a=a||"";var c=Mb(b);Bc(b,this,b);this.$$parse=function(a){var e=pa(c,a);if(!t(e))throw Nb("ipthprfx",a,c);Cc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=bc(this.$$search),b=this.$$hash?"#"+Bb(this.$$hash):"";this.$$url=Ac(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=pa(b,d))!==s)return d=e,(e=pa(a,e))!==s?c+(pa("/",e)||e):b+d;if((e=pa(c,
d))!==s)return c+e;if(c==d+"/")return c}}function Ob(b,a){var c=Mb(b);Bc(b,this,b);this.$$parse=function(d){var e=pa(b,d)||pa(c,d),e="#"==e.charAt(0)?pa(a,e):this.$$html5?e:"";if(!t(e))throw Nb("ihshprfx",d,a);Cc(e,this,b);d=this.$$path;var g=/^\/?.*?:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));g.exec(e)||(d=(e=g.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=bc(this.$$search),e=this.$$hash?"#"+Bb(this.$$hash):"";this.$$url=Ac(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=
b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Za(b)==Za(a))return a}}function Ec(b,a){this.$$html5=!0;Ob.apply(this,arguments);var c=Mb(b);this.$$rewrite=function(d){var e;if(b==Za(d))return d;if(e=pa(c,d))return b+a+e;if(c===d+"/")return c}}function rb(b){return function(){return this[b]}}function Fc(b,a){return function(c){if(D(c))return this[b];this[b]=a(c);this.$$compose();return this}}function de(){var b="",a=!1;this.hashPrefix=function(a){return B(a)?(b=a,this):b};this.html5Mode=
function(b){return B(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,g){function f(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,m=d.baseHref(),k=d.url();a?(m=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(m||"/"),e=e.history?Dc:Ec):(m=Za(k),e=Ob);h=new e(m,"#"+b);h.$$parse(h.$$rewrite(k));g.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=y(a.target);"a"!==I(b[0].nodeName);)if(b[0]===g[0]||!(b=b.parent())[0])return;
var e=b.prop("href");X(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=ua(e.animVal).href);var f=h.$$rewrite(e);e&&(!b.attr("target")&&f&&!a.isDefaultPrevented())&&(a.preventDefault(),f!=d.url()&&(h.$$parse(f),c.$apply(),O.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=k&&d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);c.$broadcast("$locationChangeStart",a,b).defaultPrevented?(h.$$parse(b),d.url(b)):f(b)}),c.$$phase||
c.$digest())});var l=0;c.$watch(function(){var a=d.url(),b=h.$$replace;l&&a==h.absUrl()||(l++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),f(a))}));h.$$replace=!1;return l});return h}]}function ee(){var b=!0,a=this;this.debugEnabled=function(a){return B(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:
a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||C;a=!1;try{a=!!e.apply}catch(m){}return a?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function fa(b,a){if("constructor"===b)throw Ca("isecfld",a);return b}function $a(b,
a){if(b){if(b.constructor===b)throw Ca("isecfn",a);if(b.document&&b.location&&b.alert&&b.setInterval)throw Ca("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw Ca("isecdom",a);}return b}function sb(b,a,c,d,e){e=e||{};a=a.split(".");for(var g,f=0;1<a.length;f++){g=fa(a.shift(),d);var h=b[g];h||(h={},b[g]=h);b=h;b.then&&e.unwrapPromises&&(va(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===s&&(b.$$v={}),b=b.$$v)}g=fa(a.shift(),d);return b[g]=c}function Gc(b,
a,c,d,e,g,f){fa(b,g);fa(a,g);fa(c,g);fa(d,g);fa(e,g);return f.unwrapPromises?function(f,m){var k=m&&m.hasOwnProperty(b)?m:f,l;if(null==k)return k;(k=k[b])&&k.then&&(va(g),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!a)return k;if(null==k)return s;(k=k[a])&&k.then&&(va(g),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!c)return k;if(null==k)return s;(k=k[c])&&k.then&&(va(g),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!d)return k;if(null==
k)return s;(k=k[d])&&k.then&&(va(g),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);if(!e)return k;if(null==k)return s;(k=k[e])&&k.then&&(va(g),"$$v"in k||(l=k,l.$$v=s,l.then(function(a){l.$$v=a})),k=k.$$v);return k}:function(g,f){var k=f&&f.hasOwnProperty(b)?f:g;if(null==k)return k;k=k[b];if(!a)return k;if(null==k)return s;k=k[a];if(!c)return k;if(null==k)return s;k=k[c];if(!d)return k;if(null==k)return s;k=k[d];return e?null==k?s:k=k[e]:k}}function He(b,a){fa(b,a);return function(a,
d){return null==a?s:(d&&d.hasOwnProperty(b)?d:a)[b]}}function Ie(b,a,c){fa(b,c);fa(a,c);return function(c,e){if(null==c)return s;c=(e&&e.hasOwnProperty(b)?e:c)[b];return null==c?s:c[a]}}function Hc(b,a,c){if(Pb.hasOwnProperty(b))return Pb[b];var d=b.split("."),e=d.length,g;if(a.unwrapPromises||1!==e)if(a.unwrapPromises||2!==e)if(a.csp)g=6>e?Gc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,g){var f=0,h;do h=Gc(d[f++],d[f++],d[f++],d[f++],d[f++],c,a)(b,g),g=s,b=h;while(f<e);return h};else{var f="var p;\n";
q(d,function(b,d){fa(b,c);f+="if(s == null) return undefined;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':"")});var f=f+"return s;",h=new Function("s","k","pw",f);h.toString=aa(f);g=a.unwrapPromises?function(a,b){return h(a,b,va)}:h}else g=Ie(d[0],d[1],c);else g=He(d[0],c);"hasOwnProperty"!==
b&&(Pb[b]=g);return g}function fe(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return B(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return B(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;va=function(b){a.logPromiseWarnings&&!Ic.hasOwnProperty(b)&&(Ic[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};
return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Qb(a);e=(new ab(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return C}}}]}function he(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return Je(function(a){b.$evalAsync(a)},a)}]}function Je(b,a){function c(a){return a}function d(a){return f(a)}var e=function(){var f=[],k,l;return l={resolve:function(a){if(f){var c=f;f=s;k=g(a);c.length&&b(function(){for(var a,
b=0,d=c.length;b<d;b++)a=c[b],k.then(a[0],a[1],a[2])})}},reject:function(a){l.resolve(h(a))},notify:function(a){if(f){var c=f;f.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,g,h){var l=e(),z=function(d){try{l.resolve((P(b)?b:c)(d))}catch(e){l.reject(e),a(e)}},K=function(b){try{l.resolve((P(g)?g:d)(b))}catch(c){l.reject(c),a(c)}},w=function(b){try{l.notify((P(h)?h:c)(b))}catch(d){a(d)}};f?f.push([z,K,w]):k.then(z,K,w);return l.promise},"catch":function(a){return this.then(null,
a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,g){var f=null;try{f=(a||c)()}catch(h){return b(h,!1)}return f&&P(f.then)?f.then(function(){return b(e,g)},function(a){return b(a,!1)}):b(e,g)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},g=function(a){return a&&P(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},f=function(a){var b=e();b.reject(a);return b.promise},h=function(c){return{then:function(g,
f){var h=e();b(function(){try{h.resolve((P(f)?f:d)(c))}catch(b){h.reject(b),a(b)}});return h.promise}}};return{defer:e,reject:f,when:function(h,k,l,n){var p=e(),r,u=function(b){try{return(P(k)?k:c)(b)}catch(d){return a(d),f(d)}},z=function(b){try{return(P(l)?l:d)(b)}catch(c){return a(c),f(c)}},K=function(b){try{return(P(n)?n:c)(b)}catch(d){a(d)}};b(function(){g(h).then(function(a){r||(r=!0,p.resolve(g(a).then(u,z,K)))},function(a){r||(r=!0,p.resolve(z(a)))},function(a){r||p.notify(K(a))})});return p.promise},
all:function(a){var b=e(),c=0,d=M(a)?[]:{};q(a,function(a,e){c++;g(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function oe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,g=e?
function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};g.supported=e;return g}]}function ge(){var b=10,a=v("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,g,f){function h(){this.$id=eb();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;
this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings={}}function m(b){if(p.$$phase)throw a("inprog",p.$$phase);p.$$phase=b}function k(a,b){var c=g(a);Ra(c,b);return c}function l(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}h.prototype={constructor:h,$new:function(a){a?(a=new h,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=
this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=eb());a["this"]=a;a.$$listeners={};a.$$listenerCount={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=k(a,"watch"),g=this.$$watchers,f={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;if(!P(b)){var h=k(b||C,"listener");f.fn=function(a,
b,c){h(c)}}if("string"==typeof a&&e.constant){var m=f.fn;f.fn=function(a,b,c){m.call(this,a,b,c);Fa(g,f)}}g||(g=this.$$watchers=[]);g.unshift(f);return function(){Fa(g,f);c=null}},$watchCollection:function(a,b){var c=this,d,e,f,h=1<b.length,k=0,m=g(a),l=[],n={},p=!0,q=0;return this.$watch(function(){d=m(c);var a,b;if(X(d))if(db(d))for(e!==l&&(e=l,q=e.length=0,k++),a=d.length,q!==a&&(k++,e.length=q=a),b=0;b<a;b++)e[b]!==e[b]&&d[b]!==d[b]||e[b]===d[b]||(k++,e[b]=d[b]);else{e!==n&&(e=n={},q=0,k++);a=
0;for(b in d)d.hasOwnProperty(b)&&(a++,e.hasOwnProperty(b)?e[b]!==d[b]&&(k++,e[b]=d[b]):(q++,e[b]=d[b],k++));if(q>a)for(b in k++,e)e.hasOwnProperty(b)&&!d.hasOwnProperty(b)&&(q--,delete e[b])}else e!==d&&(e=d,k++);return k},function(){p?(p=!1,b(d,d,c)):b(d,f,c);if(h)if(X(d))if(db(d)){f=Array(d.length);for(var a=0;a<d.length;a++)f[a]=d[a]}else for(a in f={},d)Jc.call(d,a)&&(f[a]=d[a]);else f=d})},$digest:function(){var d,g,f,h,k=this.$$asyncQueue,l=this.$$postDigestQueue,q,x,s=b,L,Q=[],y,E,R;m("$digest");
c=null;do{x=!1;for(L=this;k.length;){try{R=k.shift(),R.scope.$eval(R.expression)}catch(B){p.$$phase=null,e(B)}c=null}a:do{if(h=L.$$watchers)for(q=h.length;q--;)try{if(d=h[q])if((g=d.get(L))!==(f=d.last)&&!(d.eq?za(g,f):"number"==typeof g&&"number"==typeof f&&isNaN(g)&&isNaN(f)))x=!0,c=d,d.last=d.eq?ba(g):g,d.fn(g,f===n?g:f,L),5>s&&(y=4-s,Q[y]||(Q[y]=[]),E=P(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,E+="; newVal: "+ta(g)+"; oldVal: "+ta(f),Q[y].push(E));else if(d===c){x=!1;break a}}catch(t){p.$$phase=
null,e(t)}if(!(h=L.$$childHead||L!==this&&L.$$nextSibling))for(;L!==this&&!(h=L.$$nextSibling);)L=L.$parent}while(L=h);if((x||k.length)&&!s--)throw p.$$phase=null,a("infdig",b,ta(Q));}while(x||k.length);for(p.$$phase=null;l.length;)try{l.shift()()}catch(S){e(S)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==p&&(q(this.$$listenerCount,hb(null,l,this)),a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&
(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=C,this.$on=this.$watch=function(){return C})}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){p.$$phase||
p.$$asyncQueue.length||f.defer(function(){p.$$asyncQueue.length&&p.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return m("$apply"),this.$eval(a)}catch(b){e(b)}finally{p.$$phase=null;try{p.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);
var e=this;return function(){c[gb(c,b)]=null;l(e,1,a)}},$emit:function(a,b){var c=[],d,g=this,f=!1,h={name:a,targetScope:g,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},k=[h].concat(sa.call(arguments,1)),m,l;do{d=g.$$listeners[a]||c;h.currentScope=g;m=0;for(l=d.length;m<l;m++)if(d[m])try{d[m].apply(null,k)}catch(n){e(n)}else d.splice(m,1),m--,l--;if(f)break;g=g.$parent}while(g);return h},$broadcast:function(a,b){for(var c=this,d=this,g={name:a,
targetScope:this,preventDefault:function(){g.defaultPrevented=!0},defaultPrevented:!1},f=[g].concat(sa.call(arguments,1)),h,k;c=d;){g.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(m){e(m)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}return g}};var p=new h;return p}]}function kd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*(https?|ftp|file|blob):|data:image\//;
this.aHrefSanitizationWhitelist=function(a){return B(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,g;if(!T||8<=T)if(g=ua(c).href,""!==g&&!g.match(e))return"unsafe:"+g;return c}}}function Ke(b){if("self"===b)return b;if(t(b)){if(-1<b.indexOf("***"))throw wa("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+
b+"$")}if(fb(b))return RegExp("^"+b.source+"$");throw wa("imatcher");}function Kc(b){var a=[];B(b)&&q(b,function(b){a.push(Ke(b))});return a}function je(){this.SCE_CONTEXTS=ga;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Kc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Kc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=
function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw wa("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var g=d(),f={};f[ga.HTML]=d(g);f[ga.CSS]=d(g);f[ga.URL]=d(g);f[ga.JS]=d(g);f[ga.RESOURCE_URL]=d(f[ga.URL]);return{trustAs:function(a,b){var c=f.hasOwnProperty(a)?f[a]:null;if(!c)throw wa("icontext",a,b);if(null===b||b===s||""===b)return b;if("string"!==typeof b)throw wa("itype",a);return new c(b)},
getTrusted:function(c,d){if(null===d||d===s||""===d)return d;var g=f.hasOwnProperty(c)?f[c]:null;if(g&&d instanceof g)return d.$$unwrapTrustedValue();if(c===ga.RESOURCE_URL){var g=ua(d.toString()),l,n,p=!1;l=0;for(n=b.length;l<n;l++)if("self"===b[l]?Lb(g):b[l].exec(g.href)){p=!0;break}if(p)for(l=0,n=a.length;l<n;l++)if("self"===a[l]?Lb(g):a[l].exec(g.href)){p=!1;break}if(p)return d;throw wa("insecurl",d.toString());}if(c===ga.HTML)return e(d);throw wa("unsafe");},valueOf:function(a){return a instanceof
g?a.$$unwrapTrustedValue():a}}}]}function ie(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw wa("iequirks");var e=ba(ga);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Ea);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,
d(a,c))}};var g=e.parseAs,f=e.getTrusted,h=e.trustAs;q(ga,function(a,b){var c=I(b);e[Ta("parse_as_"+c)]=function(b){return g(a,b)};e[Ta("get_trusted_"+c)]=function(b){return f(a,b)};e[Ta("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function ke(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(I((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),g=a[0]||{},f=g.documentMode,h,m=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=g.body&&g.body.style,
l=!1,n=!1;if(k){for(var p in k)if(l=m.exec(p)){h=l[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in k&&"webkit");l=!!("transition"in k||h+"Transition"in k);n=!!("animation"in k||h+"Animation"in k);!d||l&&n||(l=t(g.body.style.webkitTransition),n=t(g.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!f||7<f),hasEvent:function(a){if("input"==a&&9==T)return!1;if(D(c[a])){var b=g.createElement("div");c[a]="on"+
a in b}return c[a]},csp:Yb(),vendorPrefix:h,transitions:l,animations:n,android:d,msie:T,msieDocumentMode:f}}]}function me(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,h,m){var k=c.defer(),l=k.promise,n=B(m)&&!m;h=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete g[l.$$timeoutId]}n||b.$apply()},h);l.$$timeoutId=h;g[h]=k;return l}var g={};e.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),
delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function ua(b,a){var c=b;T&&(W.setAttribute("href",c),c=W.href);W.setAttribute("href",c);return{href:W.href,protocol:W.protocol?W.protocol.replace(/:$/,""):"",host:W.host,search:W.search?W.search.replace(/^\?/,""):"",hash:W.hash?W.hash.replace(/^#/,""):"",hostname:W.hostname,port:W.port,pathname:"/"===W.pathname.charAt(0)?W.pathname:"/"+W.pathname}}function Lb(b){b=t(b)?ua(b):b;return b.protocol===Lc.protocol&&b.host===Lc.host}
function ne(){this.$get=aa(O)}function jc(b){function a(d,e){if(X(d)){var g={};q(d,function(b,c){g[c]=a(c,b)});return g}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Mc);a("date",Nc);a("filter",Le);a("json",Me);a("limitTo",Ne);a("lowercase",Oe);a("number",Oc);a("orderBy",Pc);a("uppercase",Pe)}function Le(){return function(b,a,c){if(!M(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;
return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Qa.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Jc.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var g=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!g(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,
b);default:for(var d in a)if("$"!==d.charAt(0)&&g(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(g(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var f in a)(function(b){"undefined"!=typeof a[b]&&e.push(function(c){return g("$"==b?c:c&&c[b],a[b])})})(f);break;case "function":e.push(a);break;default:return b}d=[];for(f=0;f<b.length;f++){var h=b[f];e.check(h)&&d.push(h)}return d}}function Mc(b){var a=
b.NUMBER_FORMATS;return function(b,d){D(d)&&(d=a.CURRENCY_SYM);return Qc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Oc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Qc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Qc(b,a,c,d,e){if(null==b||!isFinite(b)||X(b))return"";var g=0>b;b=Math.abs(b);var f=b+"",h="",m=[],k=!1;if(-1!==f.indexOf("e")){var l=f.match(/([\d\.]+)e(-?)(\d+)/);l&&"-"==l[2]&&l[3]>e+1?f="0":(h=f,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));
else{f=(f.split(Rc)[1]||"").length;D(e)&&(e=Math.min(Math.max(a.minFrac,f),a.maxFrac));f=Math.pow(10,e);b=Math.round(b*f)/f;b=(""+b).split(Rc);f=b[0];b=b[1]||"";var l=0,n=a.lgSize,p=a.gSize;if(f.length>=n+p)for(l=f.length-n,k=0;k<l;k++)0===(l-k)%p&&0!==k&&(h+=c),h+=f.charAt(k);for(k=l;k<f.length;k++)0===(f.length-k)%n&&0!==k&&(h+=c),h+=f.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}m.push(g?a.negPre:a.posPre);m.push(h);m.push(g?a.negSuf:a.posSuf);return m.join("")}function tb(b,
a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return tb(e,a,d)}}function ub(b,a){return function(c,d){var e=c["get"+b](),g=Ga(a?"SHORT"+b:b);return d[g][e]}}function Sc(b){var a=(new Date(b,0,1)).getDay();return new Date(b,0,(4>=a?5:12)-a)}function Tc(b){return function(a){var c=Sc(a.getFullYear());a=+new Date(a.getFullYear(),a.getMonth(),a.getDate()+
(4-a.getDay()))-+c;a=1+Math.round(a/6048E5);return tb(a,b)}}function Nc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var g=0,f=0,h=b[8]?a.setUTCFullYear:a.setFullYear,m=b[8]?a.setUTCHours:a.setHours;b[9]&&(g=Y(b[9]+b[10]),f=Y(b[9]+b[11]));h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));g=Y(b[4]||0)-g;f=Y(b[5]||0)-f;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));m.call(a,g,f,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
return function(c,e){var g="",f=[],h,m;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;t(c)&&(c=Qe.test(c)?Y(c):a(c));Ab(c)&&(c=new Date(c));if(!ra(c))return c;for(;e;)(m=Re.exec(e))?(f=f.concat(sa.call(m,1)),e=f.pop()):(f.push(e),e=null);q(f,function(a){h=Se[a];g+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Me(){return function(b){return ta(b,!0)}}function Ne(){return function(b,a){if(!M(b)&&!t(b))return b;a=Y(a);if(t(b))return a?0<=a?b.slice(0,a):b.slice(a,
b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Pc(b){return function(a,c,d){function e(a,b){return Pa(b)?function(b,c){return a(c,b)}:a}function g(a,b){var c=typeof a,d=typeof b;return c==d?("string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!M(a)||!c)return a;c=M(c)?c:[c];c=cd(c,function(a){var c=!1,d=a||Ea;if(t(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c=
"-"==a.charAt(0),a=a.substring(1);d=b(a);if(d.constant){var f=d();return e(function(a,b){return g(a[f],b[f])},c)}}return e(function(a,b){return g(d(a),d(b))},c)});for(var f=[],h=0;h<a.length;h++)f.push(a[h]);return f.sort(e(function(a,b){for(var d=0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function xa(b){P(b)&&(b={link:b});b.restrict=b.restrict||"AC";return aa(b)}function Uc(b,a,c,d){function e(a,c){c=c?"-"+ib(c,"-"):"";d.removeClass(b,(a?vb:wb)+c);d.addClass(b,(a?wb:vb)+c)}
var g=this,f=b.parent().controller("form")||xb,h=0,m=g.$error={},k=[];g.$name=a.name||a.ngForm;g.$dirty=!1;g.$pristine=!0;g.$valid=!0;g.$invalid=!1;f.$addControl(g);b.addClass(Ma);e(!0);g.$addControl=function(a){Ba(a.$name,"input");k.push(a);a.$name&&(g[a.$name]=a)};g.$removeControl=function(a){a.$name&&g[a.$name]===a&&delete g[a.$name];q(m,function(b,c){g.$setValidity(c,!0,a)});Fa(k,a)};g.$setValidity=function(a,b,c){var d=m[a];if(b)d&&(Fa(d,c),d.length||(h--,h||(e(b),g.$valid=!0,g.$invalid=!1),
m[a]=!1,e(!0,a),f.$setValidity(a,!0,g)));else{h||e(b);if(d){if(-1!=gb(d,c))return}else m[a]=d=[],h++,e(!1,a),f.$setValidity(a,!1,g);d.push(c);g.$valid=!1;g.$invalid=!0}};g.$setDirty=function(){d.removeClass(b,Ma);d.addClass(b,yb);g.$dirty=!0;g.$pristine=!1;f.$setDirty()};g.$setPristine=function(){d.removeClass(b,yb);d.addClass(b,Ma);g.$dirty=!1;g.$pristine=!0;q(k,function(a){a.$setPristine()})}}function qa(b,a,c,d){b.$setValidity(a,c);return c?d:s}function Te(b,a,c){var d=c.prop("validity");X(d)&&
b.$parsers.push(function(c){if(b.$error[a]||!(d.badInput||d.customError||d.typeMismatch)||d.valueMissing)return c;b.$setValidity(a,!1)})}function bb(b,a,c,d,e,g){var f=a.prop("validity");if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});a.on("compositionend",function(){h=!1;m()})}var m=function(){if(!h){var e=a.val();Pa(c.ngTrim||"T")&&(e=ca(e));if(d.$viewValue!==e||f&&""===e&&!f.valueMissing)b.$$phase?d.$setViewValue(e):b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",
m);else{var k,l=function(){k||(k=g.defer(function(){m();k=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||l()});if(e.hasEvent("paste"))a.on("paste cut",l)}a.on("change",m);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?"":d.$viewValue)};var n=c.ngPattern;n&&((e=n.match(/^\/(.*)\/([gim]*)$/))?(n=RegExp(e[1],e[2]),e=function(a){return qa(d,"pattern",d.$isEmpty(a)||n.test(a),a)}):e=function(c){var e=b.$eval(n);if(!e||!e.test)throw v("ngPattern")("noregexp",n,
e,ha(a));return qa(d,"pattern",d.$isEmpty(c)||e.test(c),c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var p=Y(c.ngMinlength);e=function(a){return qa(d,"minlength",d.$isEmpty(a)||a.length>=p,a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var r=Y(c.ngMaxlength);e=function(a){return qa(d,"maxlength",d.$isEmpty(a)||a.length<=r,a)};d.$parsers.push(e);d.$formatters.push(e)}}function zb(b,a){return function(c){var d;return ra(c)?c:t(c)&&(b.lastIndex=0,c=b.exec(c))?(c.shift(),
d={yyyy:0,MM:1,dd:1,HH:0,mm:0},q(c,function(b,c){c<a.length&&(d[a[c]]=+b)}),new Date(d.yyyy,d.MM-1,d.dd,d.HH,d.mm)):NaN}}function cb(b,a,c,d){return function(e,g,f,h,m,k,l){bb(e,g,f,h,m,k);h.$parsers.push(function(d){if(h.$isEmpty(d))return h.$setValidity(b,!0),null;if(a.test(d))return h.$setValidity(b,!0),c(d);h.$setValidity(b,!1);return s});h.$formatters.push(function(a){return ra(a)?l("date")(a,d):""});f.min&&(e=function(a){var b=h.$isEmpty(a)||c(a)>=c(f.min);h.$setValidity("min",b);return b?a:
s},h.$parsers.push(e),h.$formatters.push(e));f.max&&(e=function(a){var b=h.$isEmpty(a)||c(a)<=c(f.max);h.$setValidity("max",b);return b?a:s},h.$parsers.push(e),h.$formatters.push(e))}}function Rb(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],l=0;l<b.length;l++)if(e==b[l])continue a;c.push(e)}return c}function e(a){if(!M(a)){if(t(a))return a.split(" ");if(X(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b}}return a}return{restrict:"AC",
link:function(g,f,h){function m(a,b){var c=f.data("$classCounts")||{},d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});f.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||g.$index%2===a){var k=e(b||[]);if(!l){var r=m(k,1);h.$addClass(r)}else if(!za(b,l)){var q=e(l),r=d(k,q),k=d(q,k),k=m(k,-1),r=m(r,1);0===r.length?c.removeClass(f,k):0===k.length?c.addClass(f,r):c.setClass(f,r,k)}}l=ba(b)}var l;g.$watch(h[b],k,!0);h.$observe("class",function(a){k(g.$eval(h[b]))});
"ngClass"!==b&&g.$watch("$index",function(c,d){var f=c&1;if(f!==d&1){var k=e(g.$eval(h[b]));f===a?(f=m(k,1),h.$addClass(f)):(f=m(k,-1),h.$removeClass(f))}})}}}]}var I=function(b){return t(b)?b.toLowerCase():b},Jc=Object.prototype.hasOwnProperty,Ga=function(b){return t(b)?b.toUpperCase():b},T,y,Ha,sa=[].slice,Ue=[].push,ya=Object.prototype.toString,Oa=v("ng"),Qa=O.angular||(O.angular={}),Sa,La,ka=["0","0","0"];T=Y((/msie (\d+)/.exec(I(navigator.userAgent))||[])[1]);isNaN(T)&&(T=Y((/trident\/.*; rv:(\d+)/.exec(I(navigator.userAgent))||
[])[1]));C.$inject=[];Ea.$inject=[];var ca=function(){return String.prototype.trim?function(b){return t(b)?b.trim():b}:function(b){return t(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();La=9>T?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Ga(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var fd=/[A-Z]/g,id={full:"1.3.0-beta.5",major:1,minor:3,dot:0,codeName:"chimeric-glitterfication"},Va=N.cache={},jb=N.expando="ng-"+
(new Date).getTime(),we=1,qb=O.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Ua=O.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};N._data=function(b){return this.cache[b[this.expando]]||{}};var qe=/([\:\-\_]+(.))/g,re=/^moz([A-Z])/,Hb=v("jqLite"),ve=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Gb=/<|&#?\w+;/,te=/<([\w:]+)/,ue=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
ea={option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ea.optgroup=ea.option;ea.tbody=ea.tfoot=ea.colgroup=ea.caption=ea.thead;ea.th=ea.td;var Ka=N.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),N(O).on("load",a))},
toString:function(){var b=[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Ue,sort:[].sort,splice:[].splice},nb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){nb[I(b)]=b});var rc={};q("input select option textarea button form details".split(" "),function(b){rc[Ga(b)]=!0});q({data:nc,inheritedData:mb,scope:function(b){return y(b).data("$scope")||mb(b.parentNode||b,["$isolateScope",
"$scope"])},isolateScope:function(b){return y(b).data("$isolateScope")||y(b).data("$isolateScopeNoTemplate")},controller:oc,injector:function(b){return mb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Jb,css:function(b,a,c){a=Ta(a);if(B(c))b.style[a]=c;else{var d;8>=T&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=T&&(d=""===d?s:d);return d}},attr:function(b,a,c){var d=I(a);if(nb[d])if(B(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));
else return b[a]||(b.attributes.getNamedItem(a)||C).specified?d:s;else if(B(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?s:b},prop:function(b,a,c){if(B(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(D(d))return e?b[e]:"";b[e]=d}var a=[];9>T?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(D(a)){if("SELECT"===La(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(D(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ia(d[c]);b.innerHTML=a},empty:pc},function(b,a){N.prototype[a]=function(a,d){var e,g;if(b!==pc&&(2==b.length&&b!==Jb&&b!==oc?a:d)===s){if(X(a)){for(e=0;e<this.length;e++)if(b===nc)b(this[e],a);else for(g in a)b(this[e],g,a[g]);return this}e=b.$dv;g=e===s?Math.min(this.length,1):this.length;for(var f=0;f<g;f++){var h=b(this[f],a,d);e=
e?e+h:h}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:lc,dealoc:Ia,on:function a(c,d,e,g){if(B(g))throw Hb("onargs");var f=la(c,"events"),h=la(c,"handle");f||la(c,"events",f={});h||la(c,"handle",h=xe(c,f));q(d.split(" "),function(d){var g=f[d];if(!g){if("mouseenter"==d||"mouseleave"==d){var l=U.body.contains||U.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):
a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};f[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||l(this,c))||h(a,d)})}else qb(c,d,h),f[d]=[];g=f[d]}g.push(e)})},off:mc,one:function(a,c,d){a=y(a);a.on(c,function g(){a.off(c,d);a.off(c,g)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ia(a);q(new N(c),function(c){d?e.insertBefore(c,d.nextSibling):
e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){q(new N(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;q(new N(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ia(a);
var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new N(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:lb,removeClass:kb,toggleClass:function(a,c,d){c&&q(c.split(" "),function(c){var g=d;D(g)&&(g=!Jb(a,c));(g?lb:kb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?
a.getElementsByTagName(c):[]},clone:Ib,triggerHandler:function(a,c,d){c=(la(a,"events")||{})[c];d=d||[];var e=[{preventDefault:C,stopPropagation:C}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){N.prototype[c]=function(c,e,g){for(var f,h=0;h<this.length;h++)D(f)?(f=a(this[h],c,e,g),B(f)&&(f=y(f))):kc(f,a(this[h],c,e,g));return B(f)?f:this};N.prototype.bind=N.prototype.on;N.prototype.unbind=N.prototype.off});Wa.prototype={put:function(a,c){this[Ja(a)]=c},get:function(a){return this[Ja(a)]},
remove:function(a){var c=this[a=Ja(a)];delete this[a];return c}};var ze=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,Ae=/,/,Be=/^\s*(_?)(\S+?)\1\s*$/,ye=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Xa=v("$injector"),Ve=v("$animate"),Ud=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Ve("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?
a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",function(a,d){return{enter:function(a,c,f,h){f?f.after(a):c.prepend(a);h&&d(h)},leave:function(a,c){a.remove();c&&d(c)},move:function(a,c,d,h){this.enter(a,c,d,h)},addClass:function(a,c,f){c=t(c)?c:M(c)?c.join(" "):"";q(a,function(a){lb(a,c)});f&&d(f)},removeClass:function(a,c,f){c=t(c)?c:M(c)?c.join(" "):"";q(a,function(a){kb(a,c)});f&&d(f)},setClass:function(a,c,f,h){q(a,function(a){lb(a,c);kb(a,f)});h&&d(h)},enabled:C}}]}],
ja=v("$compile");fc.$inject=["$provide","$$sanitizeUriProvider"];var De=/^(x[\:\-_]|data[\:\-_])/i,zc=v("$interpolate"),We=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,Ge={http:80,https:443,ftp:21},Nb=v("$location");Ec.prototype=Ob.prototype=Dc.prototype={$$html5:!1,$$replace:!1,absUrl:rb("$$absUrl"),url:function(a,c){if(D(a))return this.$$url;var d=We.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:rb("$$protocol"),host:rb("$$host"),
port:rb("$$port"),path:Fc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(t(a))this.$$search=ac(a);else if(X(a))this.$$search=a;else throw Nb("isrcharg");break;default:D(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Fc("$$hash",Ea),replace:function(){this.$$replace=!0;return this}};var Ca=v("$parse"),Ic={},va,Na={"null":function(){return null},"true":function(){return!0},
"false":function(){return!1},undefined:C,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return B(d)?B(e)?d+e:d:B(e)?e:s},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(B(d)?d:0)-(B(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":C,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,
c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Xe={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},
Qb=function(a){this.options=a};Qb.prototype={constructor:Qb,lex:function(a){this.text=a;this.index=0;this.ch=s;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));
else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),g=Na[this.ch],f=Na[d],h=Na[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):f?(this.tokens.push({index:this.index,text:d,fn:f}),this.index+=2):g?(this.tokens.push({index:this.index,
text:this.ch,fn:g,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===
a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=B(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw Ca("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=I(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=
d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,g,f,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;
this.index++}if(e)for(g=this.index;g<this.text.length;){h=this.text.charAt(g);if("("===h){f=c.substr(e-d+1);c=c.substr(0,e-d);this.index=g;break}if(this.isWhitespace(h))g++;else break}d={index:d,text:c};if(Na.hasOwnProperty(c))d.fn=Na[c],d.json=Na[c];else{var m=Hc(c,this.options,this.text);d.fn=A(function(a,c){return m(a,c)},{assign:function(d,e){return sb(d,c,e,a.text,a.options)}})}this.tokens.push(d);f&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:f,json:!1}))},
readString:function(a){var c=this.index;this.index++;for(var d="",e=a,g=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),e=e+f;if(g)"u"===f?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d=(g=Xe[f])?d+g:d+f,g=!1;else if("\\"===f)g=!0;else{if(f===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=
f}this.index++}this.throwError("Unterminated quote",c)}};var ab=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};ab.ZERO=A(function(){return 0},{constant:!0});ab.prototype={constructor:ab,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&
this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?
(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw Ca("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw Ca("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var g=this.tokens[0],f=g.text;if(f===a||f===c||f===d||f===e||!(a||c||d||e))return g}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,
e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return A(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return A(function(e,g){return a(e,g)?c(e,g):d(e,g)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return A(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant})},
statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,g=0;g<a.length;g++){var f=a[g];f&&(e=f(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=
function(a,e,h){h=[h];for(var m=0;m<d.length;m++)h.push(d[m](a,e));return c.apply(a,h)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,g){return a.assign(d,c(d,g),g)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();
if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},
relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn(ab.ZERO,a.fn,
this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Hc(d,this.options,this.text);return A(function(c,d,h){return e(h||a(c,d))},{assign:function(e,f,h){return sb(a(e,h),d,f,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return A(function(e,g){var f=a(e,g),h=d(e,g),m;if(!f)return s;(f=$a(f[h],c.text))&&(f.then&&c.options.unwrapPromises)&&(m=f,"$$v"in f||(m.$$v=s,m.then(function(a){m.$$v=
a})),f=f.$$v);return f},{assign:function(e,g,f){var h=d(e,f);return $a(a(e,f),c.text)[h]=g}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(g,f){for(var h=[],m=c?c(g,f):g,k=0;k<d.length;k++)h.push(d[k](g,f));k=a(g,f,m)||C;$a(m,e.text);$a(k,e.text);h=k.apply?k.apply(m,h):k(h[0],h[1],h[2],h[3],h[4]);return $a(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return A(function(c,d){for(var f=[],h=0;h<a.length;h++)f.push(a[h](c,d));return f},{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return A(function(c,d){for(var e={},m=0;m<
a.length;m++){var k=a[m];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Pb={},wa=v("$sce"),ga={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},W=U.createElement("a"),Lc=ua(O.location.href,!0);jc.$inject=["$provide"];Mc.$inject=["$locale"];Oc.$inject=["$locale"];var Rc=".",Se={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:ub("Month"),MMM:ub("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",
1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:ub("Day"),EEE:ub("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(tb(Math[0<a?"floor":"ceil"](a/60),2)+tb(Math.abs(a%60),2))},ww:Tc(2),w:Tc(1)},Re=/((?:[^yMdHhmsaZEw']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z|w+))(.*)/,Qe=/^\-?\d+$/;Nc.$inject=["$locale"];var Oe=
aa(I),Pe=aa(Ga);Pc.$inject=["$parse"];var ld=aa({restrict:"E",compile:function(a,c){8>=T&&(c.href||c.name||c.$set("href",""),a.append(U.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var g="[object SVGAnimatedString]"===ya.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(g)||a.preventDefault()})}}}),Eb={};q(nb,function(a,c){if("multiple"!=a){var d=na("ng-"+c);Eb[d]=function(){return{priority:100,link:function(a,g,f){a.$watch(f[d],function(a){f.$set(c,
!!a)})}}}}});q(["src","srcset","href"],function(a){var c=na("ng-"+a);Eb[c]=function(){return{priority:99,link:function(d,e,g){var f=a,h=a;"href"===a&&"[object SVGAnimatedString]"===ya.call(e.prop("href"))&&(h="xlinkHref",g.$attr[h]="xlink:href",f=null);g.$observe(c,function(a){a&&(g.$set(h,a),T&&f&&e.prop(f,g[h]))})}}}});var xb={$addControl:C,$removeControl:C,$setValidity:C,$setDirty:C,$setPristine:C};Uc.$inject=["$element","$attrs","$scope","$animate"];var Vc=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:Uc,compile:function(){return{pre:function(a,e,g,f){if(!g.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};qb(e[0],"submit",h);e.on("$destroy",function(){c(function(){Ua(e[0],"submit",h)},0,!1)})}var m=e.parent().controller("form"),k=g.name||g.ngForm;k&&sb(a,k,f,k);if(m)e.on("$destroy",function(){m.$removeControl(f);k&&sb(a,k,s,k);A(f,xb)})}}}}}]},md=Vc(),zd=Vc(!0),Ye=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
Ze=/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,$e=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Wc=/^(\d{4})-(\d{2})-(\d{2})$/,Xc=/^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)$/,Sb=/^(\d{4})-W(\d\d)$/,Yc=/^(\d{4})-(\d\d)$/,Zc=/^(\d\d):(\d\d)$/,$c={text:bb,date:cb("date",Wc,zb(Wc,["yyyy","MM","dd"]),"yyyy-MM-dd"),"datetime-local":cb("datetimelocal",Xc,zb(Xc,["yyyy","MM","dd","HH","mm"]),"yyyy-MM-ddTHH:mm"),time:cb("time",Zc,zb(Zc,["HH","mm"]),"HH:mm"),week:cb("week",Sb,function(a){if(ra(a))return a;
if(t(a)){Sb.lastIndex=0;var c=Sb.exec(a);if(c){a=+c[1];var d=+c[2],c=Sc(a),d=7*(d-1);return new Date(a,0,c.getDate()+d)}}return NaN},"yyyy-Www"),month:cb("month",Yc,zb(Yc,["yyyy","MM"]),"yyyy-MM"),number:function(a,c,d,e,g,f){bb(a,c,d,e,g,f);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||$e.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return s});Te(e,"number",c);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=
parseFloat(d.min);return qa(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return qa(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return qa(e,"number",e.$isEmpty(a)||Ab(a),a)})},url:function(a,c,d,e,g,f){bb(a,c,d,e,g,f);a=function(a){return qa(e,"url",e.$isEmpty(a)||Ye.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,g,f){bb(a,c,d,e,g,f);
a=function(a){return qa(e,"email",e.$isEmpty(a)||Ze.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},radio:function(a,c,d,e){D(d.name)&&c.attr("name",eb());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var g=d.ngTrueValue,f=d.ngFalseValue;t(g)||(g=!0);t(f)||(f=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});
e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==g};e.$formatters.push(function(a){return a===g});e.$parsers.push(function(a){return a?g:f})},hidden:C,button:C,submit:C,reset:C,file:C},gc=["$browser","$sniffer","$filter",function(a,c,d){return{restrict:"E",require:"?ngModel",link:function(e,g,f,h){h&&($c[I(f.type)]||$c.text)(e,g,f,h,c,a,d)}}}],wb="ng-valid",vb="ng-invalid",Ma="ng-pristine",yb="ng-dirty",af=["$scope","$exceptionHandler","$attrs","$element","$parse",
"$animate",function(a,c,d,e,g,f){function h(a,c){c=c?"-"+ib(c,"-"):"";f.removeClass(e,(a?vb:wb)+c);f.addClass(e,(a?wb:vb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var m=g(d.ngModel),k=m.assign;if(!k)throw v("ngModel")("nonassign",d.ngModel,ha(e));this.$render=C;this.$isEmpty=function(a){return D(a)||""===a||null===a||a!==a};var l=e.inheritedData("$formController")||
xb,n=0,p=this.$error={};e.addClass(Ma);h(!0);this.$setValidity=function(a,c){p[a]!==!c&&(c?(p[a]&&n--,n||(h(!0),this.$valid=!0,this.$invalid=!1)):(h(!1),this.$invalid=!0,this.$valid=!1,n++),p[a]=!c,h(c,a),l.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=!0;f.removeClass(e,yb);f.addClass(e,Ma)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,f.removeClass(e,Ma),f.addClass(e,yb),l.$setDirty());q(this.$parsers,function(a){d=
a(d)});this.$modelValue!==d&&(this.$modelValue=d,k(a,d),q(this.$viewChangeListeners,function(a){try{a()}catch(d){c(d)}}))};var r=this;a.$watch(function(){var c=m(a);if(r.$modelValue!==c){var d=r.$formatters,e=d.length;for(r.$modelValue=c;e--;)c=d[e](c);r.$viewValue!==c&&(r.$viewValue=c,r.$render())}return c})}],Od=function(){return{require:["ngModel","^?form"],controller:af,link:function(a,c,d,e){var g=e[0],f=e[1]||xb;f.$addControl(g);a.$on("$destroy",function(){f.$removeControl(g)})}}},Qd=aa({require:"ngModel",
link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),hc=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var g=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(g);e.$parsers.unshift(g);d.$observe("required",function(){g(e.$viewValue)})}}}},Pd=function(){return{require:"ngModel",link:function(a,c,d,e){var g=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||
d.ngList||",";e.$parsers.push(function(a){if(!D(a)){var c=[];a&&q(a.split(g),function(a){a&&c.push(ca(a))});return c}});e.$formatters.push(function(a){return M(a)?a.join(", "):s});e.$isEmpty=function(a){return!a||!a.length}}}},bf=/^(true|false|\d+)$/,Rd=function(){return{priority:100,compile:function(a,c){return bf.test(c.ngValue)?function(a,c,g){g.$set("value",a.$eval(g.ngValue))}:function(a,c,g){a.$watch(g.ngValue,function(a){g.$set("value",a)})}}}},rd=xa(function(a,c,d){c.addClass("ng-binding").data("$binding",
d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==s?"":a)})}),td=["$interpolate",function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],sd=["$sce","$parse",function(a,c){return function(d,e,g){e.addClass("ng-binding").data("$binding",g.ngBindHtml);var f=c(g.ngBindHtml);d.$watch(function(){return(f(d)||"").toString()},function(c){e.html(a.getTrustedHtml(f(d))||"")})}}],ud=Rb("",!0),wd=
Rb("Odd",0),vd=Rb("Even",1),xd=xa({compile:function(a,c){c.$set("ngCloak",s);a.removeClass("ng-cloak")}}),yd=[function(){return{scope:!0,controller:"@",priority:500}}],ic={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=na("ng-"+a);ic[c]=["$parse",function(d){return{compile:function(e,g){var f=d(g[c]);return function(c,d,e){d.on(I(a),function(a){c.$apply(function(){f(c,{$event:a})})})}}}}]});
var Bd=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",$$tlb:!0,link:function(c,d,e,g,f){var h,m,k;c.$watch(e.ngIf,function(g){Pa(g)?m||(m=c.$new(),f(m,function(c){c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)})):(k&&(k.remove(),k=null),m&&(m.$destroy(),m=null),h&&(k=Db(h.clone),a.leave(k,function(){k=null}),h=null))})}}}],Cd=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,g){return{restrict:"ECA",
priority:400,terminal:!0,transclude:"element",controller:Qa.noop,compile:function(f,h){var m=h.ngInclude||h.src,k=h.onload||"",l=h.autoscroll;return function(f,h,r,q,z){var s=0,w,y,G,x=function(){y&&(y.remove(),y=null);w&&(w.$destroy(),w=null);G&&(e.leave(G,function(){y=null}),y=G,G=null)};f.$watch(g.parseAsResourceUrl(m),function(g){var m=function(){!B(l)||l&&!f.$eval(l)||d()},r=++s;g?(a.get(g,{cache:c}).success(function(a){if(r===s){var c=f.$new();q.template=a;a=z(c,function(a){x();e.enter(a,null,
h,m)});w=c;G=a;w.$emit("$includeContentLoaded");f.$eval(k)}}).error(function(){r===s&&x()}),f.$emit("$includeContentRequested")):(x(),q.template=null)})}}}}],Sd=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,g){d.html(g.template);a(d.contents())(c)}}}],Dd=xa({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),Ed=xa({terminal:!0,priority:1E3}),Fd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",
link:function(e,g,f){var h=f.count,m=f.$attr.when&&g.attr(f.$attr.when),k=f.offset||0,l=e.$eval(m)||{},n={},p=c.startSymbol(),r=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(f,function(a,c){s.test(c)&&(l[I(c.replace("when","").replace("Minus","-"))]=g.attr(f.$attr[c]))});q(l,function(a,e){n[e]=c(a.replace(d,p+h+"-"+k+r))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in l||(c=a.pluralCat(c-k));return n[c](e,g,!0)},function(a){g.text(a)})}}}],Gd=["$parse","$animate",function(a,
c){var d=v("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,link:function(e,g,f,h,m){var k=f.ngRepeat,l=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),n,p,r,s,z,B,w={$id:Ja};if(!l)throw d("iexp",k);f=l[1];h=l[2];(l=l[3])?(n=a(l),p=function(a,c,d){B&&(w[B]=a);w[z]=c;w.$index=d;return n(e,w)}):(r=function(a,c){return Ja(c)},s=function(a){return a});l=f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!l)throw d("iidexp",f);z=l[3]||l[1];
B=l[2];var H={};e.$watchCollection(h,function(a){var f,h,l=g[0],n,w={},E,R,t,C,S,v,D=[];if(db(a))S=a,n=p||r;else{n=p||s;S=[];for(t in a)a.hasOwnProperty(t)&&"$"!=t.charAt(0)&&S.push(t);S.sort()}E=S.length;h=D.length=S.length;for(f=0;f<h;f++)if(t=a===S?f:S[f],C=a[t],C=n(t,C,f),Ba(C,"`track by` id"),H.hasOwnProperty(C))v=H[C],delete H[C],w[C]=v,D[f]=v;else{if(w.hasOwnProperty(C))throw q(D,function(a){a&&a.scope&&(H[a.id]=a)}),d("dupes",k,C);D[f]={id:C};w[C]=!1}for(t in H)H.hasOwnProperty(t)&&(v=H[t],
f=Db(v.clone),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),v.scope.$destroy());f=0;for(h=S.length;f<h;f++){t=a===S?f:S[f];C=a[t];v=D[f];D[f-1]&&(l=D[f-1].clone[D[f-1].clone.length-1]);if(v.scope){R=v.scope;n=l;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);v.clone[0]!=n&&c.move(Db(v.clone),null,y(l));l=v.clone[v.clone.length-1]}else R=e.$new();R[z]=C;B&&(R[B]=t);R.$index=f;R.$first=0===f;R.$last=f===E-1;R.$middle=!(R.$first||R.$last);R.$odd=!(R.$even=0===(f&1));v.scope||m(R,function(a){a[a.length++]=
U.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,y(l));l=a;v.scope=R;v.clone=a;w[v.id]=v})}H=w})}}}],Hd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Pa(c)?"removeClass":"addClass"](d,"ng-hide")})}}],Ad=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Pa(c)?"addClass":"removeClass"](d,"ng-hide")})}}],Id=xa(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Jd=["$animate",
function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases={}}],link:function(c,d,e,g){var f,h,m,k=[];c.$watch(e.ngSwitch||e.on,function(d){var n,p=k.length;if(0<p){if(m){for(n=0;n<p;n++)m[n].remove();m=null}m=[];for(n=0;n<p;n++){var r=h[n];k[n].$destroy();m[n]=r;a.leave(r,function(){m.splice(n,1);0===m.length&&(m=null)})}}h=[];k=[];if(f=g.cases["!"+d]||g.cases["?"])c.$eval(e.change),q(f,function(d){var e=c.$new();k.push(e);d.transclude(e,function(c){var e=d.element;
h.push(c);a.enter(c,e.parent(),e)})})})}}}],Kd=xa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,g){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:g,element:c})}}),Ld=xa({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,g){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:g,element:c})}}),Nd=xa({link:function(a,c,d,e,g){if(!g)throw v("ngTransclude")("orphan",ha(c));g(function(a){c.empty();
c.append(a)})}}),nd=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],cf=v("ngOptions"),Md=aa({terminal:!0}),od=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:C};return{restrict:"E",require:["select","?ngModel"],
controller:["$element","$scope","$attrs",function(a,c,d){var m=this,k={},l=e,n;m.databound=d.ngModel;m.init=function(a,c,d){l=a;n=d};m.addOption=function(c){Ba(c,'"option value"');k[c]=!0;l.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};m.removeOption=function(a){this.hasOption(a)&&(delete k[a],l.$viewValue==a&&this.renderUnknownOption(a))};m.renderUnknownOption=function(c){c="? "+Ja(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};m.hasOption=function(a){return k.hasOwnProperty(a)};
c.$on("$destroy",function(){m.renderUnknownOption=C})}],link:function(e,f,h,m){function k(a,c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(G.parent()&&G.remove(),c.val(a),""===a&&v.prop("selected",!0)):D(a)&&v?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){G.parent()&&G.remove();d.$setViewValue(c.val())})})}function l(a,c,d){var e;d.$render=function(){var a=new Wa(d.$viewValue);q(c.find("option"),function(c){c.selected=B(a.get(c.value))})};a.$watch(function(){za(e,
d.$viewValue)||(e=ba(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=[];q(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(){var a={"":[]},c=[""],d,k,s,t,u;t=g.$modelValue;u=y(e)||[];var D=n?Tb(u):u,G,J,A;J={};s=!1;var E,I;if(r)if(v&&M(t))for(s=new Wa([]),A=0;A<t.length;A++)J[l]=t[A],s.put(v(e,J),t[A]);else s=new Wa(t);for(A=0;G=D.length,A<G;A++){k=A;if(n){k=D[A];if("$"===k.charAt(0))continue;J[n]=k}J[l]=
u[k];d=p(e,J)||"";(k=a[d])||(k=a[d]=[],c.push(d));r?d=B(s.remove(v?v(e,J):q(e,J))):(v?(d={},d[l]=t,d=v(e,d)===v(e,J)):d=t===q(e,J),s=s||d);E=m(e,J);E=B(E)?E:"";k.push({id:v?v(e,J):n?D[A]:A,label:E,selected:d})}r||(z||null===t?a[""].unshift({id:"",label:"",selected:!s}):s||a[""].unshift({id:"?",label:"",selected:!0}));J=0;for(D=c.length;J<D;J++){d=c[J];k=a[d];x.length<=J?(t={element:C.clone().attr("label",d),label:k.label},u=[t],x.push(u),f.append(t.element)):(u=x[J],t=u[0],t.label!=d&&t.element.attr("label",
t.label=d));E=null;A=0;for(G=k.length;A<G;A++)s=k[A],(d=u[A+1])?(E=d.element,d.label!==s.label&&E.text(d.label=s.label),d.id!==s.id&&E.val(d.id=s.id),d.selected!==s.selected&&E.prop("selected",d.selected=s.selected)):(""===s.id&&z?I=z:(I=w.clone()).val(s.id).attr("selected",s.selected).text(s.label),u.push({element:I,label:s.label,id:s.id,selected:s.selected}),E?E.after(I):t.element.append(I),E=I);for(A++;u.length>A;)u.pop().element.remove()}for(;x.length>J;)x.pop()[0].element.remove()}var k;if(!(k=
t.match(d)))throw cf("iexp",t,ha(f));var m=c(k[2]||k[1]),l=k[4]||k[6],n=k[5],p=c(k[3]||""),q=c(k[2]?k[1]:l),y=c(k[7]),v=k[8]?c(k[8]):null,x=[[{element:f,label:""}]];z&&(a(z)(e),z.removeClass("ng-scope"),z.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=y(e)||[],d={},h,k,m,p,t,w,u;if(r)for(k=[],p=0,w=x.length;p<w;p++)for(a=x[p],m=1,t=a.length;m<t;m++){if((h=a[m].element)[0].selected){h=h.val();n&&(d[n]=h);if(v)for(u=0;u<c.length&&(d[l]=c[u],v(e,d)!=h);u++);else d[l]=c[h];k.push(q(e,
d))}}else{h=f.val();if("?"==h)k=s;else if(""===h)k=null;else if(v)for(u=0;u<c.length;u++){if(d[l]=c[u],v(e,d)==h){k=q(e,d);break}}else d[l]=c[h],n&&(d[n]=h),k=q(e,d);1<x[0].length&&x[0][1].id!==h&&(x[0][1].selected=!1)}g.$setViewValue(k)})});g.$render=h;e.$watch(h)}if(m[1]){var p=m[0];m=m[1];var r=h.multiple,t=h.ngOptions,z=!1,v,w=y(U.createElement("option")),C=y(U.createElement("optgroup")),G=w.clone();h=0;for(var x=f.children(),A=x.length;h<A;h++)if(""===x[h].value){v=z=x.eq(h);break}p.init(m,z,
G);r&&(m.$isEmpty=function(a){return!a||0===a.length});t?n(e,f,m):r?l(e,f,m):k(e,f,m,p)}}}}],qd=["$interpolate",function(a){var c={addOption:C,removeOption:C};return{restrict:"E",priority:100,compile:function(d,e){if(D(e.value)){var g=a(d.text(),!0);g||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),l=k.data("$selectController")||k.parent().data("$selectController");l&&l.databound?d.prop("selected",!1):l=c;g?a.$watch(g,function(a,c){e.$set("value",a);a!==c&&l.removeOption(c);l.addOption(a)}):
l.addOption(e.value);d.on("$destroy",function(){l.removeOption(e.value)})}}}}],pd=aa({restrict:"E",terminal:!1});O.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):((Ha=O.jQuery)?(y=Ha,A(Ha.fn,{scope:Ka.scope,isolateScope:Ka.isolateScope,controller:Ka.controller,injector:Ka.injector,inheritedData:Ka.inheritedData}),Fb("remove",!0,!0,!1),Fb("empty",!1,!1,!1),Fb("html",!1,!1,!0)):y=N,Qa.element=y,hd(Qa),y(U).ready(function(){ed(U,cc)}))})(window,document);
!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}</style>');
//# sourceMappingURL=angular.min.js.map
/*
AngularJS v1.3.0-beta.5
(c) 2010-2014 Google, Inc. http://angularjs.org
License: MIT
*/
(function(p,h,q){'use strict';function E(a){var e=[];s(e,h.noop).chars(a);return e.join("")}function k(a){var e={};a=a.split(",");var d;for(d=0;d<a.length;d++)e[a[d]]=!0;return e}function F(a,e){function d(a,b,d,g){b=h.lowercase(b);if(t[b])for(;f.last()&&u[f.last()];)c("",f.last());v[b]&&f.last()==b&&c("",b);(g=w[b]||!!g)||f.push(b);var l={};d.replace(G,function(a,b,e,c,d){l[b]=r(e||c||d||"")});e.start&&e.start(b,l,g)}function c(a,b){var c=0,d;if(b=h.lowercase(b))for(c=f.length-1;0<=c&&f[c]!=b;c--);
if(0<=c){for(d=f.length-1;d>=c;d--)e.end&&e.end(f[d]);f.length=c}}var b,g,f=[],l=a;for(f.last=function(){return f[f.length-1]};a;){g=!0;if(f.last()&&x[f.last()])a=a.replace(RegExp("(.*)<\\s*\\/\\s*"+f.last()+"[^>]*>","i"),function(b,a){a=a.replace(H,"$1").replace(I,"$1");e.chars&&e.chars(r(a));return""}),c("",f.last());else{if(0===a.indexOf("\x3c!--"))b=a.indexOf("--",4),0<=b&&a.lastIndexOf("--\x3e",b)===b&&(e.comment&&e.comment(a.substring(4,b)),a=a.substring(b+3),g=!1);else if(y.test(a)){if(b=a.match(y))a=
a.replace(b[0],""),g=!1}else if(J.test(a)){if(b=a.match(z))a=a.substring(b[0].length),b[0].replace(z,c),g=!1}else K.test(a)&&(b=a.match(A))&&(a=a.substring(b[0].length),b[0].replace(A,d),g=!1);g&&(b=a.indexOf("<"),g=0>b?a:a.substring(0,b),a=0>b?"":a.substring(b),e.chars&&e.chars(r(g)))}if(a==l)throw L("badparse",a);l=a}c()}function r(a){if(!a)return"";var e=M.exec(a);a=e[1];var d=e[3];if(e=e[2])n.innerHTML=e.replace(/</g,"&lt;"),e="textContent"in n?n.textContent:n.innerText;return a+e+d}function B(a){return a.replace(/&/g,
"&amp;").replace(N,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function s(a,e){var d=!1,c=h.bind(a,a.push);return{start:function(a,g,f){a=h.lowercase(a);!d&&x[a]&&(d=a);d||!0!==C[a]||(c("<"),c(a),h.forEach(g,function(d,f){var g=h.lowercase(f),k="img"===a&&"src"===g||"background"===g;!0!==O[g]||!0===D[g]&&!e(d,k)||(c(" "),c(f),c('="'),c(B(d)),c('"'))}),c(f?"/>":">"))},end:function(a){a=h.lowercase(a);d||!0!==C[a]||(c("</"),c(a),c(">"));a==d&&(d=!1)},chars:function(a){d||
c(B(a))}}}var L=h.$$minErr("$sanitize"),A=/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,z=/^<\s*\/\s*([\w:-]+)[^>]*>/,G=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,K=/^</,J=/^<\s*\//,H=/\x3c!--(.*?)--\x3e/g,y=/<!DOCTYPE([^>]*?)>/i,I=/<!\[CDATA\[(.*?)]]\x3e/g,N=/([^\#-~| |!])/g,w=k("area,br,col,hr,img,wbr");p=k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr");q=k("rp,rt");var v=h.extend({},q,p),t=h.extend({},p,k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),
u=h.extend({},q,k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),x=k("script,style"),C=h.extend({},w,t,u,v),D=k("background,cite,href,longdesc,src,usemap"),O=h.extend({},D,k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width")),
n=document.createElement("pre"),M=/^(\s*)([\s\S]*?)(\s*)$/;h.module("ngSanitize",[]).provider("$sanitize",function(){this.$get=["$$sanitizeUri",function(a){return function(e){var d=[];F(e,s(d,function(c,b){return!/^unsafe/.test(a(c,b))}));return d.join("")}}]});h.module("ngSanitize").filter("linky",["$sanitize",function(a){var e=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,d=/^mailto:/;return function(c,b){function g(a){a&&m.push(E(a))}function f(a,c){m.push("<a ");h.isDefined(b)&&
(m.push('target="'),m.push(b),m.push('" '));m.push('href="');m.push(a);m.push('">');g(c);m.push("</a>")}if(!c)return c;for(var l,k=c,m=[],n,p;l=k.match(e);)n=l[0],l[2]==l[3]&&(n="mailto:"+n),p=l.index,g(k.substr(0,p)),f(n,l[0].replace(d,"")),k=k.substring(p+l[0].length);g(k);return a(m.join(""))}}])})(window,window.angular);
//# sourceMappingURL=angular-sanitize.min.js.map
/**
* State-based routing for AngularJS
* @version v0.2.10
* @link http://angular-ui.github.com/
* @license MIT License, http://www.opensource.org/licenses/MIT
*/
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return I(new(I(function(){},{prototype:a})),b)}function e(a){return H(arguments,function(b){b!==a&&H(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function h(a,b,c,d){var e,h=f(c,d),i={},j=[];for(var k in h)if(h[k].params&&h[k].params.length){e=h[k].params;for(var l in e)g(j,e[l])>=0||(j.push(e[l]),i[e[l]]=a[e[l]])}return I({},i,b)}function i(a,b){var c={};return H(a,function(a){var d=b[a];c[a]=null!=d?String(d):null}),c}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return H(a,function(a){c[a]=b[a]}),c}function l(a,b){var d=1,f=2,g={},h=[],i=g,j=I(a.when(g),{$$promises:g,$$values:g});this.study=function(g){function k(a,c){if(o[c]!==f){if(n.push(c),o[c]===d)throw n.splice(0,n.indexOf(c)),new Error("Cyclic dependency: "+n.join(" -> "));if(o[c]=d,E(a))m.push(c,[function(){return b.get(a)}],h);else{var e=b.annotate(a);H(e,function(a){a!==c&&g.hasOwnProperty(a)&&k(g[a],a)}),m.push(c,a,e)}n.pop(),o[c]=f}}function l(a){return F(a)&&a.then&&a.$$promises}if(!F(g))throw new Error("'invocables' must be an object");var m=[],n=[],o={};return H(g,k),g=n=o=null,function(d,f,g){function h(){--s||(t||e(r,f.$$values),p.$$values=r,p.$$promises=!0,o.resolve(r))}function k(a){p.$$failure=a,o.reject(a)}function n(c,e,f){function i(a){l.reject(a),k(a)}function j(){if(!C(p.$$failure))try{l.resolve(b.invoke(e,g,r)),l.promise.then(function(a){r[c]=a,h()},i)}catch(a){i(a)}}var l=a.defer(),m=0;H(f,function(a){q.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,q[a].then(function(b){r[a]=b,--m||j()},i))}),m||j(),q[c]=l.promise}if(l(d)&&g===c&&(g=f,f=d,d=null),d){if(!F(d))throw new Error("'locals' must be an object")}else d=i;if(f){if(!l(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=j;var o=a.defer(),p=o.promise,q=p.$$promises={},r=I({},d),s=1+m.length/3,t=!1;if(C(f.$$failure))return k(f.$$failure),p;f.$$values?(t=e(r,f.$$values),h()):(I(q,f.$$promises),f.then(h,k));for(var u=0,v=m.length;v>u;u+=3)d.hasOwnProperty(m[u])?h():n(m[u],m[u+1],m[u+2]);return p}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function m(a,b,c){this.fromConfig=function(a,b,c){return C(a.template)?this.fromString(a.template,b):C(a.templateUrl)?this.fromUrl(a.templateUrl,b):C(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return D(a)?a(b):a},this.fromUrl=function(c,d){return D(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function n(a){function b(b){if(!/^\w+(-+\w+)*$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(f[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");f[b]=!0,j.push(b)}function c(a){return a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&")}var d,e=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f={},g="^",h=0,i=this.segments=[],j=this.params=[];this.source=a;for(var k,l,m;(d=e.exec(a))&&(k=d[2]||d[3],l=d[4]||("*"==d[1]?".*":"[^/]*"),m=a.substring(h,d.index),!(m.indexOf("?")>=0));)g+=c(m)+"("+l+")",b(k),i.push(m),h=e.lastIndex;m=a.substring(h);var n=m.indexOf("?");if(n>=0){var o=this.sourceSearch=m.substring(n);m=m.substring(0,n),this.sourcePath=a.substring(0,h+n),H(o.substring(1).split(/[&?]/),b)}else this.sourcePath=a,this.sourceSearch="";g+=c(m)+"$",i.push(m),this.regexp=new RegExp(g),this.prefix=i[0]}function o(){this.compile=function(a){return new n(a)},this.isMatcher=function(a){return F(a)&&D(a.exec)&&D(a.format)&&D(a.concat)},this.$get=function(){return this}}function p(a){function b(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function c(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function d(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return C(d)?d:!0}var e=[],f=null;this.rule=function(a){if(!D(a))throw new Error("'rule' must be a function");return e.push(a),this},this.otherwise=function(a){if(E(a)){var b=a;a=function(){return b}}else if(!D(a))throw new Error("'rule' must be a function");return f=a,this},this.when=function(e,f){var g,h=E(f);if(E(e)&&(e=a.compile(e)),!h&&!D(f)&&!G(f))throw new Error("invalid 'handler' in when()");var i={matcher:function(b,c){return h&&(g=a.compile(c),c=["$match",function(a){return g.format(a)}]),I(function(a,e){return d(a,c,b.exec(e.path(),e.search()))},{prefix:E(b.prefix)?b.prefix:""})},regex:function(a,e){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(g=e,e=["$match",function(a){return c(g,a)}]),I(function(b,c){return d(b,e,a.exec(c.path()))},{prefix:b(a)})}},j={matcher:a.isMatcher(e),regex:e instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](e,f));throw new Error("invalid 'what' in when()")},this.$get=["$location","$rootScope","$injector",function(a,b,c){function d(b){function d(b){var d=b(c,a);return d?(E(d)&&a.replace().url(d),!0):!1}if(!b||!b.defaultPrevented){var g,h=e.length;for(g=0;h>g;g++)if(d(e[g]))return;f&&d(f)}}return b.$on("$locationChangeSuccess",d),{sync:function(){d()}}}]}function q(a,e,f){function g(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){var d=E(a),e=d?a:a.name,f=g(e);if(f){if(!b)throw new Error("No reference point given for path '"+e+"'");for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var l=w[e];return!l||!d&&(d||l!==a&&l.self!==a)?c:l}function m(a,b){x[a]||(x[a]=[]),x[a].push(b)}function n(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!E(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(w.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):E(b.parent)?b.parent:"";if(e&&!w[e])return m(e,b.self);for(var f in z)D(z[f])&&(b[f]=z[f](b,z.$delegates[f]));if(w[c]=b,!b[y]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){v.$current.navigable==b&&j(a,c)||v.transitionTo(b,a,{location:!1})}]),x[c])for(var g=0;g<x[c].length;g++)n(x[c][g]);return b}function o(a){return a.indexOf("*")>-1}function p(a){var b=a.split("."),c=v.$current.name.split(".");if("**"===b[0]&&(c=c.slice(c.indexOf(b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(c.indexOf(b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function q(a,b){return E(a)&&!C(b)?z[a]:D(b)&&E(a)?(z[a]&&!z.$delegates[a]&&(z.$delegates[a]=z[a]),z[a]=b,this):this}function r(a,b){return F(a)?b=a:b.name=a,n(b),this}function s(a,e,g,m,n,q,r,s,x){function z(){r.url()!==M&&(r.url(M),r.replace())}function A(a,c,d,f,h){var i=d?c:k(a.params,c),j={$stateParams:i};h.resolve=n.resolve(a.resolve,j,h.resolve,a);var l=[h.resolve.then(function(a){h.globals=a})];return f&&l.push(f),H(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return g.load(d,{view:c,locals:j,params:i,notify:!1})||""}],l.push(n.resolve(e,j,h.resolve,a).then(function(f){if(D(c.controllerProvider)||G(c.controllerProvider)){var g=b.extend({},e,j);f.$$controller=m.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,h[d]=f}))}),e.all(l).then(function(){return h})}var B=e.reject(new Error("transition superseded")),F=e.reject(new Error("transition prevented")),K=e.reject(new Error("transition aborted")),L=e.reject(new Error("transition failed")),M=r.url(),N=x.baseHref();return u.locals={resolve:null,globals:{$stateParams:{}}},v={params:{},current:u.self,$current:u,transition:null},v.reload=function(){v.transitionTo(v.current,q,{reload:!0,inherit:!1,notify:!1})},v.go=function(a,b,c){return this.transitionTo(a,b,I({inherit:!0,relative:v.$current},c))},v.transitionTo=function(b,c,f){c=c||{},f=I({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,k=v.$current,n=v.params,o=k.path,p=l(b,f.relative);if(!C(p)){var s={to:b,toParams:c,options:f};if(g=a.$broadcast("$stateNotFound",s,k.self,n),g.defaultPrevented)return z(),K;if(g.retry){if(f.$retry)return z(),L;var w=v.transition=e.when(g.retry);return w.then(function(){return w!==v.transition?B:(s.options.$retry=!0,v.transitionTo(s.to,s.toParams,s.options))},function(){return K}),z(),w}if(b=s.to,c=s.toParams,f=s.options,p=l(b,f.relative),!C(p)){if(f.relative)throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'");throw new Error("No such state '"+b+"'")}}if(p[y])throw new Error("Cannot transition to abstract state '"+b+"'");f.inherit&&(c=h(q,c||{},v.$current,p)),b=p;var x,D,E=b.path,G=u.locals,H=[];for(x=0,D=E[x];D&&D===o[x]&&j(c,n,D.ownParams)&&!f.reload;x++,D=E[x])G=H[x]=D.locals;if(t(b,k,G,f))return b.self.reloadOnSearch!==!1&&z(),v.transition=null,e.when(v.current);if(c=i(b.params,c||{}),f.notify&&(g=a.$broadcast("$stateChangeStart",b.self,c,k.self,n),g.defaultPrevented))return z(),F;for(var N=e.when(G),O=x;O<E.length;O++,D=E[O])G=H[O]=d(G),N=A(D,c,D===b,N,G);var P=v.transition=N.then(function(){var d,e,g;if(v.transition!==P)return B;for(d=o.length-1;d>=x;d--)g=o[d],g.self.onExit&&m.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=x;d<E.length;d++)e=E[d],e.locals=H[d],e.self.onEnter&&m.invoke(e.self.onEnter,e.self,e.locals.globals);if(v.transition!==P)return B;v.$current=b,v.current=b.self,v.params=c,J(v.params,q),v.transition=null;var h=b.navigable;return f.location&&h&&(r.url(h.url.format(h.locals.globals.$stateParams)),"replace"===f.location&&r.replace()),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,k.self,n),M=r.url(),v.current},function(d){return v.transition!==P?B:(v.transition=null,a.$broadcast("$stateChangeError",b.self,c,k.self,n,d),z(),e.reject(d))});return P},v.is=function(a,d){var e=l(a);return C(e)?v.$current!==e?!1:C(d)&&null!==d?b.equals(q,d):!0:c},v.includes=function(a,d){if(E(a)&&o(a)){if(!p(a))return!1;a=v.$current.name}var e=l(a);if(!C(e))return c;if(!C(v.$current.includes[e.name]))return!1;var f=!0;return b.forEach(d,function(a,b){C(q[b])&&q[b]===a||(f=!1)}),f},v.href=function(a,b,c){c=I({lossy:!0,inherit:!1,absolute:!1,relative:v.$current},c||{});var d=l(a,c.relative);if(!C(d))return null;b=h(q,b||{},v.$current,d);var e=d&&c.lossy?d.navigable:d,g=e&&e.url?e.url.format(i(d.params,b||{})):null;return!f.html5Mode()&&g&&(g="#"+f.hashPrefix()+g),"/"!==N&&(f.html5Mode()?g=N.slice(0,-1)+g:c.absolute&&(g=N.slice(1)+g)),c.absolute&&g&&(g=r.protocol()+"://"+r.host()+(80==r.port()||443==r.port()?"":":"+r.port())+(!f.html5Mode()&&g?"/":"")+g),g},v.get=function(a,b){if(!C(a)){var c=[];return H(w,function(a){c.push(a.self)}),c}var d=l(a,b);return d&&d.self?d.self:null},v}function t(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var u,v,w={},x={},y="abstract",z={parent:function(a){if(C(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):u},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=I({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url;if(E(b))return"^"==b.charAt(0)?e.compile(b.substring(1)):(a.parent.navigable||u).url.concat(b);if(e.isMatcher(b)||null==b)return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},params:function(a){if(!a.params)return a.url?a.url.parameters():a.parent.params;if(!G(a.params))throw new Error("Invalid params in state '"+a+"'");if(a.url)throw new Error("Both params and url specicified in state '"+a+"'");return a.params},views:function(a){var b={};return H(C(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},ownParams:function(a){if(!a.parent)return a.params;var b={};H(a.params,function(a){b[a]=!0}),H(a.parent.params,function(c){if(!b[c])throw new Error("Missing required parameter '"+c+"' in state '"+a.name+"'");b[c]=!1});var c=[];return H(b,function(a,b){a&&c.push(b)}),c},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?I({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};u=n({name:"",url:"^",views:null,"abstract":!0}),u.navigable=null,this.decorator=q,this.state=r,this.$get=s,s.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$location","$urlRouter","$browser"]}function r(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=I(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function s(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function t(a,c,d){function e(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function f(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(i)return{enter:function(a,b,c){i.enter(a,null,b,c)},leave:function(a,b){i.leave(a,b)}};if(h){var d=h&&h(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var g=e(),h=g("$animator"),i=g("$animate"),j={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,e,g){return function(c,e,h){function i(){k&&(k.remove(),k=null),m&&(m.$destroy(),m=null),l&&(q.leave(l,function(){k=null}),k=l,l=null)}function j(f){var h=c.$new(),j=l&&l.data("$uiViewName"),k=j&&a.$current&&a.$current.locals[j];if(f||k!==n){var r=g(h,function(a){q.enter(a,e,function(){(b.isDefined(p)&&!p||c.$eval(p))&&d(a)}),i()});n=a.$current.locals[r.data("$uiViewName")],l=r,m=h,m.$emit("$viewContentLoaded"),m.$eval(o)}}var k,l,m,n,o=h.onload||"",p=h.autoscroll,q=f(h,c);c.$on("$stateChangeSuccess",function(){j(!1)}),c.$on("$viewContentLoading",function(){j(!1)}),j(!0)}}};return j}function u(a,b,c){return{restrict:"ECA",priority:-400,compile:function(d){var e=d.html();return function(d,f,g){var h=g.uiView||g.name||"",i=f.inheritedData("$uiView");h.indexOf("@")<0&&(h=h+"@"+(i?i.state.name:"")),f.data("$uiViewName",h);var j=c.$current,k=j&&j.locals[h];if(k){f.data("$uiView",{name:h,state:k.$$state}),f.html(k.$template?k.$template:e);var l=a(f.contents());if(k.$$controller){k.$scope=d;var m=b(k.$$controller,k);k.$$controllerAs&&(d[k.$$controllerAs]=m),f.data("$ngControllerController",m),f.children().data("$ngControllerController",m)}l(d)}}}}}function v(a){var b=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/);if(!b||4!==b.length)throw new Error("Invalid state ref '"+a+"'");return{state:b[1],paramExpr:b[3]||null}}function w(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function x(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:"?^uiSrefActive",link:function(e,f,g,h){var i=v(g.uiSref),j=null,k=w(f)||a.$current,l="FORM"===f[0].nodeName,m=l?"action":"href",n=!0,o={relative:k},p=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in p&&(o[a]=p[a])});var q=function(b){if(b&&(j=b),n){var c=a.href(i.state,j,o);return h&&h.$$setStateInfo(i.state,j),c?void(f[0][m]=c):(n=!1,!1)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&q(a)},!0),j=e.$eval(i.paramExpr)),q(),l||f.bind("click",function(b){var d=b.which||b.button;d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target")||(c(function(){a.go(i.state,j,o)}),b.preventDefault())})}}}function y(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(d,e,f){function g(){a.$current.self===i&&h()?e.addClass(l):e.removeClass(l)}function h(){return!k||j(k,b)}var i,k,l;l=c(f.uiSrefActive||"",!1)(d),this.$$setStateInfo=function(b,c){i=a.get(b,w(e)),k=c,g()},d.$on("$stateChangeSuccess",g)}]}}function z(a){return function(b){return a.is(b)}}function A(a){return function(b){return a.includes(b)}}function B(a,b){function e(a){this.locals=a.locals.globals,this.params=this.locals.$stateParams}function f(){this.locals=null,this.params=null}function g(c,g){if(null!=g.redirectTo){var h,j=g.redirectTo;if(E(j))h=j;else{if(!D(j))throw new Error("Invalid 'redirectTo' in when()");h=function(a,b){return j(a,b.path(),b.search())}}b.when(c,h)}else a.state(d(g,{parent:null,name:"route:"+encodeURIComponent(c),url:c,onEnter:e,onExit:f}));return i.push(g),this}function h(a,b,d){function e(a){return""!==a.name?a:c}var f={routes:i,params:d,current:c};return b.$on("$stateChangeStart",function(a,c,d,f){b.$broadcast("$routeChangeStart",e(c),e(f))}),b.$on("$stateChangeSuccess",function(a,c,d,g){f.current=e(c),b.$broadcast("$routeChangeSuccess",e(c),e(g)),J(d,f.params)}),b.$on("$stateChangeError",function(a,c,d,f,g,h){b.$broadcast("$routeChangeError",e(c),e(f),h)}),f}var i=[];e.$inject=["$$state"],this.when=g,this.$get=h,h.$inject=["$state","$rootScope","$routeParams"]}var C=b.isDefined,D=b.isFunction,E=b.isString,F=b.isObject,G=b.isArray,H=b.forEach,I=b.extend,J=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),l.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",l),m.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",m),n.prototype.concat=function(a){return new n(this.sourcePath+a+this.sourceSearch)},n.prototype.toString=function(){return this.source},n.prototype.exec=function(a,b){var c=this.regexp.exec(a);if(!c)return null;var d,e=this.params,f=e.length,g=this.segments.length-1,h={};if(g!==c.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(d=0;g>d;d++)h[e[d]]=c[d+1];for(;f>d;d++)h[e[d]]=b[e[d]];return h},n.prototype.parameters=function(){return this.params},n.prototype.format=function(a){var b=this.segments,c=this.params;if(!a)return b.join("");var d,e,f,g=b.length-1,h=c.length,i=b[0];for(d=0;g>d;d++)f=a[c[d]],null!=f&&(i+=encodeURIComponent(f)),i+=b[d+1];for(;h>d;d++)f=a[c[d]],null!=f&&(i+=(e?"&":"?")+c[d]+"="+encodeURIComponent(f),e=!0);return i},b.module("ui.router.util").provider("$urlMatcherFactory",o),p.$inject=["$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",p),q.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",q),r.$inject=[],b.module("ui.router.state").provider("$view",r),b.module("ui.router.state").provider("$uiViewScroll",s),t.$inject=["$state","$injector","$uiViewScroll"],u.$inject=["$compile","$controller","$state"],b.module("ui.router.state").directive("uiView",t),b.module("ui.router.state").directive("uiView",u),x.$inject=["$state","$timeout"],y.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",x).directive("uiSrefActive",y),z.$inject=["$state"],A.$inject=["$state"],b.module("ui.router.state").filter("isState",z).filter("includedByState",A),B.$inject=["$stateProvider","$urlRouterProvider"],b.module("ui.router.compat").provider("$route",B).directive("ngView",t)}(window,window.angular);
angular.module('snap', []);

(function() {
'use strict';
var version = [1, 4, 0]
, vObj = {
full: version.join('.'),
major: version[0],
minor: version[1],
patch: version[2]
};
angular.module('snap').constant('SNAP_VERSION', vObj);
}());

angular.module('snap')
.directive('snapClose', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
'use strict';
return {
restrict: 'A',
link: function (scope, element, attrs) {
element.bind('click', function() {
// Wrap in anonymous function for easier testing
snapRemote.close(scope.$eval(attrs.snapId));
$rootScope.$digest();
});
}
};
}]);

angular.module('snap')
.directive('snapContent', ['snapRemote', function (snapRemote) {
'use strict';
return {
restrict: 'AE',
link: function postLink(scope, element, attrs) {
element.addClass('snap-content');

var snapOptions = {
element: element[0]
};

angular.extend(snapOptions, snapRemote.globalOptions);

var snapId = attrs.snapId;
if(!!snapId) {
snapId = scope.$eval(attrs.snapId);
}

// override snap options if some provided in snap-options attribute
if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
angular.extend(snapOptions, scope.$eval(attrs.snapOptions));
}

snapRemote.register(new window.Snap(snapOptions), snapId);

// watch snapOptions for updates
if(angular.isDefined(attrs.snapOptions) && attrs.snapOptions) {
scope.$watch(attrs.snapOptions, function(newSnapOptions) {
snapRemote.getSnapper(snapId).then(function(snapper) {
snapper.settings(newSnapOptions);
});
}, true);
}

scope.$on('$destroy', function() {
snapRemote.unregister(snapId);
});
}
};
}]);

angular.module('snap')
.directive('snapDragger', ['snapRemote', function(snapRemote) {
'use strict';
return {
restrict: 'AE',
link: function(scope, element, attrs) {
var snapId = scope.$eval(attrs.snapId);
snapRemote.getSnapper(snapId).then(function(snapper) {
snapper.settings({
dragger: element[0]
});
});
}
};
}]);


angular.module('snap')
.directive('snapDrawer', function () {
'use strict';
return {
restrict: 'AE',
link: function(scope, element, attrs) {
element.addClass('snap-drawer');

// Don't force a `snap-drawers` wrapper when we only want to use a
// single shelf
var parent = element.parent()
, needsDrawersWrapper = true;

if (attrs.snapDrawer === 'right') {
element.addClass('snap-drawer-right');
} else {
element.addClass('snap-drawer-left');
}

while(parent.length) {
if(parent.hasClass('snap-drawers')) {
needsDrawersWrapper = false;
}
parent = parent.parent();
}

if(needsDrawersWrapper) {
element.wrap('<div class="snap-drawers" />');
}

}
};
});

angular.module('snap')
.directive('snapDrawers', function () {
'use strict';
return {
restrict: 'AE',
link: function(scope, element, attrs) {
element.addClass('snap-drawers');
}
};
});


angular.module('snap')
.directive('snapToggle', ['$rootScope', 'snapRemote', function($rootScope, snapRemote) {
'use strict';
return {
restrict: 'A',
link: function (scope, element, attrs) {
var snapId = attrs.snapId
, snapSide = attrs.snapToggle || 'left';

if(!!snapId) {
snapId = scope.$eval(snapId);
}

element.bind('click', function() {
snapRemote.toggle(snapSide, snapId);
$rootScope.$digest();
});
}
};
}]);

angular.module('snap')
.provider('snapRemote', function SnapRemoteProvider() {
'use strict';

// Global Snap.js options
var self = this;
this.globalOptions = {};

this.$get = ['$q', function($q) {

var snapperStore = {}
, DEFAULT_SNAPPER_ID = '__DEFAULT_SNAPPER_ID__'
, exports = {}
, initStoreForId
, resolveInStoreById;

exports.globalOptions = self.globalOptions;

exports.getSnapper = function(id) {
id = id || DEFAULT_SNAPPER_ID;
if(!snapperStore.hasOwnProperty(id)) {
initStoreForId(id);
}
return snapperStore[id].deferred.promise;
};

exports.register = function(snapper, id) {
id = id || DEFAULT_SNAPPER_ID;
if(!snapperStore.hasOwnProperty(id)) {
initStoreForId(id);
}
if(snapperStore[id].isResolved) {
initStoreForId(id);
}
resolveInStoreById(snapper, id);
};

exports.unregister = function(id) {
id = id || DEFAULT_SNAPPER_ID;
if(snapperStore.hasOwnProperty(id)) {
delete snapperStore[id];
}
};

exports.toggle = function(side, id) {
id = id || DEFAULT_SNAPPER_ID;
exports.getSnapper(id).then(function(snapper) {
if(side === snapper.state().state) {
exports.close(id);
} else {
exports.open(side, id);
}
});
};

exports.open = function(side, id) {
id = id || DEFAULT_SNAPPER_ID;
exports.getSnapper(id).then(function(snapper) {
snapper.open(side);
});
};

exports.close = function(id) {
id = id || DEFAULT_SNAPPER_ID;
exports.getSnapper(id).then(function(snapper) {
snapper.close();
});
};

initStoreForId = function(id) {
snapperStore[id] = {
deferred: $q.defer(),
isResolved: false
};
};

resolveInStoreById = function(snapper, id) {
snapperStore[id].deferred.resolve(snapper);
snapperStore[id].isResolved = true;
};

return exports;
}];

return this;
});
/*!
* angular-translate - v2.1.0 - 2014-04-02
* http://github.com/PascalPrecht/angular-translate
* Copyright (c) 2014 ; Licensed MIT
*/
angular.module("pascalprecht.translate",["ng"]).run(["$translate",function(a){var b=a.storageKey(),c=a.storage();c?c.get(b)?a.use(c.get(b)):angular.isString(a.preferredLanguage())?a.use(a.preferredLanguage()):c.set(b,a.use()):angular.isString(a.preferredLanguage())&&a.use(a.preferredLanguage())}]),angular.module("pascalprecht.translate").provider("$translate",["$STORAGE_KEY",function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p={},q=[],r=a,s=[],t=!1,u="translate-cloak",v=!1,w=".",x=function(){var a=window.navigator;return(a.language||a.browserLanguage||a.systemLanguage||a.userLanguage||"").split("-").join("_")},y=function(a){for(var b=[],d=angular.lowercase(a),e=0,f=q.length;f>e;e++)b.push(angular.lowercase(q[e]));if(b.indexOf(d)>-1)return d;if(c){var g;for(var h in c)if(c.hasOwnProperty(h)&&angular.lowercase(h)===angular.lowercase(a)&&(g=c[h],b.indexOf(angular.lowercase(g))>-1))return g}var i=a.split("_");return i.length>1&&b.indexOf(angular.lowercase(i[0]))>-1?i[0]:void 0},z=function(a,b){if(!a&&!b)return p;if(a&&!b){if(angular.isString(a))return p[a]}else angular.isObject(p[a])||(p[a]={}),angular.extend(p[a],A(b));return this};this.translations=z,this.cloakClassName=function(a){return a?(u=a,this):u};var A=function(a,b,c,d){var e,f,g,h;b||(b=[]),c||(c={});for(e in a)a.hasOwnProperty(e)&&(h=a[e],angular.isObject(h)?A(h,b.concat(e),c,e):(f=b.length?""+b.join(w)+w+e:e,b.length&&e===d&&(g=""+b.join(w),c[g]="@:"+f),c[f]=h));return c};this.addInterpolation=function(a){return s.push(a),this},this.useMessageFormatInterpolation=function(){return this.useInterpolation("$translateMessageFormatInterpolation")},this.useInterpolation=function(a){return k=a,this},this.useSanitizeValueStrategy=function(a){return t=a,this},this.preferredLanguage=function(a){return a?(b=a,this):b},this.translationNotFoundIndicator=function(a){return this.translationNotFoundIndicatorLeft(a),this.translationNotFoundIndicatorRight(a),this},this.translationNotFoundIndicatorLeft=function(a){return a?(n=a,this):n},this.translationNotFoundIndicatorRight=function(a){return a?(o=a,this):o},this.fallbackLanguage=function(a){return B(a),this};var B=function(a){return a?(angular.isString(a)?(e=!0,d=[a]):angular.isArray(a)&&(e=!1,d=a),angular.isString(b)&&d.push(b),this):e?d[0]:d};this.use=function(a){if(a){if(!p[a]&&!l)throw new Error("$translateProvider couldn't find translationTable for langKey: '"+a+"'");return f=a,this}return f};var C=function(a){return a?(r=a,void 0):i?i+r:r};this.storageKey=C,this.useUrlLoader=function(a){return this.useLoader("$translateUrlLoader",{url:a})},this.useStaticFilesLoader=function(a){return this.useLoader("$translateStaticFilesLoader",a)},this.useLoader=function(a,b){return l=a,m=b||{},this},this.useLocalStorage=function(){return this.useStorage("$translateLocalStorage")},this.useCookieStorage=function(){return this.useStorage("$translateCookieStorage")},this.useStorage=function(a){return h=a,this},this.storagePrefix=function(a){return a?(i=a,this):a},this.useMissingTranslationHandlerLog=function(){return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")},this.useMissingTranslationHandler=function(a){return j=a,this},this.usePostCompiling=function(a){return v=!!a,this},this.determinePreferredLanguage=function(a){var c=a&&angular.isFunction(a)?a():x();return q.length?(b=y(c),void 0):(b=c,this)},this.registerAvailableLanguageKeys=function(a,b){return a?(q=a,b&&(c=b),this):q},this.$get=["$log","$injector","$rootScope","$q",function(a,c,i,q){var w,x,y,D=c.get(k||"$translateDefaultInterpolation"),E=!1,F={},G={},H=function(a,c,e){if(angular.isArray(a)){var g=function(a){for(var b={},d=[],f=function(a){var d=q.defer(),f=function(c){b[a]=c,d.resolve([a,c])};return H(a,c,e).then(f,f),d.promise},g=0,h=a.length;h>g;g++)d.push(f(a[g]));return q.all(d).then(function(){return b})};return g(a)}var i=q.defer();a=a.trim();var j=function(){var a=b?G[b]:G[f];if(x=0,h&&!a){var c=w.get(r);if(a=G[c],d&&d.length){var e=I(d,c);x=e>-1?e+=1:0,d.push(b)}}return a}();return j?j.then(function(){T(a,c,e).then(i.resolve,i.reject)},i.reject):T(a,c,e).then(i.resolve,i.reject),i.promise},I=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},J=function(a){return n&&(a=[n,a].join(" ")),o&&(a=[a,o].join(" ")),a},K=function(a){f=a,i.$emit("$translateChangeSuccess"),h&&w.set(H.storageKey(),f),D.setLocale(f),angular.forEach(F,function(a,b){F[b].setLocale(f)}),i.$emit("$translateChangeEnd")},L=function(a){if(!a)throw"No language key specified for loading.";var b=q.defer();return i.$emit("$translateLoadingStart"),E=!0,c.get(l)(angular.extend(m,{key:a})).then(function(c){var d={};i.$emit("$translateLoadingSuccess"),angular.isArray(c)?angular.forEach(c,function(a){angular.extend(d,A(a))}):angular.extend(d,A(c)),E=!1,b.resolve({key:a,table:d}),i.$emit("$translateLoadingEnd")},function(a){i.$emit("$translateLoadingError"),b.reject(a),i.$emit("$translateLoadingEnd")}),b.promise};if(h&&(w=c.get(h),!w.get||!w.set))throw new Error("Couldn't use storage '"+h+"', missing get() or set() method!");angular.isFunction(D.useSanitizeValueStrategy)&&D.useSanitizeValueStrategy(t),s.length&&angular.forEach(s,function(a){var d=c.get(a);d.setLocale(b||f),angular.isFunction(d.useSanitizeValueStrategy)&&d.useSanitizeValueStrategy(t),F[d.getInterpolationIdentifier()]=d});var M=function(a){var b=q.defer();return p.hasOwnProperty(a)?(b.resolve(p[a]),b.promise):(G[a].then(function(a){z(a.key,a.table),b.resolve(a.table)},b.reject),b.promise)},N=function(a,b,c,d){var e=q.defer();return M(a).then(function(g){g.hasOwnProperty(b)?(d.setLocale(a),e.resolve(d.interpolate(g[b],c)),d.setLocale(f)):e.reject()},e.reject),e.promise},O=function(a,b,c,d){var e,g=p[a];return g.hasOwnProperty(b)&&(d.setLocale(a),e=d.interpolate(g[b],c),d.setLocale(f)),e},P=function(a,b,c,e){var f=q.defer();if(a<d.length){var g=d[a];N(g,b,c,e).then(function(a){f.resolve(a)},function(){var d=P(a+1,b,c,e);f.resolve(d)})}else f.resolve(b);return f.promise},Q=function(a,b,c,e){var f;if(a<d.length){var g=d[a];f=O(g,b,c,e),f||(f=Q(a+1,b,c,e))}return f},R=function(a,b,c){return P(y>0?y:x,a,b,c)},S=function(a,b,c){return Q(y>0?y:x,a,b,c)},T=function(a,b,e){var g=q.defer(),h=f?p[f]:p,i=e?F[e]:D;if(h&&h.hasOwnProperty(a)){var k=h[a];"@:"===k.substr(0,2)?H(k.substr(2),b,e).then(g.resolve,g.reject):g.resolve(i.interpolate(k,b))}else j&&!E&&c.get(j)(a,f),f&&d&&d.length?R(a,b,i).then(function(a){g.resolve(a)},function(a){g.reject(J(a))}):g.reject(J(a));return g.promise},U=function(a,b,e){var g,h=f?p[f]:p,i=e?F[e]:D;if(h&&h.hasOwnProperty(a)){var k=h[a];g="@:"===k.substr(0,2)?U(k.substr(2),b,e):i.interpolate(k,b)}else j&&!E&&c.get(j)(a,f),f&&d&&d.length?(x=0,g=S(a,b,i)):g=J(a);return g};if(H.preferredLanguage=function(){return b},H.cloakClassName=function(){return u},H.fallbackLanguage=function(a){if(void 0!==a&&null!==a){if(B(a),l&&d&&d.length)for(var b=0,c=d.length;c>b;b++)G[d[b]]||(G[d[b]]=L(d[b]));H.use(H.use())}return e?d[0]:d},H.useFallbackLanguage=function(a){if(void 0!==a&&null!==a)if(a){var b=I(d,a);b>-1&&(y=b)}else y=0},H.proposedLanguage=function(){return g},H.storage=function(){return w},H.use=function(a){if(!a)return f;var b=q.defer();return i.$emit("$translateChangeStart"),!p[a]&&l?(g=a,G[a]=L(a).then(function(c){z(c.key,c.table),b.resolve(c.key),g===a&&(K(c.key),g=void 0)},function(a){g=void 0,i.$emit("$translateChangeError"),b.reject(a),i.$emit("$translateChangeEnd")})):(b.resolve(a),K(a)),b.promise},H.storageKey=function(){return C()},H.isPostCompilingEnabled=function(){return v},H.refresh=function(a){function b(){e.resolve(),i.$emit("$translateRefreshEnd")}function c(){e.reject(),i.$emit("$translateRefreshEnd")}if(!l)throw new Error("Couldn't refresh translation table, no loader registered!");var e=q.defer();if(i.$emit("$translateRefreshStart"),a)p[a]?L(a).then(function(c){z(c.key,c.table),a===f&&K(f),b()},c):c();else{var g=[];if(d&&d.length)for(var h=0,j=d.length;j>h;h++)g.push(L(d[h]));f&&g.push(L(f)),q.all(g).then(function(a){angular.forEach(a,function(a){p[a.key]&&delete p[a.key],z(a.key,a.table)}),f&&K(f),b()})}return e.promise},H.instant=function(a,e,g){if(angular.isArray(a)){for(var h={},i=0,k=a.length;k>i;i++)h[a[i]]=H.instant(a[i],e,g);return h}if("undefined"==typeof a||""===a)return a;a=a.trim();var l,m=[];b&&m.push(b),f&&m.push(f),d&&d.length&&(m=m.concat(d));for(var n=0,o=m.length;o>n;n++){var q=m[n];if(p[q]&&"undefined"!=typeof p[q][a]&&(l=U(a,e,g)),"undefined"!=typeof l)break}return l||""===l||(l=a,j&&!E&&c.get(j)(a,f)),l},l&&(angular.equals(p,{})&&H.use(H.use()),d&&d.length))for(var V=0,W=d.length;W>V;V++)G[d[V]]=L(d[V]);return H}]}]),angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation",["$interpolate",function(a){var b,c={},d="default",e=null,f={escaped:function(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=angular.element("<div></div>").text(a[c]).html());return b}},g=function(a){var b;return b=angular.isFunction(f[e])?f[e](a):a};return c.setLocale=function(a){b=a},c.getInterpolationIdentifier=function(){return d},c.useSanitizeValueStrategy=function(a){return e=a,this},c.interpolate=function(b,c){return e&&(c=g(c)),a(b)(c)},c}]),angular.module("pascalprecht.translate").constant("$STORAGE_KEY","NG_TRANSLATE_LANG_KEY"),angular.module("pascalprecht.translate").directive("translate",["$translate","$q","$interpolate","$compile","$parse","$rootScope",function(a,b,c,d,e,f){return{restrict:"AE",scope:!0,compile:function(b,g){var h=g.translateValues?g.translateValues:void 0,i=g.translateInterpolation?g.translateInterpolation:void 0,j=b[0].outerHTML.match(/translate-value-+/i);return function(b,k,l){if(b.interpolateParams={},l.$observe("translate",function(a){b.translationId=angular.equals(a,"")||!angular.isDefined(a)?c(k.text().replace(/^\s+|\s+$/g,""))(b.$parent):a}),l.$observe("translateDefault",function(a){b.defaultText=a}),h&&l.$observe("translateValues",function(a){a&&b.$parent.$watch(function(){angular.extend(b.interpolateParams,e(a)(b.$parent))})}),j){var m=function(a){l.$observe(a,function(c){b.interpolateParams[angular.lowercase(a.substr(14,1))+a.substr(15)]=c})};for(var n in l)l.hasOwnProperty(n)&&"translateValue"===n.substr(0,14)&&"translateValues"!==n&&m(n)}var o=function(b,c,e){e||"undefined"==typeof c.defaultText||(b=c.defaultText),k.html(b);var f=a.isPostCompilingEnabled(),h="undefined"!=typeof g.translateCompile,i=h&&"false"!==g.translateCompile;(f&&!h||i)&&d(k.contents())(c)},p=function(){return h||j?function(){var c=function(){b.translationId&&b.interpolateParams&&a(b.translationId,b.interpolateParams,i).then(function(a){o(a,b,!0)},function(a){o(a,b,!1)})};b.$watch("interpolateParams",c,!0),b.$watch("translationId",c)}:function(){var c=b.$watch("translationId",function(d){b.translationId&&d&&a(d,{},i).then(function(a){o(a,b,!0),c()},function(a){o(a,b,!1),c()})},!0)}}(),q=f.$on("$translateChangeSuccess",p);p(),b.$on("$destroy",q)}}}}]),angular.module("pascalprecht.translate").directive("translateCloak",["$rootScope","$translate",function(a,b){return{compile:function(c){a.$on("$translateLoadingSuccess",function(){c.removeClass(b.cloakClassName())}),c.addClass(b.cloakClassName())}}}]),angular.module("pascalprecht.translate").filter("translate",["$parse","$translate",function(a,b){return function(c,d,e){return angular.isObject(d)||(d=a(d)()),b.instant(c,d,e)}}]);
/*!
* angular-translate - v2.1.0 - 2014-04-02
* http://github.com/PascalPrecht/angular-translate
* Copyright (c) 2014 ; Licensed MIT
*/
angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader",["$q","$http",function(a,b){return function(c){if(!c||!angular.isString(c.prefix)||!angular.isString(c.suffix))throw new Error("Couldn't load static files, no prefix or suffix specified!");var d=a.defer();return b({url:[c.prefix,c.key,c.suffix].join(""),method:"GET",params:""}).success(function(a){d.resolve(a)}).error(function(){d.reject(c.key)}),d.promise}}]);
var calApp = angular.module('cal', ['ui.router', 'snap', 'ngSanitize', 'pascalprecht.translate'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/calendar');
$stateProvider.state('reload', {
url: '/reload',
controller: 'ReloadCtrl',
templateUrl: '/fragments/reload.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('global', {
url: '/global',
controller: 'GlobalCtrl',
templateUrl: 'templates/global.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('calendar', {
url: '/calendar',
controller: 'CalendarCtrl',
templateUrl: 'templates/calendar.html',
resolve: {
endpoint: "endpoint"
}
});

$stateProvider.state('apply', {
url: "/apply",
controller: 'ApplyLocationCtrl',
templateUrl: 'templates/locations/apply.html',
resolve: {
endpoint: "endpoint"
}
});

$stateProvider.state('reservation_edit', {
url: '/reservation/edit/:id',
controller: 'EditReservationCtrl',
templateUrl: 'templates/reservations/edit.html',
resolve: {
endpoint: "endpoint"
}
});

$stateProvider.state('reservation_new', {
url: '/reservation/new/:date/:start/:end',
controller: 'NewReservationCtrl',
templateUrl: 'templates/reservations/edit.html',
resolve: {
endpoint: "endpoint"
}
});

$stateProvider.state('location_list', {
url: '/location/list',
controller: 'ListLocationCtrl',
templateUrl: 'templates/locations/list.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('location_edit', {
url: '/location/edit/:id',
controller: 'EditLocationCtrl',
templateUrl: 'templates/locations/edit.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('location_new', {
url: '/location/new',
controller: 'NewLocationCtrl',
templateUrl: 'templates/locations/edit.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('asset_list', {
url: '/asset/list',
controller: 'ListAssetCtrl',
templateUrl: 'templates/assets/list.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('asset_edit', {
url: '/asset/edit/:id',
controller: 'EditAssetCtrl',
templateUrl: 'templates/assets/edit.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('asset_new', {
url: '/asset/new',
controller: 'NewAssetCtrl',
templateUrl: 'templates/assets/edit.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('unauthorized', {
url: '/unauthorized',
templateUrl: 'templates/unauthorized.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('news_list', {
url: '/news',
controller: 'ListNewsCtrl',
templateUrl: 'templates/news/list.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('news_edit', {
url: '/news/edit/:id',
controller: 'EditNewsCtrl',
templateUrl: 'templates/news/edit.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('news_new', {
url: '/news/new',
controller: 'NewNewsCtrl',
templateUrl: 'templates/news/edit.html',
resolve: {
endpoint: "endpoint"
}
});

$stateProvider.state('stats_devices', {
url: '/stats',
controller: 'DevicesStatsCtrl',
templateUrl: 'templates/stats/devices.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('stats_device', {
url: '/stats/device/:id',
controller: 'DeviceStatsCtrl',
templateUrl: 'templates/stats/device.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('stats_person', {
url: '/stats/person/:id',
controller: 'PersonStatsCtrl',
templateUrl: 'templates/stats/person.html',
resolve: {
endpoint: "endpoint"
}
});
$stateProvider.state('stats_me', {
url: '/stats/me',
controller: 'MyStatsCtrl',
templateUrl: 'templates/stats/me.html',
resolve: {
endpoint: "endpoint"
}
});

}]);


calApp.filter('reservations', function() {
return function(reservations, search) {
var out = new Array();
if (reservations) {
for (var i = 0; i < reservations.length; i++) {
var person = true;
var assets = true;
if (search.person) {
if (search.person != reservations[i].person) {
person = false;
}
}
if (search.assets && search.assets.length > 0) {
assets = false;
for (var j = 0; j < reservations[i].assets.length; j++) {
for (var k = 0; k < search.assets.length; k++) {
if (reservations[i].assets[j].id == search.assets[k]) {
assets = true;
}
}
}
}
if (person && assets) {
out.push(reservations[i]);
}
}
}
return out;
};
});
calApp.filter('hours', function() {
return function(input){
if(input/2 == Math.floor(input/2)){
return (input/2) + "h";
} else {
return Math.floor(input/2) + "h30";
}
};
});
calApp.config(function($translateProvider) {
$translateProvider.useStaticFilesLoader({
prefix: '/lang/',
suffix: '.json'
});

var langs = ['en', 'fr'];
var fallback = langs[0];

$translateProvider.determinePreferredLanguage(function() {
var tag = navigator.language || navigator.browserLanguage || navigator.systemLanguage || navigator.userLanguage;
for(var i = 0; i<langs.length; i++){
if(tag.indexOf(langs[i]) > -1){
return langs[i];
}
}
return fallback;
});
});
calApp.factory('endpoint', ['$http', '$rootScope', '$window', '$q', function($http, $scope, $window, $q) {
var response = $q.defer();

var service = {};
var location = -1;
var user = {};
var token;
var origin;
var loading = 0;
var redirect = false;
var show = false;
var local = "";

///////////////
// CALLBACKS //
///////////////

function error(response, status) {
loading--;
console.log(response.message);
if (redirect) {
if (status == 401) {
$window.location.href = "#/unauthorized";
}
}
}

function success(response, status) {
loading--;
}

////////////
//  AUTH  //
////////////

function fetchToken() {
return $http.get("/auth")
.success(function(data) {
token = data.hash;
origin = data.user;
});
}

function url(api, path, params) {
params.token = token;
params.origin = origin;
var frags = [];
Object.keys(params).forEach(function(key) {
frags.push(key + "=" + encodeURI(params[key]));
});

return "/_ah/api/" + api + "/v1/" + path + "?" + (frags.join("&"));
}


////////////////
//   PERSON   //
////////////////
service.person = {};
service.person.get = function(mail) {
loading++;
return $http.get(url("person", "get", {mail: mail}))
.success(success).error(error);
};
service.person.favorite = function(loc) {
loading++;
return $http.get(url("person", "favorite", {location: loc}))
.success(success).error(error);
};
service.person.listActives = function(loc) {
loading++;
return $http.get(url("person", "list/actives", {location: loc}))
.success(success).error(error);
};
service.person.listPending = function(loc) {
loading++;
return $http.get(url("person", "list/pending", {location: loc}))
.success(success).error(error);
};
service.person.listAdmins = function(loc) {
loading++;
return $http.get(url("person", "list/admins", {location: loc}))
.success(success).error(error);
};
/////////////////
//     ACL     //
/////////////////
service.person.register = function(pseudo) {
loading++;
return $http.get(url("person", "register", {username: pseudo}))
.success(success).error(error).success(function(){
user.name = pseudo;
user.mail = origin;
});
};
service.person.promote = function(usr, loc) {
loading++;
return $http.get(url("person", "promote", {location: loc, user: usr}))
.success(success).error(error);
};
service.person.demote = function(usr, loc) {
loading++;
return $http.get(url("person", "demote", {location: loc, user: usr}))
.success(success).error(error);
};
service.person.apply = function(loc) {
loading++;
return $http.get(url("person", "postulate", {location: loc}))
.success(success).error(error);
};
service.person.grantLocal = function(usr, loc) {
loading++;
return $http.get(url("person", "grant/local", {location: loc, user: usr}))
.success(success).error(error);
};
service.person.grantGlobal = function(usr) {
loading++;
return $http.get(url("person", "grant/global", {user: usr}))
.success(success).error(function(){
loading--;
});
};
service.person.status = function() {
loading++;
return $http.get(url("person", "status", {}))
.success(success).error(error);
};
//////////////////
// RESERVATIONS //
//////////////////
service.res = {};
service.res.get = function(id) {
loading++;
return $http.get(url("reservation", "get", {location: location, id: id}))
.success(success).error(error);
};
service.res.list = function(date) {
loading++;
return $http.get(url("reservation", "list", {location: location, date: new Date(date).toJSON()}))
.success(success).error(error);
};
service.res.put = function(reservation) {
loading++;
return $http.post(url("reservation", "put", {location: location}), reservation)
.success(success).error(error);
};
service.res.delete = function(id) {
loading++;
return $http.get(url("reservation", "delete", {location: location, id: id}))
.success(success).error(error);
};
service.res.history = function(user) {
loading++;
return $http.get(url("reservation", "history", {location: location, user: user}))
.success(success).error(error);
};
//////////////////
//    ASSETS    //
//////////////////
service.asset = {};
service.asset.get = function(id) {
loading++;
return $http.get(url("asset", "get", {location: location, id: id}))
.success(success).error(error);
};
service.asset.list = function() {
loading++;
return $http.get(url("asset", "list", {location: location}))
.success(success).error(error);
};
service.asset.put = function(asset) {
loading++;
return $http.post(url("asset", "put", {location: location}), asset)
.success(success).error(error);
};
service.asset.delete = function(id) {
loading++;
return $http.get(url("asset", "delete", {location: location, id: id}))
.success(success).error(error);
};
//////////////////
//   LOCATION   //
//////////////////
service.location = {};
service.location.list = function() {
loading++;
return $http.get(url("location", "list", {}))
.success(success).error(error).success(function(data){
locations = data;
});
};
service.location.listActives = function() {
loading++;
return $http.get(url("location", "list/actives", {}))
.success(success).error(error);
};
service.location.put = function(locat) {
loading++;
return $http.post(url("location", "put", {}), locat)
.success(success).error(error);
};
service.location.get = function(id) {
loading++;
return $http.get(url("location", "get", {id: id}))
.success(success).error(error);
};
//////////////
//   NEWS   //
//////////////
service.news = {};
service.news.put = function(news) {
loading++;
return $http.post(url("news", "put", {location: location}), news)
.success(success).error(error);
};
service.news.get = function(id) {
loading++;
return $http.get(url("news", "get", {location: location, id: id}))
.success(success).error(error);
};
service.news.fetch = function(rank, count) {
loading++;
return $http.get(url("news", "fetch", {location: location, rank: rank, count: count}))
.success(success).error(error);
};
service.news.read = function() {
//loading++; //No point displaying a loading screen in that case
return $http.get(url("news", "read", {location: location}));
//.success(success).error(error);
};
service.news.latest = function() {
//loading++; //No point displaying a loading screen in that case
return $http.get(url("news", "latest", {location: location}));
//.success(success).error(error);
};
service.news.delete = function(id) {
loading++;
return $http.get(url("news", "delete", {location: location, id: id}))
.success(success).error(error);
};
//////////////
//  STATS   //
//////////////
service.stats = {};
service.stats.devices = function() {
loading++;
return $http.get(url("stats", "devices", {location: location}))
.success(success).error(error);
};
service.stats.device = function(id) {
loading++;
return $http.get(url("stats", "device", {location: location, id: id}))
.success(success).error(error);
};
service.stats.person = function(id) {
loading++;
return $http.get(url("stats", "person", {location: location, id: id}))
.success(success).error(error);
};

//////////////
// COMMONS  //
//////////////
service.callMe = function() {
return $http.get(url("person", "me", {}))
.success(function(data) {
user = data;
redirect = true;
if (location == -1) {
if (data.favorite) {
service.favorite = data.favorite;
location = data.favorite;
}
}
});
};

service.loc = function() {
return location;
};

service.show = function(){
return show;
};

service.setLoc = function(newLocation) {
location = newLocation;
};

service.me = function() {
return user;
};

service.origin = function() {
return origin;
};


service.loading = function() {
return loading > 0;
};

// PRIVILEGES

$scope.$watch(function(){
return location;
}, function(){
local = "";
if(location && location !== -1){
$http.get(url("location", "acl", {location: location})).success(function(data){
local = data.status;
});
}
});

service.global = function(){
return user.globalAdmin;
};

service.local = function (){
return service.global() || local === "ADMIN";
};

service.owner = function (mail){
return !mail || service.local() || mail === origin;
};

fetchToken().success(function(){
console.log("Token loaded");
service.callMe().success(function(){
console.log("Personal Data loaded");
response.resolve(service);
}).error(function(){
console.log("Going to register");
show = true;
response.resolve(service);
});
});

return response.promise;
}]);
calApp.controller("ReloadCtrl", function($window) {
$window.location.hash = "#/calendar";
});

calApp.controller("CalendarCtrl", function($scope, endpoint) {
$scope.search = {};
$scope.search.person = '';
var d = new Date();
$scope.date = new Date(d.getFullYear(), d.getMonth(), d.getDate());

$scope.datePlus = function(offset){
return new Date($scope.date).setDate($scope.date.getDate() + offset);
};

$scope.toggle = function() {
if ($scope.search.person.length != 0) {
$scope.search.person = '';
} else {
$scope.search.person = endpoint.origin();
}
}

$scope.$watch('search.assets', function() {
if ($scope.search.assets == null) {
$scope.search = {
person: $scope.search.person
};
}
})

$scope.changeDate = function() {
$scope.pick = $scope.pick ? false : true;
};

$scope.tomorrow = function() {
$scope.date.setDate($scope.date.getDate() + 1);
};

$scope.yesterday = function() {
$scope.date.setDate($scope.date.getDate() - 1);
};

$scope.getDate = function(y, m, d) {
return new Date(y, m - 1, d);
};

endpoint.asset.list().success(function(data) {
$scope.devices = data.items;
});
});

calApp.controller("MenuCtrl", function($scope, endpoint) {
endpoint.then(function(endpoint) {
$scope.myName = function() {
return endpoint.me().name;
};
$scope.location = function() {
return endpoint.loc();
};
});
});
calApp.controller("LocationDrawer", function($scope, endpoint, $window) {
endpoint.then(function(endpoint) {
$scope.set = function(loc) {
endpoint.setLoc(loc);
$window.location.href = "#/reload"
};

$scope.active = function(loc) {
return loc == endpoint.loc;
};

$scope.refresh = function() {
endpoint.location.listActives().success(function(data) {
$scope.locations = data.items;
});
};
$scope.refresh();
});
});

calApp.controller("GlobalCtrl", function($scope, endpoint) {
$scope.add = function() {
endpoint.person.grantGlobal($scope.admin).success(function() {
$scope.feedback = "GLOBAL_SUCCESS";
}).error(function(){
$scope.feedback = "GLOBAL_FAILURE";
});
}
});
calApp.controller("ListAssetCtrl", function($scope, endpoint) {
function refresh() {
endpoint.asset.list().success(function(data) {
$scope.assets = data.items;
});
}
refresh();
$scope.delete = function(id) {
endpoint.asset.delete(id).success(refresh);
};
});
calApp.controller("NewAssetCtrl", function($scope, endpoint) {
$scope.a = {};
$scope.submit = function() {
if(!$scope.rgb){
$scope.error = "ERROR_ASSET_COLOR";
return;
}
if(!$scope.a.name){
$scope.error = "ERROR_ASSET_NAME";
return;
}
$scope.a.r = $scope.rgb.r;
$scope.a.g = $scope.rgb.g;
$scope.a.b = $scope.rgb.b;
endpoint.asset.put($scope.a).success(function() {
window.location.href = "#/asset/list";
});
};
});
calApp.controller("EditAssetCtrl", function($scope, $stateParams, endpoint) {
$scope.a = {};
$scope.submit = function() {
$scope.a.r = $scope.rgb.r;
$scope.a.g = $scope.rgb.g;
$scope.a.b = $scope.rgb.b;
endpoint.asset.put($scope.a).success(function() {
window.location.href = "#/asset/list";
});
};

endpoint.asset.get($stateParams.id).success(function(data) {
$scope.a = data;
$scope.rgb = {r: data.r, g: data.g, b: data.b}
});
});
calApp.controller("TypeListCtrl", function($scope, $http){
$http.get('/_ah/api/type/v1/list').success(function(data){
$scope.types = data.items;
});
});
calApp.controller("TypeNewCtrl", function($scope, $http){
$scope.submit = function(){
$http.post('/_ah/api/type/v1/put', $scope.t).success(function(){
window.location.href = "#/type";
});
};
});
calApp.controller("TypeEditCtrl", function($scope, $stateParams, $http){
$scope.submit = function(){
$http.post('/_ah/api/asset/v1/put', $scope.a).success(function(){
window.location.href = "#/type";
});
};
$http.get('/_ah/api/type/v1/get?id='+$stateParams.id).success(function(data){
$scope.t = data;
});
});
calApp.controller("RegisterCtrl", function($scope, endpoint, $window) {
$scope.show = false;
$scope.loading = function(){
return true;
};
endpoint.then(function(endpoint) {
$scope.show = endpoint.show()

$scope.loading = function() {
return endpoint.loading();
}
$scope.submit = function() {
endpoint.person.register($scope.name)
.success(function() {
$window.location.hash = "/apply"
$scope.show = false;
ndp.callMe();
});
}
});
});
calApp.controller("ApplyLocationCtrl", function($scope, endpoint) {
$scope.state = {};
$scope.apply = function(location) {
endpoint.person.apply(location).success(function() {
if (!$scope.state[location]) {
$scope.state[location] = 'PENDING';
}
});
};
$scope.pending = function(loc) {
return $scope.state[loc] === 'PENDING';
};
$scope.user = function(loc) {
return $scope.state[loc] === 'USER' || $scope.state[loc] === 'ADMIN';
};

endpoint.location.list().success(function(data) {
$scope.locations = data.items;
});
endpoint.person.status().success(function(data) {
for (var i = 0; i < data.items.length; i++) {
$scope.state[data.items[i].location] = data.items[i].status;
}
});
});
calApp.controller("ListLocationCtrl", function($scope, endpoint) {
endpoint.location.list().success(function(data) {
$scope.locations = data;
});
});
calApp.controller("EditLocationCtrl", function($scope, $stateParams, endpoint, $window) {
$scope.id = $stateParams.id;
$scope.state = 'pending';
$scope.submit = function() {
endpoint.location.put({
name: $scope.name,
id: $scope.id
}).success(function() {
$window.location.href = "#/location/list";
});
};
endpoint.location.get($scope.id).success(function(data) {
$scope.name = data.name;
});

$scope.toUser = function(user) {
endpoint.person.promote(user, $scope.id)
.success(refresh);
};
$scope.delete = function(user) {
endpoint.person.demote(user, $scope.id)
.success(refresh);
};
$scope.toAdmin = function(user) {
endpoint.person.grantLocal(user, $scope.id)
.success(refresh);
};

$scope.select = function(user) {
$scope.selected = user;
};

refresh = function() {
$scope.selected = '';
endpoint.person.listAdmins($scope.id).success(function(data) {
$scope.admins = data.items;
});
endpoint.person.listPending($scope.id).success(function(data) {
$scope.pendings = data.items;
});
endpoint.person.listActives($scope.id).success(function(data) {
$scope.users = data.items;
});
};

refresh();
});
calApp.controller("NewLocationCtrl", function($scope, endpoint, $window) {
$scope.submit = function() {
endpoint.location.put({
name: $scope.name
}).success(function() {
$window.location.href = "#/location/list";
});
};
});
calApp.controller("NewReservationCtrl", function($scope, $stateParams, $window, endpoint) {
var hashmap = {};
$scope.error = {}
$scope.sassets = [{value: "", number: 0}];

$scope.addAsset = function() {
$scope.sassets.push({value: "", number: $scope.sassets.length});
};

$scope.removeAsset = function(id) {
$scope.sassets.splice(id, 1);
for (var i = id; i < $scope.sassets.length; i++) {
$scope.sassets[i].number--;
}
};

endpoint.asset.list().success(function(data) {
$scope.assets = data.items;
for (var i = 0; i < data.items.length; i++) {
hashmap[data.items[i].id] = data.items[i];
}
});

$scope.r = {};
$scope.date = new Date($stateParams.date);
$scope.r.date = new Date($stateParams.date);

$scope.r.start = $stateParams.start;
$scope.r.end = $stateParams.end;

$scope.getDate = function(y, m, d) {
return new Date(y, m - 1, d);
};

$scope.$watch(function() {
return $scope.r.start;
}, function() {
if ($scope.r.start * 1 >= $scope.r.end * 1) {
$scope.r.end = $scope.r.start * 1 + 1;
}
});
$scope.$watch(function() {
return $scope.r.end;
}, function() {
if ($scope.r.start * 1 >= $scope.r.end * 1) {
$scope.r.start = $scope.r.end * 1 - 1;
}
});

$scope.submit = function() {
$scope.r.assets = [];
$scope.r.date = $scope.date;
for (var i = 0; i < $scope.sassets.length; i++) {
$scope.r.assets.push(hashmap[$scope.sassets[i].value]);
}
endpoint.res.put($scope.r).success(function() {
$window.location.href = "#/";
}).error(function(data) {
if (data.error && data.error.message === "java.lang.Exception: RESERVATION COLLISION") {
$scope.error.collision = true;
}
;
});

};
});
calApp.controller("EditReservationCtrl", function($scope, $stateParams, endpoint, $window) {
var hashmap = {};
var deleted = false;
$scope.error = {};
$scope.sassets = [];
$scope.addAsset = function() {
$scope.sassets.push({value: "", number: $scope.sassets.length});
};

$scope.removeAsset = function(id) {
$scope.sassets.splice(id, 1);
for (var i = id; i < $scope.sassets.length; i++) {
$scope.sassets[i].number--;
}
};

$scope.delete = function() {
endpoint.res.delete($stateParams.id).success(function() {
$window.location.href = "#/calendar";
});
};

endpoint.asset.list().success(function(data) {

$scope.assets = data.items;
for (var i = 0; i < data.items.length; i++) {
hashmap[data.items[i].id] = data.items[i];
}
endpoint.res.get($stateParams.id).success(function(data) {
$scope.r = data;
$scope.$watch(function() {
return $scope.r.start;
}, function() {
if ($scope.r.start * 1 >= $scope.r.end * 1) {
$scope.r.end = $scope.r.start * 1 + 1;
}
});
$scope.$watch(function() {
return $scope.r.end;
}, function() {
if ($scope.r.start * 1 >= $scope.r.end * 1) {
$scope.r.start = $scope.r.end * 1 - 1;
}
});
$scope.date = new Date(data.date);
for (var i = 0; i < data.assets.length; i++) {
if (data.assets[i].active === false) {
deleted = true; //Presence of a deleted device
}
$scope.sassets.push({value: data.assets[i].id, number: $scope.sassets.length, raw: data.assets[i]});
}
;
});
});

$scope.getDate = function(y, m, d) {
return new Date(y, m - 1, d);
};
$scope.submit = function() {
$scope.r.assets = [];
$scope.r.date = $scope.date;
for (var i = 0; i < $scope.sassets.length; i++) {
$scope.r.assets.push(hashmap[$scope.sassets[i].value]);
}
endpoint.res.put($scope.r).success(function() {
window.location.href = "#/";
}).error(function(data) {
if (data.error && data.error.message === "java.lang.Exception: RESERVATION COLLISION") {
$scope.error.collision = true;
}
;
if (deleted) {
$scope.error.deleted = true;
}
;
});
;
};
});
calApp.controller("NewNewsCtrl", function($scope, $window, endpoint) {
$scope.n = {}
$scope.submit = function() {
endpoint.news.put($scope.n).success(function() {
$window.location.hash = "/";
});
};
});
calApp.controller("EditNewsCtrl", function($scope, $window, $stateParams, endpoint) {
endpoint.news.get($stateParams.id).success(function(data) {
$scope.n = data;
});
$scope.submit = function() {
endpoint.news.put($scope.n).success(function() {
$window.location.hash = "/";
});
};
});
calApp.controller("ListNewsCtrl", function($scope, endpoint) {
function refresh() {
endpoint.news.fetch(0, 30).success(function(data) {
$scope.news = data.items;
});
}
refresh();
$scope.delete = function(id){
endpoint.news.delete(id).success(refresh);
}
});
calApp.controller("DevicesStatsCtrl", function($scope, endpoint) {
endpoint.stats.devices().success(function(data) {
$scope.stats = data.items;
});
});
calApp.controller("DeviceStatsCtrl", function($scope, $stateParams, endpoint) {
endpoint.stats.device($stateParams.id).success(function(data) {
$scope.stats = data;
});
});
calApp.controller("PersonStatsCtrl", function($scope, $stateParams, endpoint) {
endpoint.stats.person($stateParams.id).success(function(data) {
$scope.stats = data;
});
});
calApp.controller("MyStatsCtrl", function($scope, endpoint){
endpoint.stats.person(endpoint.me().mail).success(function(data){
$scope.stats = data;
});
});
calApp.directive("calHourPicker", function() {
return({
templateUrl: '/directives/hourpicker/hourpicker.html',
restrict: 'E',
scope: {
min: '@',
max: '@',
id: '@',
date: '=',
offset: '@',
class: '@',
filter: '='
},
controller: function($scope, $window, endpoint) {

function dte(){
return new Date($scope.date.getFullYear(), $scope.date.getMonth(), $scope.date.getDate() + $scope.offset*1);
}
console.log($scope.date);
console.log(dte());

endpoint.then(function(endpoint) {
$scope.goto = function(id){
$window.location.href = "#/reservation/edit/" + id;
};

//bindings
var start;
var end;
var active = false;
function down(event) {
start = event.target.attributes["data-value"].value;
end = event.target.attributes["data-value"].value;
active = true;
draw($scope.id, start, end);
}

function up(event) {
if (!active) {
return;
}
var s = Math.min(start * 1, end * 1);
var e = Math.max(start * 1, end * 1);
active = false;
window.location.href = "#/reservation/new/" + dte().toJSON() + "/" + s + "/" + (e * 1 + 1);
}

function leave(event) {
active = false;
e = document.getElementById(id + "_" + "range").display = 'none';
}

function join(event) {
if (!active) {
return;
}
end = event.target.attributes["data-value"].value;
draw($scope.id, start, end);
}


var trg = document.getElementById($scope.id);
trg.addEventListener("pointerdown", down, false);
trg.addEventListener("pointerup", up, false);
trg.addEventListener("pointerleave", leave, false);
trg.addEventListener("pointermove", join, false);
function draw(id, s, f) {

var begin = Math.min(s, f);
var end = Math.max(s, f);
var h = document.getElementById(id + "_" + begin).offsetHeight;
var w = document.getElementById(id + "_" + begin).offsetWidth;
var e = document.getElementById(id + "_" + "range");
e.style.top = (begin - 2*$scope.min + 1) * h;
e.style.height = (end - begin + 1) * h;
e.style.left = 26;
e.style.width = w;
e.style.display = "block";
}

//Reservations
function refreshRes() {
endpoint.res.list(dte()).success(function(data) {
if (data.items) {
for (var i = 0; i < data.items.length; i++) {
var event = data.items[i];
var h = document.getElementById($scope.id + "_" + event.start).offsetHeight;
var w = document.getElementById($scope.id + "_" + event.start).offsetWidth;
event.top = h * (event.start - 2*$scope.min + 1)
event.height = (event.end - event.start) * h;
event.width = w;
var colors = [];
for (var j = 0; j < event.assets.length; j++) {
colors.push('rgba(' + event.assets[j].r + ',' + event.assets[j].g + ',' + event.assets[j].b + ',0.5)');
}
event.gradient = colors.join(',');
if (colors.length == 1) {
event.gradient = event.gradient + ', ' + event.gradient;
}
}
}
$scope.events = data.items;
});
}
refreshRes();
$scope.$watch(function(){
return $scope.date.toJSON();
}, refreshRes);
//Logic
$scope.hours = [];
var min = $scope.min * 1;
var max = $scope.max * 1;
for (var i = min; i <= max; i++) {
$scope.hours.push(i);
}
});
}
});
});


//Year is yyyy
//Month is in the form 0-11
//Day is 1-31

function getCalendar(year, month, day) {
var days = new Date(year, month + 1, 0).getDate();
var offset = new Date(year, month, 1).getDay() - 1;
offset = offset === -1 ? 6 : offset;
var lines = Math.ceil((days + offset) / 7);
var cal = [];
var actual_day = 1 - offset;
for (var l = 0; l < lines; l++) {
var row = [];
for (var c = 0; c < 7; c++) {
row.push({
id: actual_day,
number: new Date(year, month, actual_day).getDate(),
otherMonth: actual_day < 1 || actual_day > days,
selected: actual_day === day,
today: actual_day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()
});
actual_day++;
}
cal.push(row);
}
return cal;
}

calApp.directive("calEndar", function() {
return {
templateUrl: '/directives/calendar/calendar.html',
restrict: 'E',
scope: {
date: '=',
class: '@'
},
controller: function($scope) {

function refreshCal() {
var d = new Date($scope.date);
$scope.cal = getCalendar(d.getFullYear(), d.getMonth(), d.getDate());
}

refreshCal();
$scope.$watch(function(){
return new Date($scope.date).toJSON();
}, refreshCal);

$scope.select = function(day) {
$scope.date.setDate(day);
};
}
};
});
calApp.directive("calMenu", function() {
return {
templateUrl: "/directives/bmenu/bmenu.html",
restrict: 'E',
transclude: true,
scope: {
mClass: '@',
bClass: '@',
value: '@',
search: '=',
data: '=in'
},
controller: function($scope, endpoint) {
endpoint.then(function(endpoint) {
$scope.$watch('togglePerson', function() {
if (!$scope.togglePerson) {
$scope.search.person = '';
} else {
$scope.search.person = endpoint.origin();
}
});


$scope.show = false;

$scope.toggle = function() {
$scope.show = !$scope.show;
};
});
}
};
});
calApp.directive("calStar", function() {
return {
restrict: 'E',
templateUrl: '/directives/favorite/favorite.html',
scope: {
location: '='
},
controller: function($scope, endpoint) {
endpoint.then(function(endpoint) {
$scope.star = function() {
return $scope.location === endpoint.favorite ? 'icon-star' : 'icon-star-o';
}

$scope.select = function() {
if (endpoint.favorite !== $scope.location) {
endpoint.favorite = $scope.location;
endpoint.person.favorite($scope.location);
}
}
});
}
}
})
calApp.directive("colorPick", function() {
return {
scope: {
model: '='
},
restrict: "EA",
templateUrl: '/directives/colorpicker/colorpicker.html',
controller: function($scope) {
ColorPicker.fixIndicators(
document.getElementById('slider-indicator'),
document.getElementById('picker-indicator'));
var skip = true;
var cp = ColorPicker(
document.getElementById('slider'),
document.getElementById('picker'),
function(hex, hsv, rgb, pickerCoordinate, sliderCoordinate) {
$scope.model = rgb;
ColorPicker.positionIndicators(
document.getElementById('slider-indicator'),
document.getElementById('picker-indicator'),
sliderCoordinate, pickerCoordinate
);
if (!skip) {
$scope.$apply();
}
skip = false;
});
$scope.$watch('""+r+g+b', function() {
cp.setRgb($scope.model);
});

}
}
})
calApp.directive('newsFeed', function() {
return {
templateUrl: '/directives/newsfeed/newsfeed.html',
restrict: 'EA',
scope: {
limit: "@",
rank: "@",
pClass: "@"
},
controller: function($scope, endpoint) {
endpoint.then(function(endpoint) {
endpoint.news.fetch($scope.rank, $scope.limit).success(function(data) {
$scope.news = data.items;
});
});
}
}
})
//Disable .prop( "disabled", false );
calApp.directive("calEnableOwner", function() {
return {
restrict: 'A',
scope: {calEnableOwner:"@"},
link: function($scope, element, attributes) {
$scope.$watch(function() {
return $scope.trigger();
}, function() {
if ($scope.trigger()) {
element.prop( "disabled", false );
} else {
element.prop( "disabled", true );
}
});
},
controller: function($scope, endpoint) {
$scope.trigger = function() {
return 0;
};

endpoint.then(function(endpoint) {
$scope.trigger = function() {
return endpoint.owner($scope.calEnableOwner);
};

});
}
};
});

calApp.directive("calEnableGlobal", function() {
return {
restrict: 'A',
scope: {},
link: function($scope, element, attributes) {
$scope.$watch(function() {
return $scope.trigger();
}, function() {
if ($scope.trigger()) {
element.prop( "disabled", false );
} else {
element.prop( "disabled", true );
}
});
},
controller: function($scope, endpoint) {
$scope.trigger = function() {
return 0;
};

endpoint.then(function(endpoint) {
$scope.trigger = function() {
return endpoint.global();
};

});
}
};
});

calApp.directive("calEnableLocal", function() {
return {
restrict: 'A',
scope: {},
link: function($scope, element, attributes) {
$scope.$watch(function() {
return $scope.trigger();
}, function() {
if ($scope.trigger()) {
element.prop( "disabled", false );
} else {
element.prop( "disabled", true );
}
});
},
controller: function($scope, endpoint) {
$scope.trigger = function() {
return 0;
};

endpoint.then(function(endpoint) {
$scope.trigger = function() {
return endpoint.local();
};

});
}
};
});

//Hide

calApp.directive("calShowOwner", function() {
return {
restrict: 'A',
scope: {calShowOwner:"@"},
link: function($scope, element, attributes) {
$scope.$watch(function() {
return $scope.trigger();
}, function() {
if ($scope.trigger()) {
element.css( "display", "" );
} else {
element.css( "display", "none" );
}
});
},
controller: function($scope, endpoint) {
$scope.trigger = function() {
return 0;
};

endpoint.then(function(endpoint) {
$scope.trigger = function() {
return endpoint.owner($scope.calShowOwner);
};

});
}
};
});

calApp.directive("calShowGlobal", function() {
return {
restrict: 'A',
scope: {},
link: function($scope, element, attributes) {
$scope.$watch(function() {
return $scope.trigger();
}, function() {
if ($scope.trigger()) {
element.css( "display", "" );
} else {
element.css( "display", "none" );
}
});
},
controller: function($scope, endpoint) {
$scope.trigger = function() {
return 0;
};

endpoint.then(function(endpoint) {
$scope.trigger = function() {
return endpoint.global();
};

});
}
};
});

calApp.directive("calShowLocal", function() {
return {
restrict: 'A',
scope: {},
link: function($scope, element, attributes) {
$scope.$watch(function() {
return $scope.trigger();
}, function() {
if ($scope.trigger()) {
element.css( "display", "" );
} else {
element.css( "display", "none" );
}
});
},
controller: function($scope, endpoint) {
$scope.trigger = function() {
return 0;
};

endpoint.then(function(endpoint) {
$scope.trigger = function() {
return endpoint.local();
};

});
}
};
});
calApp.directive("calDelete", function(){
return {
scope: {
action: '&',
bClass: '@'
},
restrict: 'E',
templateUrl: "/directives/delete/delete.html",
replace: true,
controller: function($scope){
console.log($scope);
$scope.delete = function(){
$scope.action();
$scope.show = false;
};
}
};
});
