import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import './layout.css';
import Menu from './components/menu/index';
import Button from './components/button/index';
import * as SVGLoaders from 'svg-loaders-react';
import { useNavigate } from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransistionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div className="main">
      <Menu>
        <span>O nás</span>
        <span>Systémy</span>
        <span>Databáza</span>
      </Menu>

      <div className={`main-body ${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "fadeOut") {
          setTransistionStage("fadeIn");
          setDisplayLocation(location);
        }
      }}>
        <Routes location={displayLocation}>
          <Route exact path="/" element={ <Home/> }></Route>
          <Route path="/search" element={ <Search/> }></Route>
        </Routes>

      </div>
    </div>
  );
}

function Search() {
  const params = useLocation();
  return (<div className="search">
    {params.state.article}
  </div>);
}

// You can think of these components as "pages"
// in your app.

function Home() {
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);

  const styles = {
    page: {
      width: 'calc(100% - 50px)',
      height: '100%',
      marginTop: '150px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      padding: '0 25px',
      flexFlow: 'row wrap',
    },
    searchContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textarea: {
      width: '300px',
      height: '40px',
      lineHeight: '40px',
      border: '2px solid #E0A96D',
      paddingLeft: '20px',
      paddingRight: '20px',
      borderRadius: '5px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    buttonContainer: {
      marginTop: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    logoContainer: {
      padding: '3px',
      backgroundColor: '#E0A96D',
      width: '130px',
      height: '130px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
    logo: {
      width: '130px',
      height: '130px',
      borderRadius: '10px',
    },
    tools: {
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      backdropFilter: 'blur(4px)',
      padding: '30px 40px',
      borderRadius: '10px',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
    info: {
      maxWidth: '200px',
      height: 'auto',
      backgroundColor: '#DDC3A5',
      borderRadius: '10px',
      marginRight: '25px',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      padding: '20px',
      fontSize: '14px',
    },
  };

  const navigate = useNavigate();

  async function handleClick() {
    setLoading(!loading);

    setTimeout(() => {
      navigate('/search', {
        state: {article},
      });
    }, 2000);
  }

  return (
    <section className="home" style={styles.page}>
      <div className="info" style={styles.info}>
        <h1>Faktbot.sk</h1>
        <br/>
        <span>Je softvér, ktorý vám pomôže odhaliť zavádzajúce a klamlivé články. Článok stači vložiť do nášho vyhľadávača a umelá inteligencia ho ohodnotí podľa rôznych parametrov.</span>
      </div>
      
      <div className="search-container" style={styles.searchContainer}>

        <div className="tools" style={styles.tools}>
          <div className="logo-container" style={styles.logoContainer}>
            <img src="/logo.png" style={styles.logo} alt=""/>
          </div>

          <br/>

          <textarea style={styles.textarea} type="text" placeholder="Vložte svoj článok" onChange={e => setArticle(e.target.value)}></textarea>
          <div className="button-container" style={styles.buttonContainer}>

            <Button
              route={"/search"}
              routeData={{ article }}
              style={{ marginRight: '10px' }}
              loading={loading}
              onClick={() => handleClick}
              >
                <span>Overiť</span> <SVGLoaders.Puff width={30} height={30}
              />
              </Button>
            <Button>Analyzovať</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
