import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, QuerySnapshot  } from "firebase/firestore";
import "../App.css"
import logo from "../assets/yard.svg"


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbivxQl3-YA5k7a9I65fVj2vTC4i3Rhlg",
  authDomain: "florestux2.firebaseapp.com",
  projectId: "florestux2",
  storageBucket: "florestux2.appspot.com",
  messagingSenderId: "873044039097",
  appId: "1:873044039097:web:77c05a0d73afdd137f9268",
  measurementId: "G-93Q5166GDN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();


export default function DedicatoriaForm() {
  const [destinatario, setDestinatario] = useState('');
  const [remitente, setRemitente] = useState('');
  const [dedicatoria, setDedicatoria] = useState('');
  const [realizado, setRealizado] = useState(false);
  const [id, setId] = useState(false);
  const [copied, setCopied] = useState(false);




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Genera un token UUID único para la dedicatoria
    const token = uuidv4();
  
    // Crea un objeto de datos con el token y otros campos
    try {
      // Envía los datos a Firestore (en una colección llamada 'dedicatorias', por ejemplo)
      const docRef = await addDoc(collection(db, "cities"), {
        dedicatoria: dedicatoria,
        destinatario: destinatario,
        remitente: remitente,
        token: token
      });
      

      // Limpia los campos del formulario después de enviar
      setDestinatario('');
      setRemitente('');
      setDedicatoria('');
      
      console.log('Datos enviados exitosamente a Firestore');
      setId(docRef.id) // Obtén el ID único asignado por Firestore
        setRealizado(true)
    } catch (error) {
      console.error('Error al enviar los datos a Firestore:', error);
    }
  };
  const handleCopyLink = () => {
    const link = `${window.location.origin}/ver-dedicatoria/${id}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('Error al copiar el enlace:', error);
      });
  };
  
  return (
        <div className ="main">
        {realizado ? (
            
            <div className='link'>
                <img src={logo}></img>
                <p>Ten tu dedicatoria:</p>
                <div className='link2'>
                <span>{`${window.location.origin}/ver-dedicatoria/${id}`}</span>
                <button onClick={handleCopyLink}>Copiar Enlace</button>
                {copied && <span>Enlace copiado al portapapeles</span>}
                </div>
            </div>
        )
        : 
        (   <div>
            <div className='h2'>
            <img src={logo}></img>
            <h2>Regalale flores amarillas a tu persona especial</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="destinatario">Para:</label>
                <input
                  type="text"
                  id="destinatario"
                  value={destinatario}
                  onChange={(e) => setDestinatario(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="remitente">De:</label>
                <input
                  type="text"
                  id="remitente"
                  value={remitente}
                  onChange={(e) => setRemitente(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="dedicatoria">Dedicatoria:</label>
                <textarea
                  id="dedicatoria"
                  value={dedicatoria}
                  onChange={(e) => setDedicatoria(e.target.value)}
                  required
                />
              </div>
              <div className='button'>
                <button type="submit">Enviar Dedicatoria</button>
              </div>
              <p className='credits'>Hecho por Axel Reyes y Leonardo Toledo</p>
            </form>
            </div>
        )
        }
    </div>
  );
}