exports.userResponse = (users) => {
    userResult = []
    users.forEach(user => {
        let { name, userId, email, userType, userStatus, assignedTickets } = user
        userResult.push({ name, userId, email, userType, userStatus, assignedTickets })
    })
    return userResult
}