import { StyledRegisterVideo } from "./styles";
import React from "react";

//custom hook
function useForm(propsDoForm){
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
        }


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

export default function RegisterVideo(){
    const [formVisivel, setFormVisivel] = React.useState(false);
    const formCadastro = useForm({
        initialValues: { titulo:"", url: "" }
    });
    
    return (
            <StyledRegisterVideo>
                <button className="add-video" onClick={() => setFormVisivel(true)}>
                    +
                </button>
                {/* //escolhida expresão ternária */}
                {formVisivel 
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}> 
                    <div>
                    <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                        X
                    </button>
                    <input 
                    placeholder="Título do Vídeo"
                    name="titulo" 
                    value={formCadastro.values.titulo} 
                    onChange={formCadastro.handleChange}
                    />
                    <input 
                    placeholder="https://www.youtube.com/..." 
                    name="url"
                    value={formCadastro.values.url} 
                    onChange={formCadastro.handleChange}                   
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                    </div>                    
                </form>
                )
            : false }
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

    )
}