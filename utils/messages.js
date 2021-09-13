const moment = require('moment');

function formatMessage(username, text, chatroom){
    return {
        username,
        text,
        time: moment().format('HH:mm')
    }
}

module.exports = formatMessage;