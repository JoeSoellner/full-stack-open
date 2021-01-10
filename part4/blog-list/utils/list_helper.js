const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (likes, blog) => {
        return likes + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0)
        return null
    else if (blogs.length === 1)
        return blogs[0]

    let favoriteSoFar = blogs[0];

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > favoriteSoFar.likes)
            favoriteSoFar = blogs[i]
    }

    return favoriteSoFar
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}