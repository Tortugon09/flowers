import React, { useEffect, useState } from "react";
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

  return (
      <div className="dedicmain">
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
