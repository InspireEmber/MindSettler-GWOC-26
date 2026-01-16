export default function sitemap() {
     const baseUrl = 'https://mindsettler.com';

     return [
          {
               url: baseUrl,
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 1.0,
          },
          {
               url: `${baseUrl}/about`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.9,
          },
          {
               url: `${baseUrl}/how-it-works`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.8,
          },
          {
               url: `${baseUrl}/journey`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.8,
          },
          {
               url: `${baseUrl}/book-session`,
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 0.9,
          },
          {
               url: `${baseUrl}/contact`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/faqs`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/awareness`,
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 0.8,
          },
          {
               url: `${baseUrl}/corporate`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/resources`,
               lastModified: new Date(),
               changeFrequency: 'weekly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/what-makes-us-different`,
               lastModified: new Date(),
               changeFrequency: 'monthly',
               priority: 0.7,
          },
          {
               url: `${baseUrl}/policies/privacy-policy`,
               lastModified: new Date(),
               changeFrequency: 'yearly',
               priority: 0.5,
          },
          {
               url: `${baseUrl}/policies/terms-of-service`,
               lastModified: new Date(),
               changeFrequency: 'yearly',
               priority: 0.5,
          },
          {
               url: `${baseUrl}/policies/cancellation-policy`,
               lastModified: new Date(),
               changeFrequency: 'yearly',
               priority: 0.5,
          },
     ];
}
