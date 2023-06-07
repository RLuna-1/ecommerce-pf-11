import estilo from "../css/About.css";

const About = () => {
    return (
        <div className={estilo.contenidoAbout}>
            <section className={estilo.contenidoHero}>
                <div>
                    <h2 className={estilo.titleHero}>Hola, esta pagina se trata de venta de software y hardware</h2>
                   

                   
                </div>

                {/* <img src="github" alt="programming" className={estilo.imgHero}/> */}
            </section>

            <section className={estilo.contenidoAbout}>
                <h3 className={estilo.titleAbout}>SOBRE ESTA PAGINA</h3>

                {/* <p className={estilo.descriptionAbout}>
                    Desde el inicio de mi carrera como sesarrollador de software, me han convertido en una persona con metas
                    claras, cada dia me levanto con las ganas de aprender temas nuevos. Esto hace de mi una persona constante,
                    curiosa y sin miedos a enfrentarme a nuevos Retos.
                </p>
                <p className={estilo.descriptionAbout}>
                    Actualmente soy Programador Backend junior egresado en el año 2018 como Analista Programador Computacional 
                    pero no conforme con eso fui mas alla, de Tecnico a formarme como Ingeniero en Informatica en  Mencion en
                    Desarrollo de Sistema
                </p> */}
            </section>
        </div>
    )
}

export default About;