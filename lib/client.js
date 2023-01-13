import sanityClient from "@sanity/client";
import imgUrlBuilder from "@sanity/image-url";

const client = sanityClient({
  projectId: "",
  dataset: "",
  apiVersion: "",
  useCdn: true,
  token: "",
});
