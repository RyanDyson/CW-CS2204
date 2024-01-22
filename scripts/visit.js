const form = document.getElementById('reservation-form');
const notice = document.querySelector('#alert');

form.addEventListener('submit', function on_submit () {
    notice.innerHTML = '';
    event.preventDefault();
    let types = ['date', 'time', 'visitor'];
    let checker;
    for (let i=0; i<types.length; i++) {
        var user_input = document.getElementById(types[i]).value;
        types[i] = user_input;
        if (user_input == '' ) {
            notice.innerHTML = 'Data not completed; please re-enter';
            notice.setAttribute('style', 'color: red;');
            checker = false;
            break;
        }
        else if (i==2 && (user_input<=0 || parseInt(user_input)!=Number(user_input))) {
            notice.innerHTML = 'Please enter a valid number of people!';
            notice.setAttribute('style', 'color: red;');
            checker = false;
            break;
        }
        else {
            notice.innerHTML = '';
            checker = true;
        }
    }
    console.log(types);
    let check_reserved = reserve(types[0], types[1], types[2]);
    console.log(check_reserved)
    if (check_reserved && checker==true) {
        alert('Reservation successful!');
    }
    else if (!check_reserved && checker==true) {
        alert('Sorry, the reservation is full!');
    }
});

