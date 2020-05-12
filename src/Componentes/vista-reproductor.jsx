import React, { useState } from 'react';
import img from '../img/imagen.jpg';
import '../App.css';

const Artist = (props) => {
    const { artist, songs } = props.element;


    const [seeker, setSeeker] = useState('');



    const searchArtist = (e) => {
        setSeeker(e.target.value);
    };


    return (

        <div key={artist} className="d-flex justify-content-center">
            <div className="">
                <div className="row m-2 justify-content-center">
                    <input className="form-control col-sm-9 " type="text" onChange={searchArtist} placeholder="Nombre Artista" />
                    <button className="btn btn-outline-danger col-sm-2 ml-3 mb-3" onClick={(event) => { props.buscar(event, seeker) }} type="submit"><i className="fas fa-search"></i></button>

                </div>
                <div className="card style">
                    <img className="card-img-top" src={img} alt='artista' />
                    <button type="button" onClick={(e) => { props.btn(e) }}>
                    </button>
                    <div className="card-body " >
                        <div className="row justify-content-center">
                            <button type="button" className="btnColorTrash" onClick={(e) => { props.btnPreview(e) }}>
                                <i className="fas fa-arrow-left text-white"></i>
                            </button>
                            <h3 className="text-white text-center col-sm-7">{artist}</h3>
                            <button
                                type="button"
                                className="btnColorTrash"
                                onClick={(e) => {
                                    props.btnNext(e)
                                }}>
                                <i className="fas fa-arrow-right text-white"></i></button>
                        </div>
                        <div className="">
                            {songs.map((song, i) =>
                                <div className="row" key={i} >
                                    <p className="col-sm-6 text-white">{song.name}</p>
                                    <button
                                        id={i}
                                        type="button"
                                        className="btn btnColorTrash col-sm-1 "
                                        onClick={(e) => {
                                            props.likes(e, i)
                                        }}>
                                        <i className="fas fa-heart text-white"></i>
                                    </button>
                                    <button
                                        id={i}
                                        type="button"
                                        className="btnColorTrash col-sm-1"
                                        onClick={(e) => {
                                            props.nolikes(e, i)
                                        }}>
                                        <i className="fas fa-thumbs-down text-white "></i>
                                    </button>
                                    <button type="button" className="btnColorTrash col-sm-4 text-white" disabled>{song.like}</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default Artist
