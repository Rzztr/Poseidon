import { useCanister, useConnect } from "@connect2ic/react";
import React, { useEffect, useState } from "react";
import Bienvenida from './Bienvenida'

const Areas = () => {
  
  const [areasICP] = useCanister("otro_backend");
  const {principal} = useConnect();
  
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState("");


  useEffect(() => {
      obtieneAreas();
  }, []);

 
  const obtieneAreas = async () => {
      setLoading("Loading...");
      try {
        var areasx = await areasICP.obtieneAreas();
          
        // setPosts(result.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));  // Ordenar posts por ID
        // setAreas(areasx.sort((a, b) => parseInt(a[0]) - parseInt(b[0])));         
        setAreas(areasx);   
        areas.forEach((area, index) => {
          // <p>{area[0]}-{area[1].nombre}</p>
          console.log("id area " + area[0]);
          console.log("area" + area[1].nombre);
        });   
        setLoading("");

      } catch(e) {
          console.log(e);
          setLoading("Error happened fetching posts list");
      }

  }
  
  const eliminarArea = async (e) => {
    e.preventDefault();
   
    var id = e.target[0].value;
    console.log(id);

    setLoading("Loading...");

    await areasICP.eliminarArea(id);
    setLoading("");
    {
        document.getElementById('btnListaAreas').click();
    }
  }
  


  return(
    <>
    { principal 
      ? 
      <p>para mayores informes, llame al 449 540 3154</p>
    : 
      <Bienvenida />
    }
    </>
  )
}
  
  
export default Areas