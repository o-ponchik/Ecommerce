import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.PROJECT_ID,
  dataset: "production",
  apiVersion: "2023-12-01",
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

export async function updateOrderStatus(orderId, property, value) {
  if (property === "status") {
    const response = await client
      .patch(orderId)
      .set({ status: value })
      .commit({ token: process.env.NEXT_PUBLIC_SANITY_TOKEN });
    return response;
  } else if (property === "isPaid") {
    const response = await client
      .patch(orderId)
      .set({ isPaid: value === "true" ? true : false })
      .commit({ token: process.env.NEXT_PUBLIC_SANITY_TOKEN });
    return response;
  } else if (property === "isDelivered") {
    const response = await client
      .patch(orderId)
      .set({ isDelivered: value === "true" ? true : false })
      .commit({ token: process.env.NEXT_PUBLIC_SANITY_TOKEN });
    return response;
  } else if (property === "paidAt") {
    const response = await client
      .patch(orderId)
      .set({ paidAt: value })
      .commit({ token: process.env.NEXT_PUBLIC_SANITY_TOKEN });
    return response;
  } else if (property === "deliveredAt") {
    const response = await client
      .patch(orderId)
      .set({ deliveredAt: value })
      .commit({ token: process.env.NEXT_PUBLIC_SANITY_TOKEN });
    return response;
  }
}

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
