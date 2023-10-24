
declare global {
    interface Window {
      env: any
    }
}
  
type EnvType = {
    REACT_APP_HTTP_GRAPHQL_URL: string,
    REACT_APP_WS_GRAPHQL_URL: string,
    REACT_APP_APPLICATION_TITLE: string
}

export const env: EnvType = { ...process.env, ...window['env'] }