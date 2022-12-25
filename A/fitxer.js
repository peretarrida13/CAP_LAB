
/**
 * AQUESTA FUNCIO SI QUE FUNCIONA PERO ENTRA EN UN BUCLE INFINIT QUE NO RETORNA RESUME
 * function make_coroutine(fn) {
    return function(continuation) {
      function resume(c, v) {
        return c(v, continuation);
      }
      return fn(resume, continuation);
    }
}**/

/**function make_coroutine(fn) {
    let continuation;
  
    function resume(coroutine, value) {
      // capturem el punt de continuació de la corutina actual
      continuation = Continuation.capture();
      // cridem la corutina passada com a paràmetre
      return coroutine(resume, value);
    }
  
    return function(value) {
      // iniciem la corutina passada com a paràmetre
      return fn(resume, value);
    };
 }**/


 //CREC QUE AQUESTA POT FUNCIONAR PERO NO DETECTA CONTINUATION()
 function make_coroutine(fn) {
    let continuation;
  
    return function(resume, value) {
      if (continuation) {
        // si ja s'ha creat la continuació, la resumim amb el valor indicat
        continuation.resume(value);
        return;
      }
  
      // si no s'ha creat la continuació, la cream i la iniciem amb el valor indicat
      continuation = new Continuation();
      continuation.apply(this, [fn, resume, value]);
    };
  }

function exemple_senzill() {
    let a = make_coroutine( function(resume, value) {
        print("Ara estem a la corutina 'A'");
        print("Venim de", resume(b, 'A'));
        print("Tornem a 'A'");
        print("Venim de", resume(c, 'A'));
    });

    let b = make_coroutine( function(resume, value) {
        print(" Ara estem a la corutina 'B'");
        print(" Venim de", resume(c, 'B'));
        print(" Tornem a 'B'");
        print(" Venim de", resume(a, 'B'));
    });
    
    let c = make_coroutine( function(resume, value) {
        print(" Ara estem a la corutina 'C'");
        print(" Venim de", resume(a, 'C'));
        print(" Tornem a 'C'");
        print(" Venim de", resume(b, 'C'));
    });

    // amb aquest codi evitem "complicar-nos la vida" amb
    // problemes d'acabament quan cridem la corutina inicial
    if (typeof(a) === 'function') {
        a('*') // el valor '*' que pasem a 'a' és irrellevant
    }
}

exemple_senzill();