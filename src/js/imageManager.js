import config from '../config'

export const getImageUrl = ( url ) => {
    if ( !url ) return '/img/default-img.jpg';
    return url.startsWith( 'http' ) ? url : config.server.url + url
}

export const getJobImageUrl = ( url ) => {
    if ( !url ) return '/img/default-job.jpg';
    return config.server.url + url
}