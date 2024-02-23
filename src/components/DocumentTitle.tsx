import { Helmet } from "react-helmet-async"
import { env } from "../env"

export default (props: { title?: string | null }) => (
    <Helmet defaultTitle={env.REACT_APP_APPLICATION_TITLE} titleTemplate={`%s | ${env.REACT_APP_APPLICATION_TITLE}`}>
        <title>{ props.title }</title>
    </Helmet>
)