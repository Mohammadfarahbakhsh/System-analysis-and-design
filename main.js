function RandExp(rate) {
    return -Math.log(1.0 - Math.random()) / rate;
}

const lambda = 15;
const mu = 5;
const entityCount = 1000;
const Capacity = 10;

let arrCount = 0;
let lossCount = 0;
let queueLength = 0;
let serverState = false;

let curruntTime = 0;

let nextArr = curruntTime + RandExp(lambda);
let nextDep = curruntTime + RandExp(mu);      

while (arrCount < entityCount) {
    if (nextArr < nextDep) {

        arrCount++;
        curruntTime = nextArr;  

        if (serverState == false) {
            serverState = true;
            nextDep = curruntTime + RandExp(mu); 
        } else {
            if (queueLength < (Capacity - 1)) {
                queueLength++;
            } else {
                lossCount++;
            }
        }
        nextArr = curruntTime + RandExp(lambda); 
    } else {
        curruntTime = nextDep; 

        if (queueLength == 0) {
            serverState = false;
        } else {
            queueLength--;
        }
        nextDep = curruntTime + RandExp(mu);
}
}

const lossRate =lossCount / arrCount;
console.log(lossRate)
