const service = {}

service.setObject = function(key,value){
    return(sessionStorage.setItem(key,JSON.stringify(value)))
}

service.setString = function(key,value){
    return(sessionStorage.setItem(key,value))
}

service.getObject = function(key){
    return JSON.parse(sessionStorage.getItem(key) || false)
}

service.getString = function(key){
    return sessionStorage.getItem(key) || false
}

service.isExist = function(key){
    return JSON.parse(sessionStorage.getItem(key) || false) ? true : false
}

export default service
