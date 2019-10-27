

// var total = document.getElementsByName("tokimonTotal");

// var formFields = document.querySelectorAll(".value");

// console.log(total.value);

// formFields[1].addEventListener("keyup", function() {
    //     total.value = total.value + formFields[1].value;
    //     console.log(total.value);
    // })
    
//     formFields.forEach(function(field) {
//         field.addEventListener("keyup", function() {
//             var sum = 0;
//             for(i=1; i<9; i++) {
//                 sum = parseInt(formFields[i].value) + sum;
//                 total.defaultValue = sum;
//             }
//         console.log(total.value);
//     })
// })

// formFields.forEach(field => {
//     field.addEventListener("keyup", event => {
//         for(i=1; i<9; i++) {
//             total.value = formFields[i] + total.value;
//         }
//         console.log(total.value);
//     })
// })

// formFields.addEventListener("keyup", function() {
//         for(i=1; i<9; i++) {
//             total.value = formFields[i] + total.value;
//     }
// })

// formFields.forEach(field => {
//     field.addEventListener("keyup", event => {
//         for(i=1; i<9; i++) {
//             total.value = formFields[i] + total.value;
//         }
//         console.log(total.value);
//     })
// })
// for(i=1; i<9; i++) {
//     formFields[i].addEventListener("keyup", function() {
//         var sum = 0;
//         total.value = 
//     })
// }

function sumfunc() {
    var total = document.getElementsByName("tokimonTotal");
    var formFields = document.querySelectorAll(".value");

    for(i=1; i<9; i++) {
        total.defaultValue = parseInt(formFields[i].value);
    }
    console.log(total.value);

}
