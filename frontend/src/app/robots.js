export default function robots() {
     return {
          rules: {
               userAgent: '*',
               allow: '/',
               disallow: '/admin/',
          },
          sitemap: 'https://mindsettler.com/sitemap.xml',
     }
}
