import { Button, Container, TextField, Typography } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import * as reactRedux from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import { buscaId, post, put } from "../../../services/Service";
import { TokenState } from "../../../store/tokens/tokensReducer";
import { toast } from "react-toastify";

function CadastroCategoria() {

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>();

    // pegar o token armazenado
    const token = reactRedux.useSelector<TokenState, TokenState["token"]>(
        (state) => state.token
    );

    // iniciando a variavel para armazenar o tema digitado
    const [categoria, setCategoria] = useState<Categoria>({
        id: 0,
        descricao: "",
        nome: "",
        produto: null
    });

    async function getById(id: string) {
        try {
            await buscaId(`/categorias/${id}`, setCategoria, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            alert("A Categoria não existe");
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            getById(id);
        }
    }, [id]);

    useEffect(() => {
        if (token === "") {
            toast.error('Você precisa estar logado',{
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress: undefined, 
            });
            navigate("/login");
        }
    }, [token]);

    // função que pega a alteração do input e armazena os dados
    function updatedCategoria(event: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [event.target.name]: event.target.value,
        });
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault();

        if (id !== undefined) {
            try {
                await put("/categorias", categoria, setCategoria, {
                    headers: {
                        Authorization: token,
                    },
                });
                toast.success('Categoria atualizada com sucesso!',{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined, 
                });
                back();
            } catch (error) {
                toast.error('Não foi possível atualizadar a categoria!',{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined, 
                });
            }
        } else {
            try {
                await post("/categorias", categoria, setCategoria, {
                    headers: {
                        Authorization: token,
                    },
                });

                toast.success('Categoria cadastrada com Sucesso!',{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined, 
                });
                back();
            } catch (error) {
                toast.error('Não foi possível cadastrar a Categoria!',{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined, 
                });
            }
        }
    }

    function back() {
        navigate("/categorias");
    }

    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >
                    {id !== undefined ? " Atualizar " : " Cadastrar "}
                    Categoria
                </Typography>

                <TextField
                    value={categoria.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)}
                    id="nome"
                    label="nome"
                    variant="outlined"
                    name="nome"
                    margin="normal"
                    fullWidth
                />

                <TextField
                    value={categoria.descricao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)}
                    id="descricao"
                    label="descricao"
                    variant="outlined"
                    name="descricao"
                    margin="normal"
                    fullWidth
                />
                
                <Button type="submit" variant="contained" color="primary" disabled={categoria.descricao.length < 4}>
                    {id !== undefined ? 'Atualizar' : 'Cadastrar'}
                </Button>
            </form>
        </Container>
    );
}

export default CadastroCategoria;
