window.onload = function() {
    init();
}
var windowRef;


var init = function() {

    var handleMessage = function(event) {
        console.log("Received Msg: " + event.origin + " " + event.data);
        if(event.data === 'success') {
            console.log("Child Window URL:" + windowRef.location.href);
            windowRef.close();
        }
    };

    console.log('Initializing fb login');
    $('#btn-close').click(function() {
        console.log('close clicked');
        if (windowRef && windowRef.name === 'fb_loginwindow') {
            console.log('Closing fb login window')
            windowRef.close();
        }
    });

    window.addEventListener('message', handleMessage, false);

    $('#btn-fblogin').click(function() {
        var that = this;
        var result = $('#result')
        result.text("login clicked, opening a login window");
        var strWindowFeatures = "menubar=no,location=no,resizable=no,scrollbars=yes,status=yes";
        windowRef = window.open('/auth/facebook', 'fb_loginwindow', strWindowFeatures);
    });
};