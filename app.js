const express = require("express");
const os = require("os");
const cluster = require("cluster");

const isPrime = require('./is_prime');

if (cluster.isMaster){
    const cpuCount = os.cpus().length
    for (let i = 0; i < cpuCount; i++){
        cluster.fork();
        
            
    }
    // setTimeout(function () {
    //     for (var id in cluster.workers) {
    //         var worker = cluster.workers[id];
    //         worker.process.kill();
    //     }
    // }, 2000);
    
}else{
    const app = express();
    
    app.get('/', function(req, res){
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })

    app.listen(3100, function(){
        console.log(`Worker ${process.pid} started`);
        console.log("server started on port 3100");
        
    })

    process.on('SIGTERM', function() {
        console.log(`Worker ${process.pid} died`);
        process.exit();
    })
}


// Worker 31732 started
// server started on port 3100
// Worker 31733 started
// server started on port 3100
// Worker 31734 started
// server started on port 3100
// Worker 31735 started
// server started on port 3100
// Worker 31735 died
// Worker 31733 died
// Worker 31732 died
// Worker 31734 died