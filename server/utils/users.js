const users = [];

function userJoin(id, username, chatroom) {
    const user = {id, username, chatroom};

    users.push(user);

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

module.exports = {
    userJoin, getCurrentUser
};