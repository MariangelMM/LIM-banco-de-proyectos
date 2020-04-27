import React, { useState, useEffect } from 'react';
import Artist from './vista-reproductor';
import '../App.css';

const ReproductorMusica = () => {

    const [state, setState] = useState([]);
    const [index, setIndex] = useState(22);

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
                        // console.log(elem.toptracks.track)
                        return {
                            artist: result.artists.artist[i].name,
                            image: result.artists.artist[i].image[4]['#text'],
                            songs: elem.toptracks.track
                                .filter(elemSong => elemSong['@attr'].rank <= 10)
                                .map(elemSong => { return { name: elemSong.name, like: elemSong.playcount, url: elemSong.url } })
                                .sort((a, b) => a.like < b.like),
                        }
                    })
                    setState(dataLabSongs)
                })
            })
    }, [])




    const next = (e) => {
        e.preventDefault()
        setIndex(index + 1)
    }
    const preview = (e) => {
        e.preventDefault()
        setIndex(index - 1)
    }



    // const search = (event, seeker) => {
    //     event.preventDefault();
    //     return fetch(`https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${seeker}&api_key=5c8e2c09c2a2396e6d24a126d15464fc&format=json`)
    //         .then(response => response.json())
    //         .then(data => {
    //             return {
    //                 artist: result.artists.artist.name,
    //                 image: result.artists.artist.image[4]['#text'],
    //                 songs: data.toptracks.track
    //                     .filter(elemSong => elemSong['@attr'].rank <= 10)
    //                     .map(elemSong => { return { name: elemSong.name, like: elemSong.playcount, url: elemSong.url } })
    //                     .sort((a, b) => a.like < b.like),
    //             }
    //         })

    // }




    const a = state.map((elem, i) =>
        < div className="fondito" key={i} >
            <Artist element={elem} btnNext={next} btnPreview={preview} />
        </div >
    )[index]

    return (
        <div className="m-5">
            {a}
        </div>
    )
}

export default ReproductorMusica;


