import React, { useState, useEffect } from 'react';
import Artist from './vista-reproductor';
import '../App.css';

const ReproductorMusica = () => {

    const [state, setState] = useState([]);
    const [index, setIndex] = useState([1]);

    const apiArtist = 'https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=b71047678120f5300ebf4a390e4b3ef1&format=json';
    useEffect(() => {
        fetch(apiArtist).then(res => res.json())
            .then(result => {
                Promise.all(result.artists.artist.map(doc => {
                    // console.log(doc)
                    return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${doc.name}&api_key=5c8e2c09c2a2396e6d24a126d15464fc&format=json`)
                        .then(response => response.json())
                })).then(data => {
                    const dataLabSongs = data.map((elem, i) => {
                        // console.log(elem)
                        return {
                            artist: result.artists.artist[i].name,
                            image: result.artists.artist[i].image[4]['#text'],
                            songs: elem.toptracks.track
                                .filter(elemSong => elemSong['@attr'].rank <= 10)
                                .map(elemSong => { return { name: elemSong.name, like: elemSong.playcount } })
                                .sort((a, b) => a.like < b.like),
                        }
                    })
                    setState(dataLabSongs)
                })
            })
    }, [])

    const next = () => {
        setIndex(index + 1)
    }



    const a = state.map((elem, i) =>
        < div className="" key={i} >
            <Artist element={elem} btn={next} />
        </div >
    )[index]

    return (
        <div >
            {a}
        </div>
    )
}

export default ReproductorMusica;


