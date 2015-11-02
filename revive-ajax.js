/**
 * Simple jQuery plugin to deliver Revive ads via AJAX.
 *
 * This plugin works as an AMD module (for RequireJS and similar), a CommonJS
 * module (for Browserify and similar), and as a regular browser script.
 *
 * @license MIT
 * @author Benjamin Dummer <ben@featherweightweb.com>
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) define(['jquery'], factory); else if (typeof module === 'object' && module.exports) module.exports = factory(require('jquery')); else factory(jQuery);  // jshint ignore:line
}(function ($) {
    var doc = window.document,
        oldWrite = doc.write;

    var charset = doc.charset || doc.characterSet || void 0,
        loc = String(window.location),
        ref = doc.referrer || void 0,
        mmm_fo = doc.mmm_fo ? 1 : void 0;

    function deliverAd (el, reviveUrl) {
        var $el = $(el),
            zoneId = $el.data('zoneid'),
            query = {
                zoneid: zoneId,
                charset: charset,
                loc: loc,
                referer: ref,
                mmm_fo: mmm_fo,
                cb: Math.floor(Math.random() * 999999999)
            };

        if (!zoneId) return;

        $.get(reviveUrl, query, function(data) {
            var text = '';

            doc.write = function (output) {text += output;};
            try {
                (function () {eval(data);})();  // jshint ignore:line
            } catch (e) {
                return;
            }
            doc.write = oldWrite;

            $el.html(text);

        }, 'text'); // Use the text datatype to prevent global eval of script
    }

    /**
     * jQuery plugin to begin delivering Revive ads via AJAX for each element in
     * the jQuery selection.
     *
     * In your HTML page, place `<div>` or other elements with a `data-zoneid`
     * attribute where you want ads to be delivered, then call this plugin on
     * that selection using:
     * ```
     * $('[data-zoneid]').reviveAjax({
     *     reviveUrl: 'http://revive.mydomain.com/delivery/ajs.php'
     * });
     * ```
     *
     * The provided `reviveUrl` must be a full path to your Revive ad server's
     * `ajs.php` delivery script.
     *
     */
    $.fn.reviveAjax = function (options) {
        options = options || {};

        if (options.reviveUrl) {    
            this.each(function () {
                deliverAd(this, options.reviveUrl);
            });
        }

        return this;
    };
}));