// define dependent files
define(['jquery', 'utilities/Broadcast'], 
    function($, Broadcast) {

    'use strict';

    var ERROR = {
            REQUEST_FAILED : 1,
            REQUEST_CANCELLED : 2,
            RESPONSE_FAILED : 3
        }, // error codes
        EVENT = {
            COMPLETE : 'ajax/complete',
            ERROR : 'ajax/error',
            CANCELLED : 'ajax/cancelled'
        }, // module events
        httpRequest;

    function post (file_url, post_data, is_async) {

        // set defaults
        is_async = is_async || true;
        post_data = post_data || null;

        httpRequest = new XMLHttpRequest();
        
        httpRequest.addEventListener('load', onRequestComplete, false);
        httpRequest.addEventListener('error', onRequestFailed, false);
        httpRequest.addEventListener('abort', onRequestCancelled, false);

        httpRequest.open('POST', file_url, is_async);

        // set mime type for form data sent as a query string
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        httpRequest.responseType = 'text';
        
        httpRequest.send(post_data);
    }

    // processes the server response
    function onRequestComplete () {
        
        // get data as a string
        var data = httpRequest.response;
        
        // broadcast load complete and corresponding data
        Broadcast.publish(EVENT.COMPLETE, data);
    }

    // processes the server response
    function onRequestFailed () {
        
        // broadcast load complete and corresponding data
        Broadcast.publish(EVENT.ERROR, ERROR.REQUEST_FAILED);
    }

    // processes the server response
    function onRequestCancelled () {
        
        // broadcast load complete and corresponding data
        Broadcast.publish(EVENT.CANCELLED, ERROR.REQUEST_CANCELLED);
    }

    return {
        
        EVENTS : EVENT,
        
        post : post
    };

});