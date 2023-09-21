import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  addDoc,
  collection,
  QuerySnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import logo from "../assets/yard.svg";
import Flower from "./flowe";
import YouTube from 'react-youtube';
import mp3 from "../assets/ytmp3-convert.com_320kbps-floricienta-flores-amarillas-letra.mp3"



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbivxQl3-YA5k7a9I65fVj2vTC4i3Rhlg",
  authDomain: "florestux2.firebaseapp.com",
  projectId: "florestux2",
  storageBucket: "florestux2.appspot.com",
  messagingSenderId: "873044039097",
  appId: "1:873044039097:web:77c05a0d73afdd137f9268",
  measurementId: "G-93Q5166GDN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export default function VerDedicatoria() {
  const { dedicatoriaId } = useParams();
  const [dedicatoria, setDedicatoria] = useState(null);

  const opts = {
    height: '0', // Establece la altura en 0 para ocultar el reproductor de video
    width: '0',  // Establece el ancho en 0 para ocultar el reproductor de video
    playerVars: {
      autoplay: 1, // Reproducir automáticamente
      controls: 0, // Ocultar los controles del reproductor de video
      modestbranding: 1, // Ocultar el logotipo de YouTube
    }}
    const videoUrl = 'https://www.youtube.com/watch?v=S7gMzYqXIZc';
    const videoId = videoUrl.split('v=')[1];
  useEffect(() => {
    // Consulta Firestore utilizando el dedicatoriaId obtenido de la URL
    const obtenerDedicatoria = async () => {
      try {
        const docRef = doc(db, "cities", dedicatoriaId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists) {
          const dedicatoriaData = docSnap.data();
          setDedicatoria(dedicatoriaData);
        } else {
          console.log("No se encontró la dedicatoria.");
        }
      } catch (error) {
        console.error("Error al obtener la dedicatoria:", error);
      }
    };

    obtenerDedicatoria();
  }, [dedicatoriaId]);

      // Opciones del reproductor de YouTube
      const audioRef = useRef(null);

      useEffect(() => {
        // Cuando el componente se monta, inicia la reproducción una vez que el audio se haya cargado
        audioRef.current.addEventListener('canplaythrough', () => {
          audioRef.current.play();
        });
      }, []);


  return (
      <div className="dedicmain">
        <audio ref={audioRef} autoPlay>
        <source src={mp3} type="audio/mpeg"/>
      </audio>
        {dedicatoria ? (
          <>
            <div className="padre">
              <div className="hijo-secundario">
                <div className="nieto">
                    <p className="label">Para</p>
                    <p className="nombre">{dedicatoria.destinatario}</p>
                    <p className="dedicatoria">{dedicatoria.dedicatoria}</p>
                    <div className="para">
                        <p className="label">Enviada por:</p>
                        <p className="lol">{dedicatoria.remitente}</p>
                    </div>
                </div>
              </div>
              <div className="hijo">
                <Flower />
              </div>
            </div>
          </>
        ) : (
          <p>Cargando dedicatoria...</p>
        )}
      </div>
  );
}
