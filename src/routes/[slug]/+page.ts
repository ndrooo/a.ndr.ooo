import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const post = await import(`../../notes/${params.slug}.md`);
    const { title, blurb } = post.metadata;
    const content = post.default;

    return {
      blurb,
      content,
      title
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
}
