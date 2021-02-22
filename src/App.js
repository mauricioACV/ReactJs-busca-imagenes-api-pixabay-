import React, { Component } from "react";
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";

class App extends Component {
  //State
  //Es uno de los terminos mas importantes en react
  state = {
    termino: "",
    imagenes: [],
    pagina: "",
  };

  //Funcion para volver al incio de los resultados al cargar la pagina siguiente o anterior
  scroll = () => {
    const elementoCabecera = document.querySelector('.jumbotron');
    elementoCabecera.scrollIntoView('smooth', 'start');
  }

  //Funciones paginacion
  paginaAnterior = () => {
    //leer el state de la pagina actual
    let pagina = this.state.pagina;

    //Si la pagina es 1 ya no ir hacia atras
    if(pagina === 1) return null;

    //restar uno a la pagina actual
    pagina--;

    //agregar el cambio al state
    this.setState({ pagina}, () => {
      this.consultarApi();
      this.scroll();
    });

    console.log(pagina);
  };

  paginaSiguiente = () => {
    //leer el state de la pagina actual
    let pagina = this.state.pagina;

    //sumar uno a la pagina actual
    pagina++;

    //agregar el cambio al state
    this.setState({ pagina }, () => {
      this.consultarApi();
      this.scroll();
    });

    console.log(pagina);
  };

  //Funcion que enviaremos a traves de props a componente hijo, recibira un parametro que es el termino de busqeuda, luego utilizando
  //la funcion de react setState le pasaremos el valor del termino de busqueda al objeto state. Como la llave del  objeto state se llama
  //igual que el parametro que estamos recibiendo en la funcion datosBusqueda a this.state pasamos solo termino, si fuera diferente usariamos
  // termino: parametroFuncion. Una vez ejecutado el setState le pasamos un calbback para que ejecute la funcion consultarApi.
  datosBusqueda = (termino) => {
    this.setState(
      {
        termino: termino,
        pagina: 1,
      },
      () => {
        this.consultarApi();
      }
    );
  };
  //Funcion para consultar la api de pixabay
  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const key = "";
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=30&page=${pagina}`;
    // console.log(url);
    //Consultar api
    fetch(url)
      .then((respuesta) => respuesta.json())
      .then((resultado) => this.setState({ imagenes: resultado.hits }));
  };
  //Metodo render principal
  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imágenes</p>
          {/* Cargo el componente de busqueda dentro del div, y le paso la funcion datosBusqueda a props datosBuscar */}
          <Buscador datosBuscar={this.datosBusqueda} />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
        </div>
      </div>
    );
  }
}

export default App;
