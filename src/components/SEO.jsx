import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url }) => {
    const defaultTitle = "CV. Baroqah Maju Jaya | Distributor Ayam Broiler Palembang";
    const defaultDesc = "Distributor ayam broiler berkualitas di Palembang. Menyediakan ayam hidup, karkas, dan filet skala besar & kecil. Kualitas terjamin, harga bersaing.";
    const siteUrl = url || "https://baroqahmajujaya.com"; // Ganti dengan domain aslimu nanti

    // Schema Markup untuk Bisnis Lokal (Mendongkrak SEO Google Maps & Pencarian Lokal)
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "WholesaleStore",
        "name": "CV. Baroqah Maju Jaya",
        "image": `${siteUrl}/logo.png`,
        "description": defaultDesc,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "JL Panti Sosial Rt 24 Rw 09 Kel. Kebun Bunga",
            "addressLocality": "Sukarami",
            "addressRegion": "Palembang",
            "postalCode": "30152",
            "addressCountry": "ID"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-2.9360", // Ganti dengan koordinat akurat Palembang/lokasi RPU
            "longitude": "104.7210"
        },
        "telephone": "+6285373078847",
        "priceRange": "$$",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "05:00",
                "closes": "17:00"
            }
        ]
    };

    return (
        <Helmet>
            {/* Basic HTML Meta Tags */}
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description || defaultDesc} />
            <meta name="keywords" content="ayam broiler palembang, distributor ayam palembang, jual ayam karkas, ayam filet palembang, supplier ayam potong, rumah potong unggas palembang" />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title || defaultTitle} />
            <meta property="og:description" content={description || defaultDesc} />
            <meta property="og:image" content={`${siteUrl}/logo.png`} />

            {/* JSON-LD Schema Script */}
            <script type="application/ld+json">
                {JSON.stringify(localBusinessSchema)}
            </script>
        </Helmet>
    );
};

export default SEO;