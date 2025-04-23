import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const post = await import(`../../garden/${params.slug}.md`);
    const title = post.metadata.title || params.slug;
    const content = post.default;

    return {
      content,
      title
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}
