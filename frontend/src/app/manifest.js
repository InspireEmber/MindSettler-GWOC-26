export default function manifest() {
     return {
          name: 'MindSettler',
          short_name: 'MindSettler',
          description: 'MindSettler by Parnika - Mental Well-being & Consultation',
          start_url: '/',
          display: 'standalone',
          background_color: '#F6F4FA',
          theme_color: '#DD1764',
          icons: [
               {
                    src: '/favicon.ico',
                    sizes: 'any',
                    type: 'image/x-icon',
               },
          ],
     }
}
