const session = {

    setisLoginUser(data) {
        const userData = {
            address: data.address,
            confirmPassword: data.confirmPassword,
            id: data.id,
            mobileNumber: data.mobileNumber,
            password: data.password,
            userName: data.userName,
        }
        localStorage.clear()
        localStorage.setItem('userData', JSON.stringify(userData))
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