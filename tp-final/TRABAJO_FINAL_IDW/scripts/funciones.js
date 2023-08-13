function acceso_bedelia_accrap() {
    window.location.href = '/sistema-principal.html';
}

function acceso_carreras() {
    window.location.href = '/carreras.html';
}

async function buscarInfo(e){
    //e.preventDefault();

    let tema = e;

    //const apiKey='a27692ea8dd84e2aa20404bfe91fdecb';
    const apiKey='884233dc636507ef908e4595f5f2c3d9'
    
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=${tema}&%20countries=ar`;//`https://newsapi.org/v2/everything?q=${tema}&sortBy=publishedAt&apiKey=${apiKey}`;

    await fetch(url)
        .then((res) => {
            if(res.ok){
                return res.json();
            }
        })
        .then((data) => {
            const list = document.getElementById('slide-novedades');
            data['data'].forEach(element => {
                const item = document.createElement('li'); 
                const a = document.createElement('a');

                // const img = document.createElement('img');
                // console.log('IMG URL: '+element.image);
                // img.src = element.image;

                a.setAttribute('href',element.url);
                a.setAttribute('target','_blank');

                
                const titulo = document.createTextNode(element.title);
                a.appendChild(titulo);

                item.appendChild(a);

                list.appendChild(item);
                //list.appendChild(img);
            });

        }).catch((error) => {
            // manejar el error.
            console.log('error', error)
    });
}

//api rest key a27692ea8dd84e2aa20404bfe91fdecb