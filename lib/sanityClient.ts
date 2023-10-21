import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "ofplibh6",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skqhoU42IQrfBltAVDSwK4mcZcRCuNrkwNGyE7ob8GC3hXMKfcT62jZ6hylb8qH6dIVVoQc1BVOmwpUw43TLDt9asjcBIhQe0e4ITAnjZ8yVS4wujVpbPygfD0Nqqi5RpbWZjH8qK0lPX5yx8Lpb8Cmt0NU46JNpvRWyrx3tLfuxstQvoB5n",
  useCdn: false,
});
