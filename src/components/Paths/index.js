const ajaxProdUrl = 'http://thelastflame.com.br/api/rest';
const ajaxDevUrl = 'http://localhost:8000/api/';

export const ajaxUrl = process.env.NODE_ENV == 'production' ? ajaxProdUrl : ajaxDevUrl;