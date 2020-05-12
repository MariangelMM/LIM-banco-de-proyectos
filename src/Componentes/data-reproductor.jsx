import React, { useState, useEffect } from 'react';
import Artist from './vista-reproductor';
import '../App.css';

const ReproductorMusica = () => {

    const [songs, setSongs] = useState([]);
    const [index, setIndex] = useState(0);

    const apiArtist = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=b71047678120f5300ebf4a390e4b3ef1&format=json';
    useEffect(() => {
        fetch(apiArtist).then(res => res.json())
            .then(result => {
                Promise.all(result.artists.artist.map(doc => {
                    return artista(doc.name)
                })).then(data => {
                    // console.log(data);
                    const dataLabSongs = data.map((elem, i) => {
                        //    console.log(elem.toptracks.track)
                        return {
                            artist: result.artists.artist[i].name,
                            songs: elem.toptracks.track
                                .filter(elemSong => elemSong['@attr'].rank <= 10)
                                .map(elemSong => { return { name: elemSong.name, like: elemSong.playcount, url: elemSong.url } })
                                .sort((a, b) => b.like - a.like)
                        }
                    })
                    setSongs(dataLabSongs)

                })
            })
    }, [])


    const artista = (artist) => {

        return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${artist}&api_key=5c8e2c09c2a2396e6d24a126d15464fc&format=json`)
            .then(response => response.json())
    }

    const seeker = (event, artists) => {
        event.preventDefault();
        artista(artists).then(data => {

            const obj = {
                artist: data.toptracks['@attr'].artist,
                songs: data.toptracks.track
                    .filter(elemSong => elemSong['@attr'].rank <= 10)
                    .map(elemSong => { return { name: elemSong.name, like: elemSong.playcount, url: elemSong.url } })
                    .sort((a, b) => b.like - a.like)
            }
            const newArray = [obj];
            const array = newArray.concat(songs)
            setSongs(array)
        })

    }



    const next = (e) => {
        e.preventDefault()
        index === songs.length - 1 ? setIndex(0) : setIndex(index + 1);
    }

    const preview = (e) => {
        e.preventDefault()
        index === 0 ? setIndex(songs.length - 1) : setIndex(index - 1);
    }


    const handleLike = (e, id) => {
        e.preventDefault()
        const songsCopi = [...songs];
        songsCopi[index].songs[id].like++;
        setSongs(songsCopi)
        // console.log(songs);
    }

    const notLike = (e, id) => {
        e.preventDefault()
        const songsCopi = [...songs];
        songsCopi[index].songs[id].like--;
        setSongs(songsCopi)
        // console.log(songs);
    }


    const a = songs.map((elem, i) =>
        < div className="fondito" key={i} >
            <Artist element={elem} btnNext={next} btnPreview={preview} likes={handleLike} buscar={seeker} nolikes={notLike} />
        </div >
    )[index]

    return (
        <div className="m-5">
            {a}
        </div>
    )
}

export default ReproductorMusica;


