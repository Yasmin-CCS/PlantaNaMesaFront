import { Grid } from '@mui/material';
import './CardProf.css'
import { Box, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Cards (){
    return(
        <>
    <Grid xs={12} className='tituloprod'> <h1>Desenvolvedores</h1> </Grid>
    <Grid className='Lista'>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <Grid className="card">
            <Box>
                <img src="https://avatars.githubusercontent.com/u/123428616?v=4" alt="Link para o github do William" className='criador1' />
                <h3> William Reis </h3>
                 <p className="title">Desenvolvedor FullStack</p>
                    <div className='redesC'> 
                    <a href="https://github.com/WilliamReisO" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/William-Reis-O/"><i className="fa fa-linkedin"></i></a>
                    </div> 
            </Box>
        </Grid>
        <Grid className="card">
            <Box>
                <img src="https://avatars.githubusercontent.com/u/127205710?v=4" alt="Link para o github do Giovanni"  className='criador1' />
                <h3> Giovanni </h3>
                 <p className="title">Desenvolvedor FullStack</p>
                    <div className='redesC'> 
                    <a href="https://github.com/AzvalSG" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/giovanni-santos-5395551b7/"><i className="fa fa-linkedin"></i></a>
                    </div> 
            </Box>
        </Grid>
            
        <Grid className="card">
            <Box>
            <img src="https://avatars.githubusercontent.com/u/127205957?v=4" alt="Link para o github da Yasmin" className='criador1' />
                <h3> Yasmin </h3>
                 <p className="title">Desenvolvedora FullStack</p>
                    <div className='redesC'> 
                    <a href="https://github.com/Yasmin-CCS" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/yasmin-saparolli/"><i className="fa fa-linkedin"></i></a>
                    </div> 
            </Box>
        </Grid>

        <Grid className="card">
            <Box>
            <img src="https://avatars.githubusercontent.com/u/100323487?v=4" alt="Link para o github da Mariane" className='criador1' />
                    <h3> Mariane </h3>
                 <p className="title">Desenvolvedora FullStack</p>
                    <div className='redesC'> 
                    <a href="https://github.com/MarianeAnjos" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/mariane-anjos-896479173/"><i className="fa fa-linkedin"></i></a>
                    </div> 
            </Box>
        </Grid>
        <Grid className="card">
            <Box>
            <img src="https://avatars.githubusercontent.com/u/43155603?v=4" alt="Link para o github da Beatriz" className='criador1' />
                <h3> Beatriz </h3>
                 <p className="title">Desenvolvedora FullStack</p>
                    <div className='redesC'> 
                    <a href="https://github.com/beatrizangelita" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/mariane-anjos-896479173/"><i className="fa fa-linkedin"></i></a>
                    </div> 
            </Box>
        </Grid>
            
                
    </Grid>
        </>
    );
}
export default Cards;