console.log('script loaded');
const form = document.querySelector('#fm');
const search = document.querySelector('.search');
const p1 = document.querySelector('#p-1');
const p2 = document.querySelector('#p-2');
const loading = document.querySelector('#loading');
loading.setAttribute('src', '/img/loading.gif');

const cb = () =>{
    loading.style.display = 'block';
    // p1.textContent = 'Loading...';
}


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const location = search.value;
    
    const setLoading = (cb)=>{
        p1.textContent = '';
        p2.textContent = '';
        p1.classList.remove('text-danger');
        cb();
    }
    setLoading(cb);

    fetch(`http://localhost:3000/weather?location=${location}`)
        .then(res =>{
            res.json().then(data =>{
                if(data.err){
                    loading.style.display = 'none';
                    p2.textContent = '';
                    p1.textContent = data.err;
                    p1.classList.add('text-danger');
                }else{
                    loading.style.display = 'none';
                    p1.classList.remove('text-danger');
                    p1.textContent = data.location;
                    p2.textContent = data.forecast;
                }
            })
        })
})


