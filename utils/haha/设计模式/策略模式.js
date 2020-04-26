class Login {
    constructor() {
        
    }
    setStragety(stragety) {
        this.stragety = stragety
        this.login = stragety.login
    }
}

class MobileLogin {
    login() {
        console.log("mobile login")
    }
}

class PCLogin {
    login() {
        console.log("pc login")
    }
}

let l = new Login()

function app(type) {
    switch(type) {
        case "mobile": l.setStragety(new MobileLogin()); break;
        case "pc": l.setStragety(new PCLogin()); break;
    }
    l.login()
}

app("mobile")