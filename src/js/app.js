function calculate (a, b, fn) {
  function add(a, b){
    return a + b
  }

  if(fn === 'add'){
    return add(a, b);
  }
}

const x = calculate(2, 3, 'add'); console.log(x)