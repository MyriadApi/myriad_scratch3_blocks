!function(e){var t={};function r(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,r),s.l=!0,s.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)r.d(n,s,function(t){return e[t]}.bind(null,s));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(r(1)),o=n(r(2));var a,l,i,c,u;!function(e){e.X="x",e.Y="y",e.Z="z"}(a||(a={})),function(e){e.on="ON",e.off="OFF"}(l||(l={})),function(e){e.enable="enable",e.disable="disable"}(i||(i={})),function(e){e.gyroscope="Gyroscope",e.accelerometer="Accelerometer",e.proximity="Proximity",e.lightSensor="Light",e.magnetometer="Magnetometer"}(c||(c={})),function(e){e.isNear="isNear",e.maxRange="maxRange",e.distance="distance"}(u||(u={}));const g=(e,t)=>{const r=JSON.stringify(t);return fetch(e,{method:"POST",body:r,headers:{Accept:"application/json","Content-Type":"application/json"}})},d=(e,t)=>{g(`${t}/device/light`,{enabled:e}).then(()=>{console.log(`${e} light`)}).catch(e=>{console.log(e)})},p=(e,t)=>{g(`${t}/device/vibration/vibrate`,{duration:e}).then(()=>{console.log(`vibrate ${e} msec`)}).catch(e=>{console.log(e)})};Scratch.extensions.register(new class{constructor(e){this.mayBeServerConnected=(e=>{const t=s.default.getState();return t.sensor?e(t.sensor):"error: you should set ip address"}),this.getSensorValueWhenEnabled=((e,t)=>this.mayBeServerConnected(r=>{const n=r[t];return n.enabled?e(n):`error: please enable ${t} in your app`})),this.runtime=e,this.sensorObserver=new o.default}toggleFlashLight(e){const t=s.default.getState().address;if(t)switch(e.TOGGLE){case l.on:d(!0,t);break;case l.off:d(!1,t);break;default:console.log("something worng")}else console.log("plase set url")}getGyroscope(e){return this.getSensorValueWhenEnabled(t=>{switch(e.AXIS){case a.X:return t.x;case a.Y:return t.y;case a.Z:return t.z;default:return"error"}},"gyroscope")}getAccelerometer(e){return this.getSensorValueWhenEnabled(t=>{switch(e.AXIS){case a.X:return t.x;case a.Y:return t.y;case a.Z:return t.z;default:return"error"}},"accelerometer")}getMagnetometer(e){return this.getSensorValueWhenEnabled(t=>{switch(e.AXIS){case a.X:return t.x;case a.Y:return t.y;case a.Z:return t.z;default:return"error"}},"magnetometer")}getLight(){return this.getSensorValueWhenEnabled(e=>e.value,"light")}getProximity(e){return this.getSensorValueWhenEnabled(t=>{switch(e.PROXIMITY){case u.isNear:return t.isNear?"near":"far";case u.distance:return t.value;case u.maxRange:return t.maxRange;default:return"error"}},"proximity")}setIpAddress(e){const t=(()=>{const t=e.IP,r="/"===t.slice(-1)?t.slice(0,-1):t;return r.includes("http://")||r.includes("https://")?r:"http://"+r})();this.sensorObserver.stopObserving(),this.sensorObserver.startObserving(t,s.default.newState),s.default.newState({address:t})}toggleSensor(e){const t=e.TOGGLE,r=e.SENSORS,n={enabled:t===i.enable},o=s.default.getState().address;if(o){const e=`${o}/sensor${(e=>{switch(e){case c.accelerometer:return"/accelerometer";case c.gyroscope:return"/gyroscope";case c.lightSensor:return"/light";case c.magnetometer:return"/magnetometer";case c.proximity:return"/proximity";default:return""}})(r)}`;g(e,n)}}doVibration(e){const t=1e3*e.DURATION,r=s.default.getState().address;r&&p(t,r)}axisMenu(){return[{value:a.X,text:"X"},{value:a.Y,text:"Y"},{value:a.Z,text:"Z"}]}proximityMenu(){return[{value:u.isNear,text:"Near/Far"},{value:u.maxRange,text:"max range"},{value:u.distance,text:"distance"}]}toggleMenu(){return[{value:l.on,text:"ON"},{value:l.off,text:"OFF"}]}toggleSensorMenu(){return[{value:i.enable,text:i.enable},{value:i.disable,text:i.disable}]}sensorsMenu(){return[{value:c.accelerometer,text:c.accelerometer},{value:c.magnetometer,text:c.magnetometer},{value:c.gyroscope,text:c.gyroscope},{value:c.lightSensor,text:c.lightSensor},{value:c.proximity,text:c.proximity}]}getInfo(){return{id:"myriadApiBlocks",name:"Myriad api blocks",docsURI:"",blocks:[{opcode:"setIpAddress",blockType:"command",text:"set ip address [IP]",arguments:{IP:{type:"string",defaultValue:"http://localhost:8080"}},filter:["sprite","stage"]},{opcode:"toggleSensor",blockType:"command",text:"[TOGGLE] [SENSORS] sensor",arguments:{TOGGLE:{type:"string",menu:"toggleSensors",defaultValue:i.enable},SENSORS:{type:"string",menu:"sensors",defaultValue:c.accelerometer}},filter:["sprite","stage"]},{opcode:"doVibration",blockType:"command",text:"Vibrate for [DURATION] seconds.",arguments:{DURATION:{type:"number",defaultValue:1}},filter:["sprite","stage"]},{opcode:"toggleFlashLight",blockType:"command",text:"Turn [TOGGLE] flash light",arguments:{TOGGLE:{type:"string",menu:"toggle",defaultValue:l.on}},filter:["sprite","stage"]},{opcode:"getGyroscope",blockType:Scratch.BlockType.REPORTER,branchCount:0,isTerminal:!0,blockAllThreads:!1,text:"[AXIS] axis of gyroscope",arguments:{AXIS:{type:"string",menu:"axis",defaultValue:a.X}},filter:["sprite","stage"]},{opcode:"getAccelerometer",blockType:Scratch.BlockType.REPORTER,branchCount:0,isTerminal:!0,blockAllThreads:!1,text:"[AXIS] axis of accelerometer",arguments:{AXIS:{type:"string",menu:"axis",defaultValue:a.X}},filter:["sprite","stage"]},{opcode:"getMagnetometer",blockType:Scratch.BlockType.REPORTER,branchCount:0,isTerminal:!0,blockAllThreads:!1,text:"[AXIS] axis of magnetometer",arguments:{AXIS:{type:"string",menu:"axis",defaultValue:a.X}},filter:["sprite","stage"]},{opcode:"getProximity",blockType:Scratch.BlockType.REPORTER,branchCount:0,isTerminal:!0,blockAllThreads:!1,text:"Proximity [PROXIMITY]",arguments:{PROXIMITY:{type:"string",menu:"proximity",defaultValue:u.isNear}},filter:["sprite","stage"]},{opcode:"getLight",blockType:Scratch.BlockType.REPORTER,branchCount:0,isTerminal:!0,blockAllThreads:!1,text:"Light sensor",filter:["sprite","stage"]}],menus:{axis:this.axisMenu(),proximity:this.proximityMenu(),toggle:this.toggleMenu(),toggleSensors:this.toggleSensorMenu(),sensors:this.sensorsMenu()},translation_map:{ja:{extensionName:"Myriad Api Blocks",getGyroscope:"ジャイロスコープ [AXIS] 軸の値 ","myReporter.TEXT_default":"Text","myReporter.result":"Buchstabe {LETTER_NUM} von {TEXT} ist {LETTER}."}},targetTypes:[]}}})},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=(e=>{let t=Object.freeze(e);return{newState:e=>{const r=Object.assign({},t,e);t=Object.freeze(r)},getState:()=>t}})({isConnected:!1});t.default=n},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=class{startObserving(e,t){this.observingId=setInterval(()=>{fetch(`${e}/sensor`).then(e=>e.json()).then(e=>{t({isConnected:!0,sensor:e})}).catch(()=>{console.log("error"),t({isConnected:!1})})},50)}stopObserving(){this.observingId&&clearInterval(this.observingId)}}}]);