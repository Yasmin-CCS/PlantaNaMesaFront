import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Usuario from "../../models/Usuario";
import { TokenState } from "../../store/tokens/TokensReducer";
import { Container, Grid } from "@mui/material";

function PerfilUsuario(){

    const userId = useSelector<TokenState, TokenState['id']>(
        (state) => state.id
        )

      //  const [usuario, setUsuario] = useState<Usuario>({
            // id: +userId,
            // nome: '',
            // usuario: '',
            // foto: '',
            // senha: '',
            // })

    return(
        <>
            <h1>TESTANDO A PÁGINA DO PERFIL DO USUÁRIO</h1>

      <Container>
        <Grid container>

            <Grid xs={3} alignItems='center' justifyContent='center'>
                  <Avatar src={usuario.foto} alt="" style={{width: '15rem', height: '15rem', margin: '0 auto'}} /> 
                
            </Grid>

        </Grid>
      </Container>
        </>
    );
}

export default PerfilUsuario