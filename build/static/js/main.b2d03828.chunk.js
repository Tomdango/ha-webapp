(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{113:function(e,t,n){"use strict";var a=n(53),r=n(54),o=n(56),c=n(55),u=n(57),i=n(0),l=n.n(i),s=n(186),d=n(187),f=n(32),E=n(188),p=n(189),m=n(194),A=n(190),y=n(197),h=n(193),b=n(192),O=n(127),g=n(58),S=n(63),v=function(e){function t(e){var n,r;Object(a.a)(this,t);for(var u=arguments.length,i=new Array(u>1?u-1:0),l=1;l<u;l++)i[l-1]=arguments[l];return(r=Object(o.a)(this,(n=Object(c.a)(t)).call.apply(n,[this,e].concat(i)))).handleSubmit=function(){var e=r.state,t=e.name,n=e.selectedArea,a=r.props,o=a.handleSubmit,c=a.setupNodeId,u={};u.name=""!==t,u.selectedArea=null!==n,Object.values(u).reduce(function(e,t){return!!e&&t},!0)?(o(c,t,n),r.setState({validation:{}})):r.setState({validation:u})},r.handleAreaSelect=function(e){var t=e.target.value;r.setState({selectedArea:t})},r.state={selectedArea:null,name:"",validation:{name:!0,selectedArea:!0}},r}return Object(u.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.areasFetched,n=e.ensureAreas;t||n()}},{key:"render",value:function(){var e=this,t=this.props,n=t.setupActive,a=t.handleClose,r=t.handleCancel,o=t.areas,c=this.state,u=c.selectedArea,i=c.validation,f=c.name;return l.a.createElement(s.a,{onClose:a,open:n},l.a.createElement(d.a,null,"Node Setup"),l.a.createElement(E.a,null,l.a.createElement(p.a,null,"This Node requires setup before it can operate properly."),l.a.createElement(m.a,{margin:"none",label:"Name",type:"text",fullWidth:!0,error:!i.name&&0===f.length,onChange:function(t){return e.setState({name:t.target.value})},style:{marginBottom:20}}),l.a.createElement(A.a,{style:{width:"100%",marginBottom:20}},l.a.createElement(y.a,null,"Assigned Room"),l.a.createElement(h.a,{value:u,onChange:this.handleAreaSelect,placeholder:"Assigned Room",error:!i.selectedArea&&null===u,margin:"none",label:"Room"},o.map(function(e){return l.a.createElement(b.a,{value:e.areaId},e.name)}))),l.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},l.a.createElement(O.a,{variant:"contained",color:"secondary",style:{marginBottom:10},onClick:r},"Cancel"),l.a.createElement(O.a,{onClick:this.handleSubmit,type:"submit",variant:"contained",style:{marginLeft:10,marginBottom:10}},"Submit"))))}}]),t}(i.Component);t.a=Object(f.b)(function(e){return{setupActive:e.nodes.setup.setupActive,areas:e.areas.data.areas,areasFetched:e.areas.data.areasFetched,setupNodeId:e.nodes.setup.setupNodeId}},function(e){return{handleClose:function(){return e(Object(g.b)())},handleCancel:function(){return e(Object(g.a)())},handleSubmit:function(t,n,a){return e(Object(g.h)(t,n,a))},ensureAreas:function(){return e(Object(S.g)())}}})(v)},116:function(e,t,n){"use strict";(function(e){var a=n(62),r=n(0),o=n.n(r),c=n(183),u=n(184),i=n(185),l=n(52),s=n(121),d=n.n(s),f=n(195),E=n(126),p=n(31),m=n(50),A=n(120),y=n.n(A),h=n(32),b=n(181),O=n(51),g=n(38),S=n(182),v=n(26),N=Object(h.b)(function(e){return{uninitializedNodes:e.nodes.discovery.uninitializedNodes.length}},null)(function(t){var n=t.onClose,a=t.onOpen,r=t.open,c=t.uninitializedNodes,u=e.browser&&/iPad|iPhone|iPod/.test(navigator.userAgent);return o.a.createElement(f.a,{onClose:n,onOpen:a,disableBackdropTransition:!u,disableDiscovery:u,open:r},o.a.createElement(E.a,{style:{minWidth:300}},o.a.createElement(g.b,{className:"sidebar-links",to:"/",as:p.a},o.a.createElement(p.a,{button:!0},o.a.createElement(m.a,null),o.a.createElement(O.a,{primary:"Home"}))),o.a.createElement(b.a,null),o.a.createElement(g.b,{className:"sidebar-links",to:"".concat(v.a,"/areas"),onClick:n,as:p.a},o.a.createElement(p.a,{button:!0},o.a.createElement(m.a,null),o.a.createElement(O.a,{primary:"Areas"}))),o.a.createElement(g.b,{className:"sidebar-links",to:"".concat(v.a,"/nodes"),onClick:n,as:p.a},o.a.createElement(p.a,{button:!0},o.a.createElement(m.a,null),o.a.createElement(O.a,{primary:"Nodes"}))),o.a.createElement(g.b,{className:"sidebar-links",to:"".concat(v.a,"/routines"),onClick:n,as:p.a},o.a.createElement(p.a,{button:!0},o.a.createElement(m.a,null),o.a.createElement(O.a,{primary:"Routines"}))),o.a.createElement(g.b,{className:"sidebar-links",to:"".concat(v.a,"/setup"),onClick:n,as:p.a},c?o.a.createElement(p.a,{button:!0},o.a.createElement(S.a,{variant:"standard",badgeContent:c,color:"secondary"},o.a.createElement(m.a,null),o.a.createElement(O.a,{style:{paddingRight:10}},"Setup"))):o.a.createElement(p.a,{button:!0},o.a.createElement(o.a.Fragment,null,o.a.createElement(m.a,null),o.a.createElement(O.a,{primary:"Setup"}))))),o.a.createElement(E.a,null,o.a.createElement(p.a,{button:!0},o.a.createElement(m.a,null,o.a.createElement(y.a,null)),o.a.createElement(O.a,{primary:""}))))});t.a=function(){var e=o.a.useState({open:!1}),t=Object(a.a)(e,2),n=t[0],r=t[1],s=function(e){return function(t){(!t||"keydown"!==t.type||"Tab"!==t.key&&"Shift"!==t.key)&&r({open:e})}};return o.a.createElement(o.a.Fragment,null,o.a.createElement(N,{open:n.open,onClose:s(!1),onOpen:s(!0)}),o.a.createElement(c.a,{position:"static"},o.a.createElement(u.a,null,o.a.createElement(i.a,{onClick:s(!0),edge:"start",color:"inherit","aria-label":"Menu"},o.a.createElement(d.a,null)),o.a.createElement(l.a,{variant:"h6"},"163 Roberts Wharf"))))}}).call(this,n(95))},12:function(e,t,n){"use strict";n.d(t,"h",function(){return a}),n.d(t,"b",function(){return r}),n.d(t,"l",function(){return o}),n.d(t,"g",function(){return c}),n.d(t,"j",function(){return u}),n.d(t,"d",function(){return i}),n.d(t,"q",function(){return l}),n.d(t,"r",function(){return s}),n.d(t,"a",function(){return d}),n.d(t,"c",function(){return f}),n.d(t,"s",function(){return E}),n.d(t,"t",function(){return p}),n.d(t,"n",function(){return m}),n.d(t,"k",function(){return A}),n.d(t,"f",function(){return y}),n.d(t,"m",function(){return h}),n.d(t,"o",function(){return b}),n.d(t,"e",function(){return O}),n.d(t,"p",function(){return g}),n.d(t,"i",function(){return S});var a="AREAS.FETCHING_AREA_DATA",r="AREAS.AREA_DATA_FETCHED",o="AREAS.OPEN_NEW_AREA_MODAL",c="AREAS.CLOSE_NEW_AREA_MODAL",u="AREAS.IN_PROGRESS",i="AREAS.AREA_SUCCESSFULLY_CREATED",l="AREAS.SINGLE_AREA_FETCH",s="AREAS.SINGLE_AREA_FETCH_SUCCESSFUL",d="AREAS.AREA_CREATION_FAILED",f="AREAS.AREA_NOT_FOUND",E="AREAS.TEMP_UPDATE",p="AREAS.TEMP_UPDATE_SUCCESS",m="AREAS.ROUTINE_SUCCESSFULLY_ADDED",A="AREAS.OPEN_EDIT_ROUTINE_DIALOG",y="AREAS.CLOSE_EDIT_ROUTINE_DIALOG",h="AREAS.RESET_EDIT_ROUTINE_DIALOG",b="AREAS.ROUTINE_SUCCESSFULLY_DELETED",O="AREAS.AREA_SUCCESSFULLY_DELETED",g="AREAS.SET_NODES_SUCCESSFUL",S="AREAS.HEATING_TOGGLE_SUCCESS"},14:function(e,t,n){"use strict";n.d(t,"f",function(){return a}),n.d(t,"a",function(){return r}),n.d(t,"l",function(){return o}),n.d(t,"c",function(){return c}),n.d(t,"g",function(){return u}),n.d(t,"j",function(){return i}),n.d(t,"i",function(){return l}),n.d(t,"e",function(){return s}),n.d(t,"m",function(){return d}),n.d(t,"d",function(){return f}),n.d(t,"b",function(){return E}),n.d(t,"k",function(){return p}),n.d(t,"h",function(){return m});var a="NODES.FETCHING_AREA_DATA",r="NODES.AREA_DATA_FETCHED",o="NODES.SET_ACTIVE_NODE",c="NODES.CLEAR_ACTIVE_NODE",u="NODES.FETCHING_NODE_INFO",i="NODES.NODE_INFO_FETCHED",l="NODES.NODE_INFO_DIRECT_LOAD",s="NODES.DISCOVERED_NEW_NODE",d="NODES.START_NODE_SETUP",f="NODES.CLOSE_NODE_SETUP",E="NODES.CANCEL_NODE_SETUP",p="NODES.NODE_SETUP_SUCCESS",m="NODES.NODE_DATA_FETCHED"},143:function(e,t,n){e.exports=n(179)},170:function(e,t,n){},179:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),c=n.n(o),u=n(123),i=n(236),l=n(74),s=n(32),d=n(11),f=n(84),E=n.n(f),p=n(115),m=n(53),A=n(54),y=n(56),h=n(55),b=n(57),O=n(23),g=n.n(O),S=n(58),v=n(21),N=function(e){function t(e){var n,a;Object(m.a)(this,t);for(var r=arguments.length,o=new Array(r>1?r-1:0),c=1;c<r;c++)o[c-1]=arguments[c];return(a=Object(y.a)(this,(n=Object(h.a)(t)).call.apply(n,[this,e].concat(o)))).discoverNodes=Object(p.a)(E.a.mark(function e(){var t,n,r;return E.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=a.props,n=t.uninitializedNodes,r=t.nodesDiscovered,g.a.get(v.c.getUninitialised).then(function(e){var t=e.data,a=n.map(function(e){return e.nodeId}),o=t.filter(function(e){return!a.includes(e.nodeId)});o.length>0&&(d.c.info("There are new nodes which require setup."),r(o))}).catch(function(e){d.c.error("Failed to get node discovery info.\n".concat(e.toString()))});case 2:case"end":return e.stop()}},e)})),a.state={intervalIDs:[]},a}return Object(b.a)(t,e),Object(A.a)(t,[{key:"componentDidMount",value:function(){var e=[];[{func:this.discoverNodes,timeout:1e4}].forEach(function(t){t.func(),e.push(setInterval(t.func,t.timeout))}),this.setState(e)}},{key:"componentWillUnmount",value:function(){this.state.intervalIDs.forEach(clearInterval)}},{key:"render",value:function(){return null}}]),t}(a.Component),D=Object(s.b)(function(e){return{uninitializedNodes:e.nodes.discovery.uninitializedNodes}},function(e){return{nodesDiscovered:function(t){return e(Object(S.g)(t))}}})(N),R=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(D,null))},T=(n(170),n(38)),j=n(43),C=n(116).a,_=n(62),w=n(186),I=n(187),F=n(188),k=n(189),U=n(194),L=n(127),P=n(235),H=n(63),M=Object(j.f)(Object(s.b)(function(e){return{open:e.areas.config.newRoomModal,inProgress:"createNewArea"===e.areas.config.inProgress}},function(e){return{onClose:function(){return e(Object(H.b)())},createNewArea:function(t,n,a){return e(Object(H.c)(t,n,a))}}})(function(e){var t=e.open,n=e.onClose,a=e.inProgress,o=e.createNewArea,c=e.history,u=r.a.useState(!1),i=Object(_.a)(u,2),l=i[0],s=i[1],d=r.a.useState(""),f=Object(_.a)(d,2),E=f[0],p=f[1];return r.a.createElement(w.a,{open:t,onClose:n},r.a.createElement(I.a,null,"Create New Area"),r.a.createElement(F.a,null,r.a.createElement(k.a,null,"Creating a new area allows you to assign Nodes and set custom temperatures to that area."),r.a.createElement("form",null,r.a.createElement(U.a,{margin:"none",label:"Area Name",error:l&&!E,value:E,required:!0,autoFocus:!0,onChange:function(e){return p(e.target.value)},type:"text",fullWidth:!0,style:{marginBottom:20}}),r.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},r.a.createElement(L.a,{variant:"contained",color:"secondary",style:{marginBottom:10},onClick:function(){p(""),s(!1),n()}},"Cancel"),r.a.createElement("div",{style:{position:"relative"}},r.a.createElement(L.a,{variant:"contained",type:"submit",disabled:a,style:{marginLeft:10,marginBottom:10},onClick:function(e){e.preventDefault(),s(!0),E&&o(E,c,function(){p(""),s(!1)})}},"Submit"),a?r.a.createElement(P.a,{size:24,style:{position:"absolute",color:"#fff",top:"50%",left:"50%",marginTop:-17,marginLeft:-6}}):null)))))})),z=n(113),B=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(M,null),r.a.createElement(z.a,null))},W=n(26),x=r.a.lazy(function(){return n.e(9).then(n.bind(null,772))}),G=r.a.lazy(function(){return Promise.all([n.e(6),n.e(12)]).then(n.bind(null,773))}),q=r.a.lazy(function(){return Promise.all([n.e(0),n.e(8)]).then(n.bind(null,768))}),V=r.a.lazy(function(){return Promise.all([n.e(7),n.e(13)]).then(n.bind(null,774))}),Y=r.a.lazy(function(){return Promise.all([n.e(0),n.e(3),n.e(10)]).then(n.bind(null,769))}),J=r.a.lazy(function(){return Promise.all([n.e(0),n.e(5),n.e(11)]).then(n.bind(null,771))}),$=function(){return r.a.createElement(T.a,null,r.a.createElement(C,null),r.a.createElement(B,null),r.a.createElement(a.Suspense,{fallback:r.a.createElement("p",null,"Loading...")},r.a.createElement(j.c,null,r.a.createElement(j.a,{component:x,path:"".concat(W.a,"/areas"),exact:!0}),r.a.createElement(j.a,{component:Y,path:"".concat(W.a,"/areas/:id"),exact:!0}),r.a.createElement(j.a,{component:G,path:"".concat(W.a,"/nodes"),exact:!0}),r.a.createElement(j.a,{component:q,path:"".concat(W.a,"/nodes/:id"),exact:!0}),r.a.createElement(j.a,{component:J,path:"".concat(W.a,"/routines"),exact:!0}),r.a.createElement(j.a,{component:V,path:"".concat(W.a,"/setup"),exact:!0}))))},K=n(25),Q=n(122),X=n(44),Z=n(10),ee=n(12),te={TempUpdate:"DATAFEED.AREA.TEMPUPDATE",HumUpdate:"DATAFEED.AREA.HUMUPDATE",TargetSet:"DATAFEED.AREA.TARGETSET",NodeAdd:"DATAFEED.AREA.NODEADD",NewRoutine:"DATAFEED.AREA.NEWROUTINE",RemoveRoutine:"DATAFEED.AREA.REMOVEROUTINE",RemoveNode:"DATAFEED.AREA.REMOVENODE",NodesSet:"DATAFEED.AREA.NODESSET",SetHeatingEnabled:"DATAFEED.AREA.SETHEATINGENABLED"},ne={requestStatus:"idle",areasFetched:!1,areas:[],areasNotFound:[]},ae={newRoomModal:!1,inProgress:""},re={dialogOpen:!1,routineId:"",routineData:""},oe=Object(K.c)({data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ee.h:return Object(Z.a)({},e,{requestStatus:"fetching"});case ee.b:return Object(Z.a)({},e,{requestStatus:"idle",areas:t.payload,areasFetched:!0});case ee.d:return Object(Z.a)({},e,{areas:[].concat(Object(X.a)(e.areas),[t.payload])});case ee.r:var n=e.areas,a=t.payload.areaId,r=n.filter(function(e){return e.areaId!==a});return Object(Z.a)({},e,{areas:[].concat(Object(X.a)(r),[t.payload])});case ee.c:return e.areasNotFound.includes(t.payload)?e:Object(Z.a)({},e,{areasNotFound:[].concat(Object(X.a)(e.areasNotFound),[t.payload])});case te.TempUpdate:case te.HumUpdate:case te.TargetSet:case te.NodeAdd:case te.NewRoutine:case te.RemoveRoutine:case te.RemoveNode:case te.NodesSet:case te.SetHeatingEnabled:var o=t.payload.feed,c=[],u=[];return Object.keys(o).forEach(function(t){e.areas.forEach(function(e){e.areaId===t?c.push(Object(Z.a)({},e,o[t])):u.push(e)})}),Object(Z.a)({},e,{areas:[].concat(u,c)});default:return e}},config:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ee.l:return Object(Z.a)({},e,{newRoomModal:!0});case ee.g:return Object(Z.a)({},e,{newRoomModal:!1});case ee.j:return Object(Z.a)({},e,{inProgress:t.payload});case ee.d:return Object(Z.a)({},e,{inProgress:""});default:return e}},editRoutine:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re;switch((arguments.length>1?arguments[1]:void 0).type){case ee.k:return Object(Z.a)({},e,{dialogOpen:!0});case ee.f:return Object(Z.a)({},e,{dialogOpen:!1});case ee.m:return re;default:return e}}}),ce=n(14),ue={requestStatus:"idle",data:[]},ie={latestVersion:"2.0.0",activeNode:{id:"",data:{},loading:!1}},le={uninitializedNodes:[]},se={setupActive:!1,setupNodeId:"",currentSetup:{}},de={nodes:[],nodesLoaded:!1},fe=Object(K.c)({areas:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.f:return Object(Z.a)({},e,{requestStatus:"fetching"});case ce.a:return Object(Z.a)({},e,{requestStatus:"idle",data:t.payload});default:return e}},core:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.i:return Object(Z.a)({},e,{activeNode:Object(Z.a)({},e.activeNode,{id:t.payload,loading:!0})});case ce.j:return Object(Z.a)({},e,{activeNode:Object(Z.a)({},e.activeNode,{data:t.payload,name:t.payload.name,loading:!1})});case ce.l:return Object(Z.a)({},e,{activeNode:Object(Z.a)({},e.activeNode,t.payload)});case ce.g:return Object(Z.a)({},e,{activeNode:Object(Z.a)({},e.activeNode,{loading:!0})});case ce.c:return Object(Z.a)({},e,{activeNode:{id:"",data:{},loading:!1}});default:return e}},discovery:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.e:return Object(Z.a)({},e,{uninitializedNodes:[].concat(Object(X.a)(e.uninitializedNodes),Object(X.a)(t.payload))});case ce.k:var n=t.payload.node;return Object(Z.a)({},e,{uninitializedNodes:e.uninitializedNodes.filter(function(e){return e.nodeId!==n.nodeId})});default:return e}},setup:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:se,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.m:return t.payload===e.setupNodeId?Object(Z.a)({},e,{setupActive:!0}):Object(Z.a)({},e,{setupActive:!0,setupNodeId:t.payload,currentSetup:{}});case ce.d:return Object(Z.a)({},e,{setupActive:!1});case ce.b:return se;default:return e}},data:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:de,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case ce.h:return Object(Z.a)({},e,{nodes:t.payload,nodesLoaded:!0});default:return e}}}),Ee=n(82),pe={dialogOpen:!1},me=Object(K.c)({add:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:pe;switch((arguments.length>1?arguments[1]:void 0).type){case Ee.b:return Object(Z.a)({},e,{dialogOpen:!0});case Ee.a:return Object(Z.a)({},e,{dialogOpen:!1});default:return e}}}),Ae=Object(K.c)({nodes:fe,areas:oe,routines:me}),ye=(0,K.d)(Object(K.a)(Q.a)),he=function(){return Object(K.e)(Ae,ye)},be=function(e){function t(e){var n,a;Object(m.a)(this,t);for(var r=arguments.length,o=new Array(r>1?r-1:0),c=1;c<r;c++)o[c-1]=arguments[c];return(a=Object(y.a)(this,(n=Object(h.a)(t)).call.apply(n,[this,e].concat(o)))).openWebSocket=function(){var e=new WebSocket(v.b.areas);e.onopen=a.onOpen,e.onmessage=a.onMessage,e.onclose=a.onClose,e.onerror=a.onError},a.onOpen=function(){var e=a.state.initialConnection;a.setState({initialConnection:!0,connected:!0}),e?d.c.info("Datafeed.Area Reconnnected",{autoClose:2e3,transition:d.a,closeButton:!1}):d.c.info("Datafeed.Area Connnected",{autoClose:2e3,transition:d.a,closeButton:!1})},a.onClose=function(){var e=a.state,t=e.connected,n=e.currentTimeout;a.setState({connected:!1}),t&&d.c.warn("Datafeed.Area Closed",{autoClose:2e3,transition:d.a,closeButton:!1}),n||a.setState({currentTimeout:setTimeout(function(){a.openWebSocket(),a.setState({currentTimeout:null})},500)})},a.onError=function(){var e=a.state,t=e.connected,n=e.currentTimeout;a.setState({connected:!1}),t&&d.c.error("Datafeed.Area Errored",{autoClose:2e3,transition:d.a,closeButton:!1}),n||a.setState({currentTimeout:setTimeout(function(){a.openWebSocket(),a.setState({currentTimeout:null})},500)})},a.onMessage=function(e){var t=a.props.feed,n=JSON.parse(e.data);switch(n.type){case"Area.TempUpdate":return t({type:te.TempUpdate,message:n});case"Area.HumUpdate":return t({type:te.HumUpdate,message:n});case"Area.TargetSet":return t({type:te.TargetSet,message:n});case"Area.NodeAdd":return t({type:te.NodeAdd,message:n});case"Area.NewRoutine":return t({type:te.NewRoutine,message:n});case"Area.RemoveRoutine":return t({type:te.RemoveRoutine,message:n});case"Area.RemoveNode":return t({type:te.RemoveNode,message:n});case"Area.NodesSet":return t({type:te.NodesSet,message:n});case"Area.SetHeatingEnabled":return t({type:te.SetHeatingEnabled,message:n});default:return d.c.error('Unknown Message Type "'.concat(n.type,'"'))}},a.state={initialConnection:!1,connected:!1,currentTimeout:null},a}return Object(b.a)(t,e),Object(A.a)(t,[{key:"componentDidMount",value:function(){this.openWebSocket()}},{key:"render",value:function(){return null}}]),t}(a.PureComponent),Oe=Object(s.b)(null,function(e){return{feed:function(t){var n=t.type,a=t.message;e({type:n,payload:a})}}})(be),ge=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Oe,null))},Se=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(ge,null))},ve=Object(u.a)({palette:{type:"dark",primary:l.a}}),Ne=function(){return r.a.createElement(s.a,{store:he()},r.a.createElement(i.a,{theme:ve},r.a.createElement(d.b,{position:"top-right",autoClose:6e3,newestOnTop:!0,hideProgressBar:!0,pauseOnVisibilityChange:!0,draggable:!0,pauseOnHover:!0}),r.a.createElement(R,null),r.a.createElement($,null),r.a.createElement(Se,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Ne,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},21:function(e,t,n){"use strict";n.d(t,"a",function(){return o}),n.d(t,"c",function(){return c}),n.d(t,"b",function(){return u});var a="http://".concat(window.location.hostname,":3000/api/"),r="ws://".concat(window.location.hostname,":3000/datafeed/"),o={all:"".concat(a,"areas"),single:function(e){return"".concat(a,"areas/").concat(e)},createArea:"".concat(a,"areas/create"),tempHistory:function(e){return"".concat(a,"areas/").concat(e,"/temp-history")},setTarget:function(e){return"".concat(a,"areas/").concat(e,"/set-target")},addRoutine:function(e){return"".concat(a,"areas/").concat(e,"/add-routine")},deleteRoutine:function(e,t){return"".concat(a,"areas/").concat(e,"/routines/").concat(t)},setNodes:function(e){return"".concat(a,"areas/").concat(e,"/set-nodes")},setHeating:function(e,t){return"".concat(a,"areas/").concat(e,"/heating/").concat(t?"on":"off")}},c={getUninitialised:"".concat(a,"nodes/uninitialized"),getAreas:"".concat(a,"nodes/areas"),setup:function(e){return"".concat(a,"nodes/").concat(e,"/setup")},all:"".concat(a,"nodes")},u={areas:"".concat(r,"areas")}},26:function(e){e.exports={a:"/ui"}},58:function(e,t,n){"use strict";n.d(t,"f",function(){return i}),n.d(t,"e",function(){return l}),n.d(t,"c",function(){return s}),n.d(t,"g",function(){return d}),n.d(t,"i",function(){return f}),n.d(t,"b",function(){return E}),n.d(t,"a",function(){return p}),n.d(t,"h",function(){return m}),n.d(t,"d",function(){return A});var a=n(23),r=n.n(a),o=n(11),c=n(14),u=n(21),i=function(){return function(e){e({type:c.f}),r.a.get(u.c.getAreas).then(function(t){e({type:c.a,payload:t.data})})}},l=function(e,t){return function(n){n({type:c.l,payload:{id:e,name:t}}),n({type:c.g}),setTimeout(function(){n({type:c.j,payload:{name:"Radiator (Balcony)",type:"Heater",timeOn:{today:6e3,week:48e3},status:!0,on:!0,power:2e3,firmwareVersion:"1.0.0"}})},1e3)}},s=function(e){return l(e,"")},d=function(e){return{type:c.e,payload:e}},f=function(e){return{type:c.m,payload:e}},E=function(){return{type:c.d}},p=function(){return{type:c.b}},m=function(e,t,n){return function(a){a(E()),r.a.post(u.c.setup(e),{name:t,areaId:n}).then(function(e){var t=e.data;o.c.success("Successfully setup Node."),a({type:c.k,payload:t})}).catch(function(){o.c.error("Failed to setup node.")})}},A=function(){return function(e){r.a.get(u.c.all).then(function(t){var n=t.data;e({type:c.h,payload:n})})}}},63:function(e,t,n){"use strict";n.d(t,"g",function(){return l}),n.d(t,"h",function(){return s}),n.d(t,"b",function(){return d}),n.d(t,"c",function(){return f}),n.d(t,"f",function(){return E}),n.d(t,"k",function(){return p}),n.d(t,"a",function(){return m}),n.d(t,"e",function(){return A}),n.d(t,"d",function(){return y}),n.d(t,"i",function(){return h}),n.d(t,"j",function(){return b});var a=n(23),r=n.n(a),o=n(11),c=n(12),u=n(21),i=n(26),l=function(){return function(e){e({type:c.h}),r.a.get(u.a.all).then(function(t){e({type:c.b,payload:t.data})}).catch(console.error)}},s=function(){return{type:c.l}},d=function(){return{type:c.g}},f=function(e,t,n){return function(a){a({type:c.j,payload:"createNewArea"}),r.a.post(u.a.createArea,{name:e}).then(function(e){var r=e.data.document;a({type:c.d,payload:r}),a(d()),t.push("".concat(i.a,"/areas/").concat(r.areaId)),n()}).catch(function(e){console.error(e),a({type:c.a})})}},E=function(e){return function(t){t({type:c.q}),r.a.get(u.a.single(e)).then(function(e){var n=e.data;t({type:c.r,payload:n})}).catch(function(n){404===n.response.status&&t({type:c.c,payload:e})})}},p=function(e,t){return function(n){n({type:c.s}),r.a.post(u.a.setTarget(e),{target:Number(t)}).then(function(e){var t=e.data;o.c.success("Successfully updated target temperature."),n({type:c.t,payload:t})}).catch(function(e){console.error(e),o.c.error("Failed to update target temperature.")})}},m=function(e,t){return function(n){r.a.post(u.a.addRoutine(e),{routine:t}).then(function(e){var t=e.data;n({type:c.n,payload:t}),o.c.success("Routine Successfullly Created.")}).catch(function(e){console.error(e),o.c.error("Failed to create routine.")})}},A=function e(t,n){return function(a){r.a.delete(e(t,n)).then(function(e){var t=e.data;a({type:c.o,payload:t}),o.c.success("Routine Successfully Deleted.")}).catch(function(e){console.error(e),o.c.error("Failed to delete routine.")})}},y=function(e){return function(t){r.a.delete(u.a.single(e)).then(function(){t({type:c.e,payload:e}),o.c.success("Area successfully deleted. Assigned Nodes are now unassigned.")}).catch(function(e){console.error(e),o.c.error("Failed to delete area.")})}},h=function(e,t){return function(n){r.a.post(u.a.setNodes(e),{nodes:t}).then(function(e){n({type:c.p,payload:e.data}),o.c.success("Set Nodes successfully.")}).catch(function(){o.c.error("Failed to set nodes.")})}},b=function(e,t){return function(n){r.a.post(u.a.setHeating(e,t)).then(function(e){n({type:c.i,payload:e.data}),o.c.success("Successfully toggled heating ".concat(t?"on":"off"))}).catch(function(){o.c.error("Failed to toggle heating.")})}}},82:function(e,t,n){"use strict";n.d(t,"b",function(){return a}),n.d(t,"a",function(){return r});var a="ROUTINES.OPEN_ADD_MODAL",r="ROUTINES.CLOSE_ADD_MODAL"}},[[143,2,4]]]);
//# sourceMappingURL=main.b2d03828.chunk.js.map