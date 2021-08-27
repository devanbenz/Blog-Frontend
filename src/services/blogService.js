// blogService.js -- uses fetch API to fetch data from backend 

//define api endpoints
const blogs = `/api/blogs`

const getAll = async () => {
    const req = await fetch(blogs)
    return req.json()
}


module.exports = {
    getAll
}