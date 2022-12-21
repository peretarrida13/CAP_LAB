function make_coroutine(f){
    let continuation;
    function wrapper(resume, value) {
      if (continuation) {
        // si la continuació ja està definida, és que estem retornant d'una crida anterior
        // llavors cridem la continuació amb el valor que ens han passat
        continuation = continuation(value);
      } else {
        // si la continuació no està definida, és que estem invocant la corutina per primera vegada
        // llavors definim la continuació amb el codi de la corutina
        continuation = f(resume, value);
      }
    }
    return wrapper;
}


function exemple_senzill() {
    let a = make_coroutine( function(resume, value) {
        console.log("Ara estem a la corutina 'A'");
        console.log("Venim de", resume(b,'A'));
        console.log("Tornem a 'A'");
        console.log("Venim de", resume(c,'A'));
    });

    let b = make_coroutine( function(resume, value) {
        console.log(" Ara estem a la corutina 'B'");
        console.log(" Venim de", resume(c,'B'));
        console.log(" Tornem a 'B'");
        console.log(" Venim de", resume(a,'B'));
    });
    
    let c = make_coroutine( function(resume, value) {
        console.log(" Ara estem a la corutina 'C'");
        console.log(" Venim de", resume(a,'C'));
        console.log(" Tornem a 'C'");
        console.log(" Venim de", resume(b,'C'));
    });

    // amb aquest codi evitem "complicar-nos la vida" amb
    // problemes d'acabament quan cridem la corutina inicial
    if (typeof(a) === 'function') {
        a('*') // el valor '*' que passem a 'a' és irrellevant
    }
}


exemple_senzill();
console.log('prova');