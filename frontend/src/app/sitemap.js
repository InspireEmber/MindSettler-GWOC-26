export default function sitemap() {
     const baseUrl = 'https://mindsettler.com'; // Replace with actual domain

     return [
          {
               url: baseUrl,
               lastModified: new Date(),
               changeFrequency: 'yearly',
               priority: 1,
          },
          {
               url: `${baseUrl}/about`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.8,
          },
          {
               url: `${baseUrl}/services`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.8,
          },
          {
               url: `${baseUrl}/contact`,
               lastModified: new Date(),
               changeFrequency: 'yearly',
               priority: 0.5,
          },
          {
               url: `${baseUrl}/how-it-works`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/journey`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/book-session`,
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 0.9,
          },
          {
               url: `${baseUrl}/awareness`,
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 0.8,
          },
     ]
}
