import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";
import { getProjectBySlug } from "../../data/projects";

const SITE_ORIGIN = "https://goatdryan.github.io";
const SITE_URL = "https://goatdryan.github.io/portfolio";

function setMetaByName(name, value) {
  if (!value) return;

  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
}

function setMetaByProperty(property, value) {
  if (!value) return;

  let tag = document.querySelector(`meta[property="${property}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", value);
}

function setCanonical(url) {
  let tag = document.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    document.head.appendChild(tag);
  }

  tag.setAttribute("href", url);
}

function toAbsoluteImageUrl(imagePath) {
  if (!imagePath) {
    return `${SITE_URL}/og-image.jpg`;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  if (imagePath.startsWith("/portfolio/")) {
    return `${SITE_ORIGIN}${imagePath}`;
  }

  if (imagePath.startsWith("/")) {
    return `${SITE_URL}${imagePath}`;
  }

  return `${SITE_URL}/${imagePath}`;
}

function getProjectSlug(pathname) {
  const match = pathname.match(/^\/projects\/([^/]+)/);
  return match ? match[1] : null;
}

function SEO() {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const currentLanguage = content[language] ? language : "fr";
    const homeSeo = content[currentLanguage].seo || content.fr.seo;

    const slug = getProjectSlug(location.pathname);
    const project = slug ? getProjectBySlug(slug) : null;

    let title = homeSeo.title;
    let description = homeSeo.description;
    let canonical = SITE_URL;
    let ogUrl = SITE_URL;
    let ogImage = `${SITE_URL}/og-image.jpg`;

    if (project) {
      const detail = project.detail?.[currentLanguage] || project.detail?.fr;
      const projectSeo = project.seo?.[currentLanguage] || project.seo?.fr;

      title =
        projectSeo?.title ||
        `${project.title} – Projet web | Ryan Mumbata`;

      description =
        projectSeo?.description ||
        detail?.subtitle ||
        project.card?.[currentLanguage]?.description ||
        project.card?.fr?.description ||
        homeSeo.description;

      canonical = `${SITE_URL}/projects/${project.slug}`;
      ogUrl = canonical;
      ogImage = toAbsoluteImageUrl(project.ogImage || project.image);
    }

    document.documentElement.lang = currentLanguage;
    document.title = title;

    setCanonical(canonical);

    setMetaByName("description", description);
    setMetaByName("robots", "index, follow");

    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:type", "website");
    setMetaByProperty("og:url", ogUrl);
    setMetaByProperty("og:image", ogImage);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", ogImage);
  }, [location.pathname, language]);

  return null;
}

export default SEO;