// blogService.js -- uses fetch API to fetch data from backend 

//define api endpoints
const blogs = `/api/blogs`
const login = `/api/login`

const getAll = async () => {
    const req = await fetch(blogs)
    return req.json()
}

const loginService = async credentials => {
    try{
        const req = await fetch(login, {method:"POST", body: credentials})
        return req.json()
    }catch(e){
        console.log(e)
    }
}


module.exports = {
    getAll,
    loginService
}