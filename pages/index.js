import React from "react"; 
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { videoService } from "../src/services/videoService";

function HomePage() {
    const estiloDaHomePage = { };
    const service = videoService();
        const [valorDoFiltro, setValorDoFiltro] = React.useState("");
        const [playlists, setPlaylists] = React.useState({});
        
        React.useEffect(() => {
            console.log("useEffect");
            service.getAllVideos()
                .then((dados) => {
                    console.log(dados.data);
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
        
        // React.useEffect(() => {
        //     supabase.from("video")
        //     .select("*")
        //     .then((dados) => {
        //         console.log(dados.data);
        //         const newPlaylists = {...playlists};
        //         dados.data.forEach((video) => {
        //             if (newPlaylists[video.playlists]) {
        //                 newPlaylists[video.playlists] = [];
                        

        //             }
        //             playlists[video.playlists]?.push(video);
                    
        //         })
        //         setPlaylists(playlists);    
        //     });

        // },[]);

       

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
        </div>
        </>
        
    );
  }
  
export default HomePage

// function Menu() {
//     return (
//         <div>
//         Menu
//         </div>
//     )
      
//}

const StyledHeader = styled.div`
background-color: ${({ theme }) => theme.backgroundLevel1};



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
`;
const StyledBanner = styled.div`
    background-image: url(${({ bg }) => bg});
    /* background-image: url(${config.bg}); */
    height: 230px;    
    background-position-y: 800px;

`;

function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg}/>
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
               
            </section>
                 
        </StyledHeader>
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
    

  