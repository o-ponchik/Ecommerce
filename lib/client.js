import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "as16wqx5",
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export async function updateOrderStatusWrapper(orderId, status) {
  try {
    const res = await updateOrderStatus(orderId, status);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrderStatus(orderId, status) {
  const response = await client
    .patch(orderId)
    .set({ status })
    .commit({ token: process.env.NEXT_PUBLIC_SANITY_TOKEN });
  return response;
}

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
