import React, { useContext } from "react"; 
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";
import { SlSocialGithub } from "react-icons/sl";






function HomePage() {
    const estiloDaHomePage = { };
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});
    
        
        React.useEffect(() => {
            //console.log("useEffect");
            service.getAllVideos()
                .then((dados) => {
                    //console.log(dados.data);
                    // Forma imutavel
                    const novasPlaylists = {};
                    dados.data.forEach((video) => {
                        if (!novasPlaylists[video.playlist]) {
                            novasPlaylists[video.playlist] = [];
                        } 
                        // novasPlaylists[video.playlist].push(video);
                        novasPlaylists[video.playlist] = [
                            video,
                            ...novasPlaylists[video.playlist],
                        ];
                    });
    
                    setPlaylists(novasPlaylists);
                });
        }, []);      
        

       

    return (        
        <>        
        <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1}}>
                
                {/* chamado de prop drilling. vai "perfurando" a aplicação */}

            <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
            <Header />
            <Timeline searchValue={valorDoFiltro} selection={config.selection} playlists={playlists}>
                    Conteúdo
            </Timeline>
            <Footer />
        </div>
        
        </>

        
        
    );
  }
  
export default HomePage


const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);


img {
    width: 80px;
    height:80px;
    border-radius: 50%;    
}
.user-info {
    /* margin-top: 50px; */
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;    
}
p {
    font-style: italic;
    color: ${({ theme }) => theme.iconsColorBase};    
}
#socialIcon {
    position: absolute;
        right: 20px;
        padding: 10px 32px;
        font-size: xx-large; 
        color: ${({ theme }) => theme.textColorFooter};       
        &>a{
            margin-left: 20px;
            cursor: pointer;
            text-decoration: none;
            color:inherit;            
            
        }
}

`;
const StyledBanner = styled.div`
 background-image: url(${({ theme }) => theme.banner});
    /* background-image: url(${({ bg, }) => bg}); */
    /* background-image: url(${config.bg}); */
    height: 280px;    
    background-position-y: 800px;
    //background-attachment: fixed;
    
`;

const StyledFooter = styled.div`
background-color: ${({ theme }) => theme.backgroundBase};
height: 140px;
align-items: center;
text-align: center;
font-size: smaller;
font-family: sans-serif;
display: block;
margin: 0 auto;



.fontfooter {    
    color: ${({ theme }) => theme.textColorFooter}; 
    padding: 5px; 
    padding-bottom: 20px;    
      
    
}

.fontfooterTitulo {
    padding-top: 20px;
    border-top: 0.4px solid ${({ theme }) => theme.textColorFooter};
    color: ${({ theme }) => theme.textColorFooter};
        
}

.iconFooter {
    padding: 10px;
    font-size: 5em;
    color: ${({ theme }) => theme.textColorFooter};
    &>a{
            margin-left: 20px;
            cursor: pointer;
            text-decoration: none;
            color:inherit;
    }
      
}`;



function Header() {
    
    //console.log(ColorModeProvider.mode);
    return (
        <StyledHeader>
            <StyledBanner bg={config.bgdark}/>  
            {/* <StyledBanner bg={`config.bg${contexto.mode}`}/> */}
            
            <section className="user-info">            
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div> 
                <div id="socialIcon">
                <a href="https://github.com/MisterMisunderstood" target="_blank" alt="Github"><SlSocialGithub /></a>               
                
                </div>            
            </section>
                 
        </StyledHeader>
    )
      
}

 
function Footer(){
    return (
        <StyledFooter>
            <section>
                <p className="fontfooterTitulo">Feito com carinho 💜 por <a href="https://github.com/MisterMisunderstood" target="_blank">Ricardo</a></p>
                <a className="fontfooter">Imersão Alura 2022</a>  
                <div className="iconFooter">
                <a href="https://github.com/MisterMisunderstood" target="_blank"><SlSocialGithub /></a> 
                </div>           
            
            </section>
        </StyledFooter>
    )
}

function Timeline({searchValue, ...propriedades}) {
    const playlistNames = Object.keys(propriedades.playlists);
    const selectionVideos = Object.keys(propriedades.selection)
    
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = propriedades.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);                
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)                                

                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}                            
                        </div>
                    </section>
                )               
                  
            })}
            {selectionVideos.map((selectionVideo) => {
                    const sel = propriedades.selection[selectionVideo];

                    return (
                        <section key={selectionVideo}>
                            <h2>{selectionVideo}</h2>
                            <div>
                                {sel.filter((video) => {
                                    const titleNormalized = video.title.toLowerCase();
                                    const searchValueNormalized = searchValue.toLowerCase();
                                    return titleNormalized.includes(searchValueNormalized)                                
    
                                }).map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}                            
                            </div>
                        </section>
                    )               
                      
                })}

        </StyledTimeline>
    )    
}


    
 
  