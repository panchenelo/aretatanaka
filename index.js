(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require,exports,module);
    } else {
        root.ouibounce = factory();
    }
}(this, function(require,exports,module) {

    return function ouibounce(el, config) {
        var config       = $.extend({},config),
            aggressive   = config.aggressive || false,
            sensitivity  = setDefault(config.sensitivity, 20),
            timer        = setDefault(config.timer, 1000),
            delay        = setDefault(config.delay, 0),
            oneEvent     = setDefault(config.oneEvent, true),
            callback     = config.callback || function() {},
            cookieExpire = setDefaultCookieExpire(config.cookieExpire) || '',
            cookieDomain = config.cookieDomain ? ';domain=' + config.cookieDomain : '',
            cookieName   = config.cookieName ? config.cookieName : 'viewedOuibounceModal',
            sitewide     = config.sitewide === true ? ';path=/' : '',
            _delayTimer  = null,
            _html        = document.documentElement;

        function setDefault(_property, _default) {
            return typeof _property === 'undefined' ? _default : _property;
        }

        function setDefaultCookieExpire(days) {
            // transform days to milliseconds
            var ms = days*24*60*60*1000;

            var date = new Date();
            date.setTime(date.getTime() + ms);

            return "; expires=" + date.toUTCString();
        }

        setTimeout(attachOuiBounce, timer);
        function attachOuiBounce() {
            _html.addEventListener('mouseleave', handleMouseleave);
            _html.addEventListener('mouseenter', handleMouseenter);
            _html.addEventListener('keydown', handleKeydown);
        }

        function handleMouseleave(e) {
            if (e.clientY > sensitivity || (checkCookieValue(cookieName, 'true') && !aggressive)) return;

            _delayTimer = setTimeout(_fireAndCallback, delay);
        }

        function handleMouseenter(e) {
            if (_delayTimer) {
                clearTimeout(_delayTimer);
                _delayTimer = null;
            }
        }

        var disableKeydown = false;
        function handleKeydown(e) {
            if (disableKeydown || checkCookieValue(cookieName, 'true') && !aggressive) return;
            else if(!e.metaKey || e.keyCode !== 76) return;

            disableKeydown = true;
            _delayTimer = setTimeout(_fireAndCallback, delay);
        }

        function checkCookieValue(cookieName, value) {
            return parseCookies()[cookieName] === value;
        }

        function parseCookies() {
            // cookies are separated by '; '
            var cookies = document.cookie.split('; ');

            var ret = {};
            for (var i = cookies.length - 1; i >= 0; i--) {
                var el = cookies[i].split('=');
                ret[el[0]] = el[1];
            }
            return ret;
        }

        function _fireAndCallback() {
            fire();
            callback();
        }

        function fire() {
            // You can use ouibounce without passing an element
            // https://github.com/carlsednaoui/ouibounce/issues/30
            if (el) el.style.display = 'block';
            disable();
        }

        function disable(options) {
            var options = options || {};

            // you can pass a specific cookie expiration when using the OuiBounce API
            // ex: _ouiBounce.disable({ cookieExpire: 5 });
            if (typeof options.cookieExpire !== 'undefined') {
                cookieExpire = setDefaultCookieExpire(options.cookieExpire);
            }

            // you can pass use sitewide cookies too
            // ex: _ouiBounce.disable({ cookieExpire: 5, sitewide: true });
            if (options.sitewide === true) {
                sitewide = ';path=/';
            }

            // you can pass a domain string when the cookie should be read subdomain-wise
            // ex: _ouiBounce.disable({ cookieDomain: '.example.com' });
            if (typeof options.cookieDomain !== 'undefined') {
                cookieDomain = ';domain=' + options.cookieDomain;
            }

            if (typeof options.cookieName !== 'undefined') {
                cookieName = options.cookieName;
            }

            document.cookie = cookieName + '=true' + cookieExpire + cookieDomain + sitewide;
            // remove listeners
            if( oneEvent ){
                _html.removeEventListener('mouseleave', handleMouseleave);
                _html.removeEventListener('mouseenter', handleMouseenter);
                _html.removeEventListener('keydown', handleKeydown);
            }
        }

        return {
            fire: fire,
            disable: disable
        };
    };
}));
$('a').click(function () {
    event.preventDefault();
    $(this).attr('href', '#form');
    var id = $(this).attr('href'), top = $(id).offset().top;
    $('body,html').animate({scrollTop: top - 70}, 1500);
});

// !function(e,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n(require,exports,module):e.ouibounce=n()}(this,function(){return function(e,n){function o(e,n){return"undefined"==typeof e?n:e}function t(e){var n=24*e*60*60*1e3,o=new Date;return o.setTime(o.getTime()+n),"; expires="+o.toUTCString()}function i(){T.addEventListener("mouseleave",u),T.addEventListener("mouseenter",r),T.addEventListener("keydown",c)}function u(e){e.clientY>v||d("viewedOuibounceModal","true")&&!l||(x=setTimeout(s,k))}function r(){x&&(clearTimeout(x),x=null)}function c(e){L||d("viewedOuibounceModal","true")&&!l||e.metaKey&&76===e.keyCode&&(L=!0,x=setTimeout(s,k))}function d(e,n){return a()[e]===n}function a(){for(var e=document.cookie.split("; "),n={},o=e.length-1;o>=0;o--){var t=e[o].split("=");n[t[0]]=t[1]}return n}function s(){f(),y()}function f(){e&&(e.style.display="block"),m()}function m(e){var e=e||{};"undefined"!=typeof e.cookieExpire&&(E=t(e.cookieExpire)),e.sitewide===!0&&(w=";path=/"),"undefined"!=typeof e.cookieDomain&&(b=";domain="+e.cookieDomain),document.cookie="viewedOuibounceModal=true"+E+b+w,T.removeEventListener("mouseleave",u),T.removeEventListener("mouseenter",r),T.removeEventListener("keydown",c)}var n=n||{},l=n.aggressive||!1,v=o(n.sensitivity,20),p=o(n.timer,1e3),k=o(n.delay,0),y=n.callback||function(){},E=t(n.cookieExpire)||"",b=n.cookieDomain?";domain="+n.cookieDomain:"",w=n.sitewide===!0?";path=/":"",x=null,T=document.documentElement;setTimeout(i,p);var L=!1;return{fire:f,disable:m}}});
var indicator = true,
    popup = document.querySelector('#ouibounce-modal'),
    close = popup.querySelector('.close-over.close-ex'),
    overlay = popup.querySelector('.underlay');
console.log(overlay)
window.document.addEventListener('mouseleave', function(event){
    if (event.clientY < 0) {
        if (indicator) {
            indicator = false;
            popup.style.display = 'block';
        }
    }

    close.addEventListener('click', function(){
        popup.style.display = 'none';
    });

    overlay.addEventListener('click', function(){
        popup.style.display = 'none';
    });

});
$('a').click(function () {
    event.preventDefault();
    $(this).attr('href', '#form');
    var id = $(this).attr('href'), top = $(id).offset().top;
    $('body,html').animate({scrollTop: top - 70}, 1500);
});
