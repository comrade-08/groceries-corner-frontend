const session = {

    setIsLoginUser(data) {
        localStorage.clear()
        localStorage.setItem('userData', JSON.stringify(data))
        localStorage.setItem('isLoginUser', true)
        return new Promise((resolve, reject) => {
            resolve(true)
        })
    },

    isLoginUser() {
        return localStorage.getItem('isLoginUser')
    },

    clearUnneccessaryData() {
        localStorage.clear()
        return true
    },

    getUserData() {
        const result = localStorage.getItem('userData')
        return new Promise((resolve, reject) => {
            resolve(result)
        })
    }
}

export default session