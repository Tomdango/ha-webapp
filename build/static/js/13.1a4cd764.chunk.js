(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{774:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(294),c=a(52),i=a(293),o=a(53),u=a(54),s=a(56),d=a(55),m=a(57),p=a(32),g=a(88),E=a(334),h=a(335),f=a(337),b=a(336),S=a(338),v=a(127),y=a(58),w=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(a=Object(s.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(l)))).handleSetupClick=function(e){(0,a.props.startNodeSetup)(e)},a}return Object(m.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.props.uninitializedNodes;return l.a.createElement(g.a,{style:{width:"100%"}},l.a.createElement(c.a,{variant:"h5",style:{fontWeight:"lighter",padding:15},gutterBottom:!0},"Unconfigured Nodes"),l.a.createElement(E.a,null,l.a.createElement(h.a,null,l.a.createElement(b.a,null,l.a.createElement(f.a,null,"ID"),l.a.createElement(f.a,null,"Name"),l.a.createElement(f.a,null,"Discovered"),l.a.createElement(f.a,null))),l.a.createElement(S.a,null,t.map(function(t){var a=new Date(t.createdAt),n=a.getHours().toString().padStart(2,"0"),r=a.getMinutes().toString().padStart(2,"0"),c=a.getSeconds().toString().padStart(2,"0"),i="".concat(n,":").concat(r,":").concat(c);return l.a.createElement(b.a,null,l.a.createElement(f.a,null,t.nodeId.split("-")[0]),l.a.createElement(f.a,null,t.type.substring(0,1).toUpperCase(),t.type.substring(1)),l.a.createElement(f.a,null,i),l.a.createElement(f.a,{align:"right",padding:"checkbox",style:{padding:0,paddingRight:10}},l.a.createElement(v.a,{variant:"outlined",onClick:function(){return e.handleSetupClick(t.nodeId)},size:"small"},"Setup")))}))))}}]),t}(n.Component),N=Object(p.b)(function(e){return{uninitializedNodes:e.nodes.discovery.uninitializedNodes}},function(e){return{startNodeSetup:function(t){return e(Object(y.i)(t))}}})(w),j=a(113);t.default=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement(r.a,{maxWidth:"xl",style:{marginTop:20}},l.a.createElement(c.a,{variant:"h3",style:{fontWeight:"lighter"},gutterBottom:!0},"Setup"),l.a.createElement(i.a,{container:!0},l.a.createElement(i.a,{item:!0,xs:12,md:6,className:"nodes-table-container"},l.a.createElement(N,null)),l.a.createElement(i.a,{item:!0,xs:12,md:6,className:"nodes-table-container"}))),l.a.createElement(j.a,null))}}}]);
//# sourceMappingURL=13.1a4cd764.chunk.js.map