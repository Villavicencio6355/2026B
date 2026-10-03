import { useState } from "react";
import "./App.css";

const categorias = [
  {
    id: "matematicas",
    nombre: "Matemáticas",
    descripcion: "Recursos para aprender y practicar matemáticas.",
    videos: [
      {
        id: 1,
        titulo: "Introducción a las ecuaciones",
        descripcion:
          "Conceptos básicos para comenzar a trabajar con ecuaciones.",
        articuloRelacionado: 1,
      },
      {
        id: 2,
        titulo: "Fracciones paso a paso",
        descripcion: "Aprende a sumar y restar fracciones de manera sencilla.",
        articuloRelacionado: 2,
      },
    ],
    articulos: [
      {
        id: 1,
        titulo: "¿Qué es una ecuación?",
        contenido:
          "Una ecuación es una igualdad matemática en la que normalmente buscamos encontrar el valor de una incógnita. Las ecuaciones pueden utilizarse para representar diferentes situaciones y resolver problemas.",
        videoRelacionado: 1,
      },
      {
        id: 2,
        titulo: "Conceptos básicos de álgebra",
        contenido:
          "El álgebra utiliza números, símbolos y variables para representar relaciones matemáticas. Comprender estos conceptos facilita la resolución de problemas más complejos.",
        videoRelacionado: 2,
      },
    ],
  },
  {
    id: "ciencias",
    nombre: "Ciencias",
    descripcion: "Contenido para explorar diferentes temas científicos.",
    videos: [
      {
        id: 3,
        titulo: "Introducción al sistema solar",
        descripcion:
          "Conoce los principales cuerpos que forman nuestro sistema solar.",
        articuloRelacionado: 1,
      },
      {
        id: 4,
        titulo: "El ciclo del agua",
        descripcion:
          "Descubre cómo funciona el ciclo del agua en nuestro planeta.",
        articuloRelacionado: 1,
      },
    ],
    articulos: [
      {
        id: 3,
        titulo: "Los planetas del sistema solar",
        contenido:
          "El sistema solar está formado por el Sol y diferentes cuerpos que orbitan a su alrededor. Entre ellos se encuentran ocho planetas con características diferentes.",
      },
      {
        id: 4,
        titulo: "Importancia del agua",
        contenido:
          "El agua es un recurso fundamental para los seres vivos. Su ciclo natural permite que se distribuya constantemente entre la atmósfera, la superficie y el subsuelo.",
      },
    ],
  },
  {
    id: "historia",
    nombre: "Historia",
    descripcion:
      "Artículos y recursos para conocer diferentes acontecimientos históricos.",
    videos: [
      {
        id: 5,
        titulo: "Las civilizaciones antiguas",
        descripcion:
          "Una introducción a algunas de las primeras grandes civilizaciones.",
      },
      {
        id: 6,
        titulo: "La Revolución Industrial",
        descripcion:
          "Conoce algunos de los cambios provocados por la Revolución Industrial.",
      },
    ],
    articulos: [
      {
        id: 5,
        titulo: "Civilizaciones antiguas",
        contenido:
          "Las civilizaciones antiguas desarrollaron diferentes formas de organización social, política y económica. Algunas de ellas dejaron importantes aportaciones culturales y tecnológicas.",
      },
      {
        id: 6,
        titulo: "Cambios de la Revolución Industrial",
        contenido:
          "La Revolución Industrial produjo importantes transformaciones económicas y sociales, especialmente a partir del desarrollo de nuevas tecnologías y formas de producción.",
      },
    ],
  },
];

const ejercicios = [
  {
    id: 1,
    pregunta: "¿Cuál de las siguientes opciones representa una ecuación?",
    opciones: ["2 + 5", "x + 3 = 8", "Hola mundo", "5 × 2"],
    respuesta: "x + 3 = 8",
    explicacion:
      "Correcto. Una ecuación representa una igualdad en la que puede existir una incógnita.",
  },
  {
    id: 2,
    pregunta: "¿Cuál es el planeta más cercano al Sol?",
    opciones: ["Venus", "Marte", "Mercurio", "Júpiter"],
    respuesta: "Mercurio",
    explicacion:
      "Correcto. Mercurio es el planeta que se encuentra más cerca del Sol.",
  },
];

function App() {
  const [vista, setVista] = useState("inicio");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [recursoSeleccionado, setRecursoSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todos");
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuesta, setRespuesta] = useState("");
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const categoriaActual = categorias.find(
    (categoria) => categoria.id === categoriaSeleccionada,
  );

  const abrirCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria.id);
    setVista("categoria");
  };

  const abrirVideo = (video) => {
    setRecursoSeleccionado(video);
    setVista("video");
  };

  const abrirArticulo = (articulo) => {
    setRecursoSeleccionado(articulo);
    setVista("articulo");
  };

  const abrirVideoRelacionado = (video) => {
    setRecursoSeleccionado(video);
    setVista("video");
  };

  const abrirArticuloRelacionado = (articulo) => {
    setRecursoSeleccionado(articulo);
    setVista("articulo");
  };

  const volverInicio = () => {
    setVista("inicio");
    setCategoriaSeleccionada(null);
    setRecursoSeleccionado(null);
  };

  const volverCategoria = () => {
    setVista("categoria");
    setRecursoSeleccionado(null);
  };

  const responderEjercicio = (opcion) => {
    setRespuesta(opcion);
    setMostrarResultado(true);
  };

  const siguienteEjercicio = () => {
    setEjercicioActual((actual) =>
      actual < ejercicios.length - 1 ? actual + 1 : 0,
    );
    setRespuesta("");
    setMostrarResultado(false);
  };

  const todosLosRecursos = categorias.flatMap((categoria) => [
    ...categoria.videos.map((video) => ({
      ...video,
      tipo: "video",
      categoria: categoria.nombre,
    })),
    ...categoria.articulos.map((articulo) => ({
      ...articulo,
      tipo: "articulo",
      categoria: categoria.nombre,
    })),
  ]);

  const recursosFiltrados = todosLosRecursos.filter((recurso) => {
    const coincideBusqueda =
      recurso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      recurso.categoria.toLowerCase().includes(busqueda.toLowerCase());

    const coincideFiltro = filtro === "todos" || recurso.tipo === filtro;

    return coincideBusqueda && coincideFiltro;
  });

  return (
    <div className="app">
      <header className="header">
        <div className="logo" onClick={volverInicio}>
          PrototipoEDU
        </div>

        <nav className="nav">
          <button onClick={volverInicio}>Inicio</button>
          <button onClick={() => setVista("categorias")}>Categorías</button>
          <button onClick={() => setVista("buscar")}>Buscar recursos</button>
          <button onClick={() => setVista("ejercicios")}>Ejercicios</button>
        </nav>
      </header>

      <main className="contenido">
        {/* INICIO */}
        {vista === "inicio" && (
          <>
            <section className="hero">
              <div>
                <span className="etiqueta">RECURSOS EDUCATIVOS</span>

                <h1>Aprende a tu propio ritmo.</h1>

                <p>
                  Explora videos, artículos y ejercicios educativos organizados
                  por diferentes categorías.
                </p>

                <button
                  className="boton-principal"
                  onClick={() => setVista("categorias")}
                >
                  Explorar categorías
                </button>
              </div>

              <div className="hero-card">
                <span>📚</span>
                <h3>Aprendizaje accesible</h3>
                <p>
                  Recursos organizados para facilitar la búsqueda y consulta de
                  contenidos.
                </p>
              </div>
            </section>

            <section className="seccion">
              <div className="titulo-seccion">
                <div>
                  <span className="etiqueta">EXPLORA</span>
                  <h2>Categorías educativas</h2>
                </div>
              </div>

              <div className="grid-categorias">
                {categorias.map((categoria) => (
                  <button
                    className="categoria-card"
                    key={categoria.id}
                    onClick={() => abrirCategoria(categoria)}
                  >
                    <span className="icono-categoria">
                      {categoria.id === "matematicas"
                        ? "∑"
                        : categoria.id === "ciencias"
                          ? "⚗"
                          : "⌛"}
                    </span>

                    <h3>{categoria.nombre}</h3>

                    <p>{categoria.descripcion}</p>

                    <span className="ver-mas">Ver recursos →</span>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

        {/* CATEGORÍAS */}
        {vista === "categorias" && (
          <section className="pagina">
            <span className="etiqueta">HU-01</span>
            <h1>Categorías educativas</h1>

            <p className="introduccion">
              Selecciona una categoría para consultar sus videos y artículos.
            </p>

            <div className="grid-categorias">
              {categorias.map((categoria) => (
                <button
                  className="categoria-card"
                  key={categoria.id}
                  onClick={() => abrirCategoria(categoria)}
                >
                  <span className="icono-categoria">
                    {categoria.id === "matematicas"
                      ? "∑"
                      : categoria.id === "ciencias"
                        ? "⚗"
                        : "⌛"}
                  </span>

                  <h3>{categoria.nombre}</h3>
                  <p>{categoria.descripcion}</p>

                  <span className="ver-mas">Explorar →</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* CATEGORÍA */}
        {vista === "categoria" && categoriaActual && (
          <section className="pagina">
            <button
              className="boton-volver"
              onClick={() => setVista("categorias")}
            >
              ← Volver a categorías
            </button>

            <span className="etiqueta">SPRINT 1</span>
            <h1>{categoriaActual.nombre}</h1>
            <p className="introduccion">{categoriaActual.descripcion}</p>

            <div className="subseccion">
              <h2>Videos educativos</h2>

              <div className="grid-recursos">
                {categoriaActual.videos.map((video) => (
                  <article className="recurso-card" key={video.id}>
                    <div className="mini-video">
                      <span>▶</span>
                    </div>

                    <div className="recurso-contenido">
                      <span className="tipo">VIDEO</span>
                      <h3>{video.titulo}</h3>
                      <p>{video.descripcion}</p>

                      <button
                        className="boton-secundario"
                        onClick={() => abrirVideo(video)}
                      >
                        Ver video
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="subseccion">
              <h2>Artículos educativos</h2>

              <div className="grid-recursos">
                {categoriaActual.articulos.map((articulo) => (
                  <article
                    className="recurso-card articulo-card"
                    key={articulo.id}
                  >
                    <div className="articulo-icono">📖</div>

                    <div className="recurso-contenido">
                      <span className="tipo">ARTÍCULO</span>
                      <h3>{articulo.titulo}</h3>
                      <p>{articulo.contenido.substring(0, 100)}...</p>

                      <button
                        className="boton-secundario"
                        onClick={() => abrirArticulo(articulo)}
                      >
                        Leer artículo
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* VIDEO */}
        {vista === "video" && recursoSeleccionado && (
          <section className="pagina recurso-pagina">
            <button className="boton-volver" onClick={volverCategoria}>
              ← Volver
            </button>

            <span className="etiqueta">HU-02</span>

            <h1>{recursoSeleccionado.titulo}</h1>

            <div className="video-grande">
              <div className="play-grande">▶</div>
              <span>Video educativo</span>
              <small>Reproductor de demostración</small>
            </div>

            <div className="contenido-recurso">
              <h2>Sobre este recurso</h2>
              <p>{recursoSeleccionado.descripcion}</p>
            </div>

            {categoriaActual && recursoSeleccionado.articuloRelacionado && (
              <div className="recurso-relacionado">
                <strong>💡 Continúa aprendiendo</strong>
                <p>
                  Puedes consultar un artículo relacionado con este video para
                  complementar el tema.
                </p>

                <button
                  className="boton-secundario"
                  onClick={() => {
                    const articulo = categoriaActual.articulos.find(
                      (articulo) =>
                        articulo.id === recursoSeleccionado.articuloRelacionado,
                    );

                    if (articulo) {
                      abrirArticuloRelacionado(articulo);
                    }
                  }}
                >
                  Leer artículo relacionado →
                </button>
              </div>
            )}
          </section>
        )}

        {/* ARTÍCULO */}
        {vista === "articulo" && recursoSeleccionado && (
          <section className="pagina recurso-pagina">
            <button className="boton-volver" onClick={volverCategoria}>
              ← Volver
            </button>

            <span className="etiqueta">HU-03</span>

            <h1>{recursoSeleccionado.titulo}</h1>

            <div className="articulo-completo">
              <div className="articulo-header">
                <span>📖</span>
                <div>
                  <p>Artículo educativo</p>
                  <small>Lectura introductoria</small>
                </div>
              </div>

              <p>{recursoSeleccionado.contenido}</p>

              <p>
                Este contenido forma parte de los recursos educativos
                disponibles en la plataforma y puede complementarse con videos y
                ejercicios.
              </p>
            </div>

            <div className="recurso-relacionado">
              <strong>💡 Continúa aprendiendo</strong>

              <p>
                Puedes consultar un video relacionado con este artículo para
                complementar el tema.
              </p>

              {categoriaActual && recursoSeleccionado.videoRelacionado && (
                <button
                  className="boton-secundario"
                  onClick={() => {
                    const video = categoriaActual.videos.find(
                      (video) =>
                        video.id === recursoSeleccionado.videoRelacionado,
                    );

                    if (video) {
                      abrirVideoRelacionado(video);
                    }
                  }}
                >
                  Ver video relacionado →
                </button>
              )}

              <p>
                También puedes realizar un ejercicio para comprobar lo
                aprendido.
              </p>

              <button
                className="boton-principal"
                onClick={() => setVista("ejercicios")}
              >
                Ir a ejercicios
              </button>
            </div>
          </section>
        )}

        {/* BÚSQUEDA */}
        {vista === "buscar" && (
          <section className="pagina">
            <span className="etiqueta">HU-05</span>
            <h1>Buscar recursos</h1>

            <p className="introduccion">
              Encuentra videos y artículos utilizando la búsqueda y los filtros.
            </p>

            <div className="busqueda">
              <input
                type="text"
                placeholder="Buscar por título o categoría..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <div className="filtros">
                <button
                  className={filtro === "todos" ? "filtro-activo" : ""}
                  onClick={() => setFiltro("todos")}
                >
                  Todos
                </button>

                <button
                  className={filtro === "video" ? "filtro-activo" : ""}
                  onClick={() => setFiltro("video")}
                >
                  Videos
                </button>

                <button
                  className={filtro === "articulo" ? "filtro-activo" : ""}
                  onClick={() => setFiltro("articulo")}
                >
                  Artículos
                </button>
              </div>
            </div>

            <div className="resultados">
              <h2>{recursosFiltrados.length} recurso(s) encontrado(s)</h2>

              {recursosFiltrados.length === 0 ? (
                <div className="sin-resultados">
                  No encontramos recursos con esos criterios.
                </div>
              ) : (
                <div className="lista-resultados">
                  {recursosFiltrados.map((recurso) => (
                    <button
                      className="resultado"
                      key={`${recurso.tipo}-${recurso.id}`}
                      onClick={() =>
                        recurso.tipo === "video"
                          ? abrirVideo(recurso)
                          : abrirArticulo(recurso)
                      }
                    >
                      <span className="resultado-icono">
                        {recurso.tipo === "video" ? "▶" : "📖"}
                      </span>

                      <div>
                        <span className="tipo">{recurso.tipo}</span>
                        <h3>{recurso.titulo}</h3>
                        <p>{recurso.categoria}</p>
                      </div>

                      <span>→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* EJERCICIOS */}
        {vista === "ejercicios" && (
          <section className="pagina">
            <button className="boton-volver" onClick={volverInicio}>
              ← Volver al inicio
            </button>

            <span className="etiqueta">HU-04</span>

            <h1>Ejercicios de práctica</h1>

            <p className="introduccion">
              Comprueba lo aprendido mediante ejercicios con retroalimentación
              inmediata.
            </p>

            <div className="ejercicio">
              <div className="progreso">
                Ejercicio {ejercicioActual + 1} de {ejercicios.length}
              </div>

              <h2>{ejercicios[ejercicioActual].pregunta}</h2>

              <div className="opciones">
                {ejercicios[ejercicioActual].opciones.map((opcion) => (
                  <button
                    key={opcion}
                    className={
                      respuesta === opcion
                        ? opcion === ejercicios[ejercicioActual].respuesta
                          ? "opcion correcta"
                          : "opcion incorrecta"
                        : "opcion"
                    }
                    onClick={() => responderEjercicio(opcion)}
                    disabled={mostrarResultado}
                  >
                    {opcion}
                  </button>
                ))}
              </div>

              {mostrarResultado && (
                <div
                  className={
                    respuesta === ejercicios[ejercicioActual].respuesta
                      ? "feedback correcto"
                      : "feedback incorrecto"
                  }
                >
                  <strong>
                    {respuesta === ejercicios[ejercicioActual].respuesta
                      ? "¡Correcto!"
                      : "Respuesta incorrecta"}
                  </strong>

                  <p>
                    {respuesta === ejercicios[ejercicioActual].respuesta
                      ? ejercicios[ejercicioActual].explicacion
                      : `La respuesta correcta es: ${ejercicios[ejercicioActual].respuesta}.`}
                  </p>
                </div>
              )}

              {mostrarResultado && (
                <button
                  className="boton-principal"
                  onClick={siguienteEjercicio}
                >
                  Siguiente ejercicio
                </button>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>PrototipoEDU · Prototipo académico</p>
        <span>Recursos educativos para estudiantes</span>
      </footer>
    </div>
  );
}

export default App;
