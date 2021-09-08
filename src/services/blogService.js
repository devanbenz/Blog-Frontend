// blogService.js -- uses fetch API to fetch data from backend 

//define api endpoints
const blogs = `/api/blogs`
const login = `/api/login`
let token = null


const getToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const req = await fetch(blogs,{ headers: {'authorization':token}})
    return req.json()
}

const createBlog = async (blog) => {
    const req = await fetch(blogs, {
        method: 'POST', 
        headers: {'Content-Type':'application/json', 'authorization': token},
        body: JSON.stringify(blog)
    })

    if(!req.ok){
        throw Error
    }

    return req.json()
}

const updateLikes = async (id, blog) => {
    const req = await fetch(`${blogs}/${id}`,{
        method: 'PUT',
        headers: {'Content-Type':'application/json', 'authorization': token},
        body: JSON.stringify(blog)
    })

    if(!req.ok){
        throw Error
    }
    return req.json()
}

const loginService = async (credentials) => {
    const req = await fetch(login, {
        method:"POST", 
        headers: {'Content-Type':'application/json','authorization':token},
        body: JSON.stringify(credentials)
    })

    if(!req.ok){
        throw Error
    }

    return req.json()
}


module.exports = {
    getAll,
    createBlog,
    updateLikes,
    loginService,
    getToken
}