export default class Restaurant {
    constructor(cash, seats, staff) {
        this.cash = cash
        this.seats = seats
        this.staff = staff
    }
    hire(staffObj) {
        this.staff.push(staffObj)
    }

    fire(staffObj) {
        
    }
}