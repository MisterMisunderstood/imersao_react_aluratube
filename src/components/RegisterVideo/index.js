import { StyledRegisterVideo } from "./styles";
import React from "react";
import { createClient } from "@supabase/supabase-js";

//custom hook
function useForm(propsDoForm) {
  const [values, setValues] = React.useState(propsDoForm.initialValues);

  return {
    values,
    handleChange: (evento) => {
      const value = evento.target.value;
      const name = evento.target.name;
      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },

    // handleChange(){
    //     {(evento) => {
    //         const value = evento.target.value;
    //         setValues({
    //             ...values,
    //             titulo: value,
    //         });
    //     }}
    // }
  };
}

const PROJECT_URL = "https://tjdjhdwfqhlcjcqxrwmp.supabase.co";
const SUP_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZGpoZHdmcWhsY2pjcXhyd21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMDA3MDksImV4cCI6MTk4Mzc3NjcwOX0.pVf0Qmzelk0uW53eeLhm5g6vjHbcPj79k41KC6TfBrQ";
const supabase = createClient(PROJECT_URL, SUP_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}
export default function RegisterVideo() {
  const [formVisivel, setFormVisivel] = React.useState(false);
  const formCadastro = useForm({
    initialValues: { titulo: "", url: "", playlist: "" },
  });

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setFormVisivel(true)}>
        +
      </button>
      {/* //escolhida expresão ternária */}
      {formVisivel ? (
        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            //console.log(formCadastro.values);

            //contrato entre front e back-end
            supabase
              .from("playlstdb")
              .insert({
                title: formCadastro.values.titulo,
                url: formCadastro.values.url,
                thumb: getThumbnail(formCadastro.values.url),
                playlist: formCadastro.values.playlist,
              })

              .then((oqueveio) => {
                console.log(oqueveio);
              })
              .catch((err) => {
                console.log(err);
              });

            setFormVisivel(false);
            formCadastro.clearForm();
          }}
        >
          <div>
            <button
              type="button"
              className="close-modal"
              onClick={() => setFormVisivel(false)}
            >
              X
            </button>
            <div class="box-thumb">
              <img
                class="box-img"
                src={getThumbnail(formCadastro.values.url)}
              />
            </div>
            <input
              required="Coloque um título para o vídeo a ser inserido"
              placeholder="Título do Vídeo"
              name="titulo"
              value={formCadastro.values.titulo}
              onChange={formCadastro.handleChange}
            />
            <input
              required="Aqui eu quero uma url do vídeo"
              placeholder="https://www.youtube.com/..."
              name="url"
              value={formCadastro.values.url}
              onChange={formCadastro.handleChange}
            />
            <input
              required="Digite um nome para playlist ou selecione uma existente"
              placeholder="Playlist"
              name="playlist"
              value={formCadastro.values.playlist}
              onChange={formCadastro.handleChange}
            />

            <button type="submit">Cadastrar</button>
          </div>
        </form>
      ) : (
        true
      )}
      {/* //forma abaixo tb funciona, op lógico */}
      {/* {formVisivel && (
                    <form>
                    <div>
                    <button className="close-modal">
                        X
                    </button>
                    <input placeholder="Título do Vídeo" />
                    <input placeholder="URL" />
                    <button type="submit">
                        Cadastrar
                    </button>
                    </div>                    
                </form>
                )} */}
    </StyledRegisterVideo>
  );
}
