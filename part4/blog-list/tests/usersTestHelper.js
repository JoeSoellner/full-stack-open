const initialUsers = [
    {
        username: "bobIsCool",
        name: "bob",
        passwordHash: "$2b$10$P1vBvHUCIdFkh7cz/0ZkUuG8byF6WOUTEta/JD.VThmI3S6ntNZrK"
    },
    {
        username: "tomIsCooler",
        name: "tom",
        passwordHash: "$2b$10$QCRktgCCBKzwRiToCw/iPOLeAfi1Ye91XKGMvY7ufJGIv71yy.h9G"
    }
]

const additionalUser =
{
    username: "jooooooooe",
    name: "jo mamma",
    password: "hagottem"
}

const usernameInListOfUsers = (username, listOfUsers) => {
    const usernames = listOfUsers.body.map(user => user.username)
    return usernames.includes(username)
}

module.exports = {
    initialUsers,
    additionalUser,
    usernameInListOfUsers
}