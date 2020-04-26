class Member {
    constructor() {
        this.id = new Date().getTime() + Math.random()
        this.chatRoom = null
    }
    send(msg, fromMember, toMember) {
        this.chatRoom.send(msg, fromMember, toMember)
    }
    receive(msg, fromMember) {
        console.log(`receive from ${fromMember.id}: ${msg}`)
    }
}

class ChatRoom {
    constructor() {
        this.members = {}
    }
    addMember(member) {
        this.members[member.id] = member
        member.chatRoom = this
    }
    send(msg, fromMember, toMember) {
        toMember.receive(msg, fromMember)
    }
}

let m1 = new Member(1)
let m2 = new Member(2)
let c = new ChatRoom()
c.addMember(m1)
c.addMember(m2)
m1.send("hello", m1, m2)