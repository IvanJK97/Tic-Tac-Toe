(()=>{"use strict";var e={336:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(){this.board=[["","",""],["","",""],["","",""]]}return e.prototype.getCell=function(e,t){return this.board[e][t]},e.prototype.setCell=function(e,t,n){this.board[e][t]=n},e.prototype.checkBoard=function(){for(var e=0,t=0;t<3;t++){for(var n=0,r=0,i=0;i<3;i++)"X"===this.board[t][i]&&n++,"O"===this.board[t][i]&&r++,""===this.board[t][i]&&e++;if(3===n)return"X";if(3===r)return"O"}for(i=0;i<3;i++){var o=0,a=0;for(t=0;t<3;t++)"X"===this.board[t][i]&&o++,"O"===this.board[t][i]&&a++;if(3===o)return"X";if(3===a)return"O"}for(var d=0,s=0,c=0;c<3;c++)"X"===this.board[c][c]&&d++,"O"===this.board[c][c]&&s++;if(3===d)return"X";if(3===s)return"O";for(d=0,s=0,c=0;c<3;c++)"X"===this.board[c][2-c]&&d++,"O"===this.board[c][2-c]&&s++;return 3===d?"X":3===s?"O":0===e?"tie":""},e}();t.default=n},752:function(e,t,n){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(336)),o=document.getElementById("message"),a=document.querySelector("table"),d=document.querySelectorAll("th"),s=document.getElementById("restart-btn"),c='<i class="fas fa-times times"></i>',u=c,f=new i.default,l="";window.addEventListener("DOMContentLoaded",(function(){d.forEach((function(e){var t=e.parentElement,n=e.querySelector(".icon-container");e.addEventListener("click",(function(){""===f.getCell(+t.dataset.id,+n.dataset.id)&&(v(+t.dataset.id,+n.dataset.id),h(n))})),e.addEventListener("mouseenter",(function(){""===n.innerHTML&&(n.innerHTML=u)})),e.addEventListener("mouseleave",(function(){""===f.getCell(+t.dataset.id,+n.dataset.id)&&(n.innerHTML="")}))})),s.addEventListener("click",(function(){p()}))}));var v=function(e,t){u===c?f.setCell(e,t,"X"):f.setCell(e,t,"O"),l=f.checkBoard()},h=function(e){e.innerHTML=u,u=u===c?'<i class="far fa-circle circle"></i>':c,l&&(o.textContent="tie"===l?"It's a tie!":l+" wins!",a.addEventListener("click",m,!0),a.addEventListener("mouseenter",m,!0))},p=function(){d.forEach((function(e){o.textContent="",f=new i.default,u=c,e.querySelector(".icon-container").innerHTML="",a.removeEventListener("click",m,!0),a.removeEventListener("mouseenter",m,!0)}))},m=function(e){e.stopPropagation(),e.preventDefault()}}},t={};!function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r].call(o.exports,o,o.exports,n),o.exports}(752)})();