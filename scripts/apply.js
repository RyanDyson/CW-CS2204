//initialize DOM selectors
const bttn = document.querySelectorAll('.bttn-heading');
const form = document.querySelectorAll('.form');
const rank = document.querySelectorAll('form input[type="number"]');
const rank_button = document.querySelectorAll('form input[type="button"]');
const table_button = document.querySelector('#table-submit');
const notice = document.querySelector('#alert');
const schools_temp = document.querySelectorAll('.application-form-heading a');
const major_temp = document.querySelectorAll('label');
const rows = document.querySelectorAll('tbody tr');
let filled = [];
let data = new Map();

//special ordinale
function special_ordinal (num) {
    if (num == 1) {
        return '1st';
    }
    else if (num == 2) {
        return '2nd';
    }
    else if (num == 3) {
        return '3rd';
    }
    else {
        return num + 'th';
    }
}

//Heading toggle function
window.onload = function () {
    bttn[0].style.background = 'white';
    bttn[0].style.color = '#2d111c';
    form[0].style.display = 'block';
}

for(let i=0; i<bttn.length; i++) {
    bttn[i].onclick = function() {
        for (let j=0; j<bttn.length; j++) {
            bttn[j].style.background = '#732241';
            bttn[j].style.color = 'white';
            form[j].style.display = 'none';
        }
        this.style.background = 'white';
        this.style.color = '#2d111c';
        form[i].style.display = 'block';
    };
}

let new_data = [];
//rank of choice button function
for (let i=0; i<rank_button.length; i++) {
    rank_button[i].addEventListener('click', () => {
        let ranking = Number(rank[i].value);
        let major_name = major_temp[i].innerHTML;
        let college_name;
        console.log(rank[i],major_temp[i],schools_temp);
        for (let j=0; j<schools_temp.length; j++) {
            if (form[j].contains(major_temp[i])){
                college_name = schools_temp[j].innerHTML;
                if (ranking === 0) {
                    alert('Please enter the rank of chosen major');
                }
                else if (ranking <1 || ranking>10 || ranking!=parseInt(rank[i].value)) {
                    alert('Please enter the rank of chosen major between 1 and 10');
                }
                else{
                    if (new_data.includes(major_name) || new_data.includes(ranking)) {
                        alert("You have already chosen this major");
                    }
                    else {
                        let ordinal = special_ordinal(ranking);
                        alert('You have chosen ' + major_name + ' as your ' + ordinal + ' choosen major in ' + college_name + ' successfully');
                        new_data.push(college_name, major_name, ranking);
                        data.set(ranking, [college_name, major_name]);
                    }
                    console.log(new_data);
                }
            }
        }
        console.log(data);
        let sorted_data_by_keys = new Map([...data].sort((a,b) => {
            const keyA = a[0];
            const keyB = b[0];
            if (keyA < keyB) {
              return -1;
            }
            if (keyA > keyB) {
              return 1;
            }
            return 0;
          }));
        console.log(sorted_data_by_keys);
        data_to_table(sorted_data_by_keys);
    });
}



//handles notices on the bottom of the form
function notice_handler (data) {
    let skipped = [];
    let string = '';
    if (data.size == 0) {
        notice.innerHTML = 'You have not chosen any major';
        notice.style.color = 'red';
        console.log('alert triggered');
    }
    else {
        console.log('alert triggered');
        let i=0;
        let keys_of_maps = Array.from(data.keys());
        for (let j=1; j<=10; j++) {
            if (j!=keys_of_maps[i]) {
                skipped.push(j);
            }
            else if (i==keys_of_maps.length-1) {
                break;
            }
            else {
                i++;
            }
        }
        console.log(skipped);
        if (skipped.length == 0) {
            let date = new Date();
            notice.innerHTML = 'You have successfully submitted your application at time '+ date;
            notice.style.color = 'red';
        }
        else {
            for (let k=0; k<skipped.length; k++) {
                if (skipped.length==1 && k==skipped.length-1) {
                    skipped[k] = special_ordinal(skipped[k]);
                }
                else if (k==skipped.length-1) {
                    skipped[k] = ' and ' + special_ordinal(skipped[k]);
                }
                else {
                    skipped[k] = special_ordinal(skipped[k]);
                }
            }
            console.log(skipped);
            notice.innerHTML = 'you have not chosen your ' + skipped.join(', ') + ' chosen major, you can not leave any gap between your majors';
            notice.style.color = 'red';
        }
    }
}

function data_to_table (data) {
    let counter=0
    for (let i=1; i<=10; i++) {
        let key = Array.from(data.keys())[counter];
        console.log(key);
        if (key == i){
            let current_field = data.get(key);
            let current_row = ['<td>', current_field[0], "</td> <td>", current_field[1], '</td> <td>', key, '</td'];
            console.log(current_field);
            console.log(current_row);
            rows[i-1].innerHTML = current_row.join('');
            console.log(rows[i-1], current_row.join(''));
            counter++;
            document.getElementById('chosen-majors-footer').innerHTML = 'Total number of majors applied : ' + counter;
        }
    }
}

//main
function reset_clicked() {
    notice.innerHTML='';
    document.getElementById('chosen-majors-footer').innerHTML = 'Total number of majors applied : 0';
    for(let i=0; i<10; i++) {
        rows[i].innerHTML = '<td></td><td></td><td>'+ (i+1) + '</td>';
    }
    filled = [];
    data.clear();
    new_data = [];
}
table_button.addEventListener('click', () => {
    let sorted_data_by_keys = new Map([...data].sort((a,b) => {
        const keyA = a[0];
        const keyB = b[0];
        if (keyA < keyB) {
          return -1;
        }
        if (keyA > keyB) {
          return 1;
        }
        return 0;
    }));
    notice_handler(sorted_data_by_keys);
});

    



