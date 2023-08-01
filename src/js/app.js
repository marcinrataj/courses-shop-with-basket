// // TO JEST PRZYKŁAD WYKONYWANIA KODU NA STRONIE. ROBI SIE BARDZO NIECZYTELNIE
// // MAMY TUTAJ FUNKCJE Z setTimeoutami, które własnie jako 2-gi parametr maja callback zwracający console.log()

// // sprawdzanie czy produkty są wciąż aktualne
// // sprawdzanie czy cena jest poprawna
// // złożenie zamówienia
// // pobranie promocji ( w podziękowaniu ) do zamówienia

// const checkProducts = (data, callback) => {
//   //wysłanie requestu na backend
//   setTimeout(() => {
//     callback({status: 'ok'})
//   }, 2000)
// }
// const checkPrice = (data, callback) => {
//   //wysłanie requestu na backend
//   setTimeout(() => {
//     callback({status: 'ok', data})
//   }, 2000)
// }
// const makeOrder = (data, callback) => {
//   //wysłanie requestu na backend
//   setTimeout(() => {
//     callback({orderId: 123, data})
//   }, 2000)
// }
// const checkPromotionForOrder = (orderId, callback) => {
//   //wysłanie requestu na backend
//   setTimeout(() => {
//     callback(['kurs HTML za 50%!'])
//   }, 2000)
// }

// const orderData = {}; // dane zamówienia
// checkProducts(orderData, (response) => {
//   const {status} = response;
//   console.log('Czy produkty są dostępne: ', status)

//   checkPrice(orderData, (response2) => {
//     const {status, order} = response2;
//     console.log('Cena poprawna: ', status)

//     makeOrder(orderData, (response3) => {
//       const {orderId, data} = response3;
//       console.log('Order ID: ', orderId)

//       checkPromotionForOrder(orderId, (response4) => {
//         const promo = response4;
//         console.log('Promocje: ', promo)
//       });
//     });
//   });
// });

// // Piekło callbacków, nie chcemy czegos takiego ^, dostaliśmy cos takiego jak Promisy!!!

//1.==============================================================================
// callback
const checkProductsCallback = (data, callback) => {
  //wysłanie requestu na backend
  setTimeout(() => {
    callback({ status: "ok" });
  }, 2000);
};
checkProductsCallback({}, (response) => {
  console.log("`", response.status, "`", [
    ` <- Z użyciem jeszcze callbacku, reszta to promisy`,
  ]);
});

// promise
const checkProducts = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: "ok" });
    }, 2000);
  });
};

//2.==============================================================================
const checkPrice = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ status: "ok", data });
    }, 2000);
  });
};

//3.==============================================================================
const makeOrder = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ orderId: 123, data });
    }, 2000);
  });
};

const checkPromotionForOrder = (orderId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["kurs HTML za 50%!"]);
    }, 2000);
  });
};

const orderData = {}; // dane zamowienia
//promise pattern
checkProducts(orderData)
  .then((response) => {
    console.log("Czy produkty dostępne: ", response.status, [`funkcja checkProducts`]);
    return checkPrice(orderData);
  })
  .then((response) => {
    console.log("Cena poprawna: ", response.status, [`funkcja checkPrice`]);
    return makeOrder(orderData);
  })
  .then((response) => {
    console.log("Order ID", response.orderId, [`funkcja makeOrder`]);
    return checkPromotionForOrder(response.orderId);
  })
  .then((response) => {
    console.log("Promocje: ", response, [`funkcja checkPromotionForOrder`]);
  })
  .catch(error => {
    alert(error)
  })

  // async / await
  const asyncFunction = async () => {
    try{
    await checkProducts(orderData)
    await checkPrice(orderData)
    const response = await makeOrder(orderData);
    await checkPromotionForOrder(response)
    console.log('Promocje', response)
    } catch(error) {
      alert(error.message)
    }
  }
  asyncFunction()
  // wszystkie sytuacje await muszą być w funkcji async

