const searchSongs = async () =>{
    const searchBtn = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/:${searchBtn}`;
    try{

        const res = await fetch(url);
        const data = await res.json();  
        displaySongs(data.data);
    }
    catch(error){
        displayError('Something went wrong !! Please Try again!');
    }

}

const displaySongs = songs =>{
    
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    // hide lyrics for every search value 
    const lyrcisDiv = document.getElementById('show-lyrics');
    lyrcisDiv.innerText='';

    songs.forEach(song => {
        console.log(song);
        const songDiv = document.createElement('div');
        songDiv.className=" class= single-result row align-items-center my-3 p-3"
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>                         
                            <source src="${song.preview}" type="audio/mpeg">
                           
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `;
        songContainer.appendChild(songDiv);
    });
}

const getLyric = async (artist,title) =>{
    const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
    try{

        const res = await fetch(url)
        const data = await res.json();
        showLyrics(data.lyrics);
    }
    catch(error){
       displayError('Something went wrong! Please Try again')
    }


}

const showLyrics = lyrics =>{
    const lyrcisDiv = document.getElementById('show-lyrics');
    lyrcisDiv.innerText = lyrics;
}
const displayError = error => {
    const errorText = document.getElementById('error-messeage');
    errorText.innerText = error;
}