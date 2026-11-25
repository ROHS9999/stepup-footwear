window.dataLayer = window.dataLayer || [];

function gtag() {
  window.dataLayer.push(arguments);
}

window.gtag = gtag;

var GA_ID = 'G-YZVXYSEWSN';

var ga = document.createElement('script');
ga.async = true;
ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;

document.head.appendChild(ga);

gtag('js', new Date());
gtag('config', GA_ID, { send_page_view: false });