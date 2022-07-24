exports.userResponse = (users) => {
    userResult = []
    users.forEach(user => {
        let { name, userId, email, userType, userStatus } = user
        userResult.push({ name, userId, email, userType, userStatus })
    })
    return userResult
}