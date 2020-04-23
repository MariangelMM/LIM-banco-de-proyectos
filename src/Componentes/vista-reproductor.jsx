import React from 'react';
// import { img } from '../img/fondo.jpg';
import '../App.css';

const Artist = (props) => {
    const { artist, image, songs } = props.element;

    return (

        <div key={artist} className="d-flex justify-content-center">
            <div className="">
                <div className="card style">
                    <img className="card-img-top" src={image} alt='artista' />
                    <div className="card-body " >
                        <div className="row ">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {

                                }}>
                                <i className=""></i></button>
                            <h3 className="">{artist}</h3>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    props.btn()
                                }}>
                                <i className=""></i></button>
                        </div>
                        <ul className="">
                            {songs.map((song, i) =>
                                <li key={i} >
                                    <div className="row m-1" >
                                        <p>{song.name}</p>
                                        <button
                                            id={i}
                                            type="button"
                                            className="btn btn-primary m-1"
                                            onClick={(e) => {

                                            }}>
                                            <i id={i} className=""></i></button>
                                        <button
                                            id={i}
                                            type="button"
                                            className="btn btn-primary m-1"
                                            onClick={(e) => {

                                            }}>
                                            <i id={i} className=""></i></button>
                                        <button type="button" className="btn btn-primary m-1" disabled>{song.like}</button>
                                    </div>
                                </li >
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Artist
