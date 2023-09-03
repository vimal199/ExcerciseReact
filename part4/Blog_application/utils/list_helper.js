var _ = require('lodash');
const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blogs) => {
    let sum = 0
    blogs.map(
        (blog) => {
            sum = sum + blog.likes
        }
    )
    return sum;
}
const favoriteBlog = (blogs) => {
    let max_likes = 0
    const max_blog = blogs.reduce(
        (prev, curr) => {
            console.log('prev ', prev);
            console.log('curr ', curr);
            return prev.likes > curr.likes ? prev : curr
        }
    )
    console.log('max blog ', max_blog);
    return max_blog;
}
const mostBlogs = (blogs) => {
    var result = _.countBy(blogs, "author")
    let temp = 0
    for (Key in result) {
        var value = result[Key]
        if (value > temp) {
            temp = value
        }
    }
    console.log('temp is ', temp);
    let author = Object.keys(result).find(key => result[key] === temp);
    console.log(result);
    return {
        author: author,
        blogs: temp
    }
}
const mostLikes = (blogs) => {
    let authors = _.uniq(_.map(blogs, 'author'))
    console.log('res is ', authors)
    const arr = {}
    _.forEach(authors, (author) => {
        let likes = 0
        _.forEach(blogs, (blog) => {
            if (author === blog.author) {
                likes = likes + blog.likes
            }
        }
        )
        arr[author] = likes
    }
    )
    console.log('arr is ', arr);
    /*  const output = _.reduce(arr, (result, value, key) => {
         return value > result ? value : result
     }, {}
     ) */
    let max = 0
    _.forEach(arr, (value, key) => {
        max = value > max ? value : max
    }

    )
    console.log('final result ', max);
    let author = Object.keys(arr).find(key => arr[key] === max);
    console.log('author is ', author);
    return {
        author: author,
        likes: max
    }
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}