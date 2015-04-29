var ids = {
    facebook: {
        clientID: '<your_client_id_here>',
        clientSecret: '<your_client_secret_here>',
        callbackURL: '<your_server_ip_and_port_here>/auth/facebook/callback'
    }
}
module.exports = ids;
/*
 Example:
 ids = {
    facebook: {
        clientID: 'XXXXXXXXXXXXX',
        clientSecret: 'XXXXXXXXXXXX',
        callbackURL: '192.168.2.34:8000/auth/facebook/callback'
    }
  }
*/

