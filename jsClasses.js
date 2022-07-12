class Vehicle {
    constructor(make,model,year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    honk(){
        return "Beep";
    }
    toString(){
        return `The vehicle is a ${make} ${model} from ${year}`;
    }
}

class Car extends Vehicle{
    constructor(make,model,year){
        super(make,model,year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle{
    constructor(make,model,year){
        super(make,model,year);
        this.numWheels = 2;
    }
    revEngine(){
        return "VROOM!!!";
    }
}

class Garage{
    constructor(capacity){
        this.capacity = capacity;
        this.vehicles = [];
    }
    add(vehicle){
        if(vehicle instanceof Vehicle){
            if(this.vehicles.length <= this.capacity){
                this.vehicles.push(vehicle);
                return "added to garage!";
            }
            return "garage at capacity.";
        }
        return "only vehicles are allowed in the garage."
    }
}