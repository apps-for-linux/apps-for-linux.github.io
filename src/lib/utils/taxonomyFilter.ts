import { slugify } from "@/lib/utils/textConverter"

const taxonomyFilter = (apps: any[], name: string, key: any) =>
  apps.filter(app => app.data[name].map((name: string) => slugify(name)).includes(key))

export default taxonomyFilter
