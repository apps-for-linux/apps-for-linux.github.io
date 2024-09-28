import { slugify } from "@/lib/utils/textConverter";

const taxonomyFilter = (Apps: any[], name: string, key: any) =>
  Apps.filter((post) =>
    post.data[name].map((name: string) => slugify(name)).includes(key)
  );

export default taxonomyFilter;
