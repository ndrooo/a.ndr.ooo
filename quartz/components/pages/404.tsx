import { i18n } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  // If baseUrl contains a pathname after the domain, use this as the home link
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = url.pathname

  return (
    <article class="popover-hint">
      <h1>Still growing...</h1>
      <p>
        My <a href="/Digital-garden">digital garden</a> doesn't have a note for this yet. Empty
        links are important! They represent the areas in which I'd like to expand my knowledge or
        writing.
      </p>
      <p>
        However, if you're curious about my thoughts on this topic, you can{" "}
        <a href="mailto:a@ndr.ooo">email me</a> or{" "}
        <a href="https://github.com/ndrooo/garden/issues">file an issue</a>.
      </p>
      <a href={baseDir}>Go home 🏠</a>
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
